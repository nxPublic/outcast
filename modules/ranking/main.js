
// The EXP calculation is intentionally placed here instead of behind the HTTP Gate.
// This way the community can adjust or make changes to their desire.
// If you change the {ranks} values, make sure to let me know so i (http://n-x.xyz) can adjust them for the website displays.

let ranks = {
    Initiate : {points: 1},
    Acolyte : {points: 1500},
    Speaker : {points: 3000},
    Counsel : {points: 15000},
    Advocate : {points: 25000},
    Emissary : {points: 50000},
    Herald : {points: 70000},
    Champion : {points: 90000},
    Earl : {points: 150000},
    Lord : {points: 200000},
    Apostle : {points: 250000},
    Duke : {points: 1000000},
    God : {points:  9999999}
};
let allRanks = Object.keys(ranks);

function calculateExperience(message){
    let multiplier = 1;

    // Patreon Supporters receive 100% more exp.
    if (message.member.roles.cache.some(role => role.name === 'Nitro Booster')) {
        multiplier = 2.0;
    }

    // Patreon Supporters receive 150% more exp.
    if (message.member.roles.cache.some(role => role.name === 'Patron' || role.name === "Dedicated Patron" || role.name === "Honorary Patron" )) {
        multiplier = 2.5;
    }

    return (1 + (message.content.length / 20)) * multiplier;
}


// Returns the current role name or FALSE
async function getCurrentRank(member) {
    let roles = member.roles.cache;
    let roleCounter = 0;
    let roleName = "";

    // check each declared role with the present roles
    // TODO: this should be a FOR loop instead of a forEach
    await roles.forEach(function(role){
        if(allRanks.includes(role.name)){
            roleCounter += 1;
            roleName = role.name;
        }
    });

    // if has more than 1 role, remove all here and reapply the correct one (in the main function)
    if(roleCounter >= 2){
        await removeAllRankRoles(member,roles);
    }

    // return false if the user has no role
    if(roleCounter === 0)
        return false;

    return roleName;
}

async function removeAllRankRoles(member, roles){
    // Remove all rank roles from the member.
    // TODO: should be a for loop
    await roles.forEach(async function(role){
        if(allRanks.includes(role.name)){
            await member.roles.remove(role);
        }
    });
}

async function getRankIndexByName(name){
    let index = await allRanks.indexOf(name);

    // If the user doesn't have a role, return false.
    if(index === -1)
        return false;

    return index;
}

async function grantUserExp(message, exp) {
    // sanitize data
    let nickname = await base64encode((!message.member.nickname || message.member.nickname === "" ? "null" : message.member.nickname));
    let name = await base64encode(message.author.username);

    // API Gate
    // {host}/api/exp/{key}/{uid}/{name}/{tag}/{nickname}/{avatar}/{exp}
    // key is the API key to receive access to the end point
    let httpGate = `${process.env.host}/${process.env.hostKey}/${message.author.id}/${name}/${message.author.discriminator}/${nickname}/${message.author.avatar}/${exp}`;

    // create http request to submit the EXP and Discord user details
    let data = await axios.get(httpGate);
    if(data.status === undefined || data.status !== 200){
        return false;
    }

    return data;
}

exports.addExp = async function (message) {

    // TODO: PROPER MULTI DISCORD SUPPORT
    // TODO: PROPER FF DISCORD RANKING

    // how much exp to grant the user based on his message
    let exp = calculateExperience(message);

    let currentRank = await getCurrentRank(message.member); // false if no rank

    let data = await grantUserExp(message, exp);

    // read new rank returned from the http gate
    let newRank = data.data["name"];

    // Example API return:
    // {"name":"Initiate","color":"#A6FDF4","exp":47,"required_exp":1,"next_rank":{"required_exp":1500,"name":"Acolyte","color":"#3EFFAD"},"percentage":"3"}


    // check if the current rank is the same rank after gaining exp and if the user has a role that's higher than the one in the database.
    if(currentRank !== newRank){

        // Handles missing EXP from user roles that are higher in order than the ones assigned in the database.
        // Check if the index of the returned rank is lower than the present one
        // If it is, grant the user EXP that is equal to the missing EXP
        if(await getRankIndexByName(currentRank) > await getRankIndexByName(newRank)){
            // calculate the missing EXP between the current database EXP state and the present role
            let expMissing = ranks[currentRank].points - data.data["exp"];
            await grantUserExp(message, expMissing);
        }else {
            // Add the new rank to the user / remove all unfitting ones
            if(currentRank === false){
                // assign new rank
                grantUserRole(message.member, newRank);
            }else{
                // remove all old rank
                removeAllRankRoles(message.member, message.member.roles.cache);
                // assign new rank
                grantUserRole(message.member, newRank);
            }
        }

    }

    if(global.debug)
        console.log(`Successfully granted ${message.member.name} a total of ${exp} experience.`);

    return true;
};

async function getRoleByName(name, guild) {
    let role = await guild.roles.cache.find(r => r.name === name);

    // return false if the role is not found.
    if(role === undefined || role === false)
        return false;

    return role;
}

async function grantUserRole(member, role){
    let roleToAssign = await getRoleByName(role, member.guild);
    if(roleToAssign){
        await member.roles.add(roleToAssign);
        return true;
    }else {
        return false;
    }
}

