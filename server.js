// Globals
require('./modules/globals.js');


client.on("ready", async () => {
    console.log(`✔ Logged in as ${client.user.username}`);



    //Our Modules
    twitter.startTwitter(client);
    twitch.startTwitch(client);

});





// Login
client.login(process.env.BOT_TOKEN);