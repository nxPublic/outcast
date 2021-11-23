exports.startTwitch = async function (client, channel) {

    // Run once on initialization
    twitchCheck();

    // Set a timer to execute the function every 3 minutes.
    setInterval(function () {twitchCheck()}, 180000);

    async function twitchCheck() {

        let name = "crateentertainment";
        let testName = "admiralbulldog";

        console.log("=> Checking Twitch User ");

        const sleep = ms => new Promise(res => setTimeout(res, ms));
        const res = await axios.get('https://api.twitch.tv/helix/streams?user_login=' +  name, {
            headers: {
                'client-id': process.env.twitch_client,
                'Authorization': process.env.twitch_auth,
            }
        });


        // Is the Twtich stream offline?
        if (res.data.data[0] === undefined) {

            console.log("Stream is offline");

            // Write to file that the stream is offline.
            fs.writeFile('./modules/twitch/live.txt', 'no', function (err) {
                if (err) return console.log(err);
            });

            return
        }

        // Is the twitch Stream online ?
        if (res.data.data[0].type !== undefined) {
            let lastLogged = fs.readFileSync('./modules/twitch/live.txt', 'utf8');

            if (lastLogged.includes('no')) { // Only post the stream once.

                // Write to file that the stream is online.
                fs.writeFile('./modules/twitch/live.txt', 'yes', function (err) {
                    if (err) return console.log(err);
                });

                // Find the desired announcement channel
                let channel = await client.channels.cache.get('912336981638402068');

                // Post the Stream
                channel.send('Stream is now **LIVE** playing ' + res.data.data[0].game_name + '\n**' + res.data.data[0].title + '**\nhttps://twitch.tv/admiralbulldog');

            }

        }


    }


};

console.log("Twitch loaded".blue);

