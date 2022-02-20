// Globals
require('./modules/globals.js');

global.debug = false;
global.skipTracker = true; // If set to true, the Forum Tracker will not initialize.

global.ready = false;

let preLoadServers = [process.env.guild_gd /* Grim Dawn */, process.env.guild_ff /* Farthest Frontier */];

client.on("ready", async () => {
    console.log(`✔ Logged in as ${client.user.username}`);

    // Might take a few minutes to propagate to every user in the server.
    await client.user.setPresence({ activities: [{ name: 'http://theoutcast.de' }], status: 'online' });

    // Preload all guilds of relevance to be sure we have access to the channels in the cache.
    for (let i in preLoadServers){
        let s = await client.guilds.cache.find(r => r.id === preLoadServers[i]);
        if(s){
            await s.fetch();
            console.log(`Found ${s.name} Server`.green);
        }else
            console.log(`Couldn't find ${preLoadServers[i]} Server`.red);
    }

    // TODO: Add proper channel id's into the .env file for the announcement channels appropriate

    // Start Twitter listener
    let twitterChannels = [process.env.channel_twitter_gd, process.env.channel_twitter_ff];
    await twitter.startTwitter(twitterChannels);

    // Start Twitch listener
    let twitchChannels = [process.env.channel_twitch_gd, process.env.channel_twitch_ff];
    if(twitchChannels.length > 0)
        await twitch.startTwitch(twitchChannels);

    // Start Discourse Tracking (Forum Tracker)
    await require('./modules/forumTracker/getCategories');

    // Loop all employees for the Forum Tracker
    try {
        if(!skipTracker){
            let list = employees.members; // these are all known crate entertainment employees
            for (let user in list) {
                if (list[user].id !== undefined && list[user].username !== undefined) {
                    let interv = (Math.floor(Math.random() * 100) + 60) * 5000; // random interval calculation so we don't rate limit ourselves
                    setInterval(
                        async function () {
                            await new ForumTracker(list[user].username);
                        }
                        , interv
                    );
                    await new ForumTracker(list[user].username);
                    console.log(`Tracker created for ${list[user].username} with a interval of ${(interv / 1000)}s`.blue);
                }
            }
        }
    }catch(error) { console.error(error);}

    ready = true;
});

client.on("messageCreate", async (message) => {

    if(message.author.bot ||!ready)
        return false;

    // Check if the message contains any link and if the user is allowed to post it.


    // Suppress potential exploits
    message.content = message.content.trim().replace("@here", " here").replace("@everyone", " everyone");

    // Thinkmatics
    thinkMatics.check(message);

    // Auto Forum Embeds
    if(message.content.includes("https://forums.crateentertainment.com/t/")){
        forumEmbeds.checkMessageForLink(message);
    }

    // Handle Ranking Progression
    if(message.guild.id === process.env.guild_gd)
        ranking.addExp(message);


    if(message.content.startsWith("!notaffiliated")){
        let notAffiliatedRole = await server.roles.cache.find(r => r.name === "Not affiliated with Crate Entertainment.");
        if(notAffiliatedRole){
            await message.delete();
            await message.member.roles.add(notAffiliatedRole);
        }
        return true;
    }

    // Link check to combat bots
    let linkArray = await links.hasLink(message);
    let susLevelMessage = await links.isMessageSus(message);
    if(linkArray !== false){

        // is allowed to post links ?
        // check rank
        let sus = false;
        let rank = await ranking.getMemberRank(message.member);
        if(rank === "Initiate" || rank === false){
            sus = true;
        }

        // calculate sus level of the domains in the message
        let susLevelDomain = 0;
        for(let link in linkArray){
            susLevelDomain += linkArray[link]["susLevel"];
        }

        // If user has a user rank have a higher threshold for removal of links
        if(sus || (susLevelDomain + susLevelMessage) >= 8){
            // remove message and post moderation notification if sus level is above a certain level
            if((susLevelDomain + susLevelMessage) >= 5)
                await links.removeAndNotify(message, susLevelMessage, susLevelDomain )
        }
    }


    // TODO: proper command for posting to the rules channel for moderators.


});



// Login
client.login(process.env.BOT_TOKEN_OUTCAST);