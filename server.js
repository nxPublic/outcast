// Globals
require('./modules/globals.js');


client.on("ready", async () => {
    console.log(`✔ Logged in as ${client.user.username}`);

});






// Login
client.login(process.env.BOT_TOKEN);