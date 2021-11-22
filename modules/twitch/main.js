exports.startTwitch = async function (client) {

    let sleepTime = 180000;

    async function twitchCheck() {
        console.log("checking twitch");
        const sleep = ms => new Promise(res => setTimeout(res, ms));
        const res = await axios.get('https://api.twitch.tv/helix/streams?user_login=admiralbulldog', {
            headers: {
                'client-id': process.env.twitch_client,
                'Authorization': process.env.twitch_auth,
            }
        });

       // console.log(res.data.data[0]);

        if (res.data.data[0] === undefined) {
            fs.writeFile('./modules/twitch/live.txt', 'no', function (err) {
                if (err) return console.log(err);
            });
            await sleep(sleepTime);
            twitchCheck(twitchCheck, sleepTime);
            return

        }

        if (res.data.data[0].type !== undefined) {
            let lastLogged = fs.readFileSync('./modules/twitch/live.txt', 'utf8')
            if (lastLogged.includes('no')) {
                MysqlConnection.connect();
                const sql = `INSERT INTO twitch (post_id) VALUES (${res.data.data[0].id})`;
                MysqlConnection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Twitch stream ID logged in DB.");
                });
                MysqlConnection.end();
                fs.writeFile('./modules/twitch/live.txt', 'yes', function (err) {
                    if (err) return console.log(err);
                });
                let channel = await client.channels.cache.get('912336981638402068');
                channel.send('Stream is now **LIVE** playing ' + res.data.data[0].game_name + '\n**' + res.data.data[0].title + '**\nhttps://twitch.tv/admiralbulldog');
                await sleep(sleepTime);
                twitchCheck(twitchCheck, sleepTime);
                return
            }
            await sleep(sleepTime);
            twitchCheck(twitchCheck, sleepTime);
            return
        }


        await sleep(sleepTime);
        twitchCheck(twitchCheck, sleepTime);

    }

    twitchCheck();

};

console.log("Twitch loaded".blue);

