exports.startTwitch = async function (channel) {

    // Run once on initialization
    twitchCheck();

    // Set a timer to execute the function every 3 minutes.
    setInterval(function () {twitchCheck()}, 180000);

    async function twitchCheck() {

        let name = "crateentertainment";
        let testName = ""; // For debugging simply enter any Twitch user that's online.

        console.log(`Twitch notifications loaded for ${channel.name}.`.green);

        const sleep = ms => new Promise(res => setTimeout(res, ms));
        const res = await axios.get('https://api.twitch.tv/helix/streams?user_login=' +  name, {
            headers: {
                'client-id': process.env.twitch_client,
                'Authorization': process.env.twitch_auth,
            }
        });


        let isOnline = (res.data.data[0] !== undefined);
        let stream = (isOnline ? res.data.data[0] : false);

        // Is the Twtich stream offline?
        if (!isOnline) {

            if(debug)
                console.log("Stream is offline");

            // Write to file that the stream is offline.
            fs.writeFile('./modules/twitch/live.txt', 'no', function (err) {
                if (err) return console.log(err);
            });

            return
        }

        // Is the twitch Stream online ?
        if (isOnline) {
            let lastLogged = fs.readFileSync('./modules/twitch/live.txt', 'utf8');

            if (lastLogged.includes('no') || lastLogged === "") { // Only post the stream once.

                // Write to file that the stream is online.
                //fs.writeFile('./modules/twitch/live.txt', 'yes', function (err) {
                //    if (err) return console.log(err);
               // });

                // Post the Stream to the designated channel
                let embed = {
                    "title": stream["title"],
                    "url": "https://www.twitch.tv/crateentertainment",
                    "color": 6570906,
                    "timestamp": stream["started_at"],
                    "footer": {
                        "icon_url": "http://theoutcast.de/img/crate.png",
                        "text": "CrateEntertainment"
                    },
                    "image": {
                        "url": stream["thumbnail_url"].replace("{width}", "480").replace("{height}", "270")
                    },
                    "author": {
                        "name": "Twitch",
                        "url": "https://www.twitch.tv/crateentertainment",
                        "icon_url": "http://theoutcast.de/img/twitch.png"
                    },
                    "fields": [
                    ]
                };

                channel.send({embeds:[embed]});

            }

        }


    }


};

console.log("Twitch loaded".green);

