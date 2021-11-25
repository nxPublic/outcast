// Globals
require('./modules/globals.js');

global.debug = false;
global.skipTracker = true; // If set to true, the Forum Tracker will not initialize.

client.on("ready", async () => {
    console.log(`✔ Logged in as ${client.user.username}`);

    let server = await client.guilds.cache.find(r => r.id === process.env.server_id);

    if(server === undefined){
        console.log(`ERROR: Could not find Guild by specified ID.`);
        process.exit(1); // Quit process if the guild is not found.
    }else{
        console.log(`Found ${server.name} Server`);
        global.server = server;
    }

    // Start Twitter listener
    let twitterChannel = await server.channels.cache.get(process.env.channel_twitter);
    if(twitterChannel !== undefined)
        twitter.startTwitter(client, twitterChannel);

    // Start Twitch listener
    let twitchChannel = await server.channels.cache.get(process.env.channel_twitch);
    if(twitchChannel !== undefined)
        twitch.startTwitch(client, twitchChannel);

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


});

client.on("messageCreate", async (message) => {

    if(message.author.bot)
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
    ranking.addExp(message);

});



// Login
client.login(process.env.BOT_TOKEN);