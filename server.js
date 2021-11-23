// Globals
require('./modules/globals.js');

global.debug = true;

client.on("ready", async () => {
    console.log(`✔ Logged in as ${client.user.username}`);

    let server = await client.guilds.cache.find(r => r.id === "886942126053679104");

    if(server === undefined){
        console.log(`ERROR: Could not find Guild by specified ID.`);
        process.exit(1); // Quit process if the guild is not found.
    }else{
        console.log(`Found ${server.name} Server`);
        global.server = server;
    }

    // Start Twitter listener
    let twitterChannel = await server.channels.cache.get("912336981638402068");
    if(twitterChannel !== undefined)
        twitter.startTwitter(client, twitterChannel);

    // Start Twitch listener
    let twitchChannel = await server.channels.cache.get("912336981638402068");
    if(twitchChannel !== undefined)
        twitch.startTwitch(client, twitchChannel);

    // Start Discourse Tracking (Forum Tracker)
    await require('./modules/forumTracker/getCategories');

    // Loop employees ?

    let list = employees.members;
    await new ForumTracker(list[1].username);


});





// Login
client.login(process.env.BOT_TOKEN);