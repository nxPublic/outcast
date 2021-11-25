
let T = new Twit({
    consumer_key: process.env.twitter_consumer_key,
    consumer_secret: process.env.twitter_consumer_secret,
    access_token: process.env.twitter_access_token,
    access_token_secret: process.env.twitter_access_token_secret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
});
// @GrimDawn TwitterID: 106252041

exports.startTwitter = async function (client, channel) {

    let twitterID = 106252041;
    let twitterID_test = 2899773086; // Posts every 3 minutes.


    let stream = T.stream('statuses/filter', {follow: twitterID});

    stream.on('tweet', async function (tweet) {

        if (tweet.retweeted_status
            || tweet.in_reply_to_status_id
            || tweet.in_reply_to_status_id_str
            || tweet.in_reply_to_user_id
            || tweet.in_reply_to_user_id_str
            || tweet.in_reply_to_screen_name) {
            return false;
        } else {
            let twitter = tweet;

            let spl = twitter.created_at.split(" ");
            let formatDate = spl[0] + " " + spl[1] + " " + spl[2] + " " + spl[5] + " " + spl[3]; // Format time string correctly.

            let text = twitter.text.replace("<", "").replace(">", "");

            if(twitter.entities.urls.length !== 0) // Remove auto added description link.
                text = twitter.text.replace("<", "").replace(">", "").replace(twitter.entities.urls[0].url, "");

            let embed = {
                "description": text + "\n \n" + "[Click here to view tweet](https://twitter.com/i/web/status/" + twitter.id_str + ")",
                "url": "https://twitter.com/grimdawn",
                "color": 2992865,
                "timestamp": new Date(formatDate),
                "footer": {
                    "icon_url": "https://theoutcast.de/img/twitter.png",
                    "text": "Twitter"
                },
                "thumbnail": {
                    "url": twitter.user.profile_image_url_https
                },
                "author": {
                    "name": "Crate Entertainment",
                    "url": "https://twitter.com/grimdawn",
                    "icon_url": "https://theoutcast.de/img/crate.png"
                }
            };

            channel.send({embeds: [embed]});

        }
    })


    

};

console.log("Twitter loaded".green);

