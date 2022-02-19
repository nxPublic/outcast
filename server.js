// Globals
require('./modules/globals.js');

global.debug = false;
global.skipTracker = true; // If set to true, the Forum Tracker will not initialize.

global.ready = false;

let preLoadServers = [process.env.guild_gd /* Grim Dawn */, process.env.guild_ff /* Farthest Frontier */];

client.on("ready", async () => {
    console.log(`✔ Logged in as ${client.user.username}`);

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

    //C Suppress potential exploits
    message.content = message.content.trim().replace("@here", " here").replace("@everyone", " everyone");

    // Thinkmatics
    thinkMatics.check(message);

    // Auto Forum Embeds
    if(message.content.includes("https://forums.crateentertainment.com/t/")){
        forumEmbeds.checkMessageForLink(message);
    }

    // Handle Ranking Progression
    // TODO: proper multi discord handling for the ranking
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


    // TODO: Generate Rules channel content
    if(message.content === "p" && message.author.username === "nx")
        rules.grimDawnRules(message.channel, message.guild);

});



// Login
client.login(process.env.BOT_TOKEN_OUTCAST);