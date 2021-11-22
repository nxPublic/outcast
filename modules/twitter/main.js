
var T = new Twit({
    consumer_key: process.env.twitter_consumer_key,
    consumer_secret: process.env.twitter_consumer_secret,
    access_token: process.env.twitter_access_token,
    access_token_secret: process.env.twitter_access_token_secret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})
// @GrimDawn TwitterID: 106252041

exports.startTwitter = async function (client) {

    let stream = T.stream('statuses/filter', {follow: '2899773086'});

    stream.on('tweet', async function (tweet) {

        if (tweet.retweeted_status
            || tweet.in_reply_to_status_id
            || tweet.in_reply_to_status_id_str
            || tweet.in_reply_to_user_id
            || tweet.in_reply_to_user_id_str
            || tweet.in_reply_to_screen_name) {
            return;
        } else {

            const url = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
            const channel = await client.channels.cache.get('912336981638402068');
            channel.send(url);

            const tweetIDValue = tweet.id_str.toString();

            //Connect MySQL
            MysqlConnection.connect();
            const sql = `INSERT INTO twitter (post_id) VALUES (${tweetIDValue})`;
            MysqlConnection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Tweet ID logged in DB.");
            });
            MysqlConnection.end();


        }
    })


    

};

console.log("Twitter loaded".blue);

