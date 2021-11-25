
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

function calculateExperience(message){

    let multiplier = 1;

    // Patreon Supporters receive 150% more exp.
    if (message.member.roles.cache.some(role => role.name === 'Patron' || role.name === "Dedicated Patron" || "Honorary Patron" )) {
        multiplier = 2.5;
    }

    return (1 + (message.content.length / 20)) * multiplier;
}

exports.addExp = async function (message) {
    // how much exp
    let exp = calculateExperience(message);

    // build get api statement
    // {host}/api/exp/{key}/{uid}/{name}/{tag}/{nickname}/{avatar}/{exp}
    // key is the API key to receive access to the end point
    let httpGate = `${process.env.host}/${process.env.hostKey}/${message.author.id}/${message.author.username}/${message.author.discriminator}/${message.member.nickname}/${message.author.avatar}/${exp}`;

    // create http request to submit the EXP and Discord user details
    let data = await axios.get(httpGate);
    if(data.status === undefined || data.status !== 200){
        return false;
    }
    let response = data.data; // unwrap

    // check if the current rank is the same rank after gaining exp
    
    // adjust rank if required

};


// TODO: don't forget exp multi for patreons
