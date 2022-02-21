exports.hasLink = async function (message) {

    let whitelist = ["grimdawn.fandom.com", "grimtools.com", "crateentertainment.com"];

    // RFC 1738
    let check = new RegExp(/((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi);

    let matches = getAllMatches(check, message.content);

    let hasLink = false;

    let links = [];

    for(let data in matches){
        /* OUTPUT
  0 "https://www.google.com.tr/admin/subPage?qs1=sss1&qs2=sss2&qs3=sss3#Services", // full
  1 "https://www.google.com.tr", // protocol + domain
  2 "https", // protocol
  3 "www.google.com.tr", // domain
  4 "/admin/subPage?qs1=sss1&qs2=sss2&qs3=sss3#Services" // parameters
 */
        let link = {
            full: matches[data][0],
            navigation: matches[data][1],
            protocol: matches[data][2],
            domain: matches[data][3],
            domainEnding: matches[data][3].split(".")[matches[data][3].split(".").length -1], // www.example.[com]
            parameters: matches[data][3],
            susLevel: ((await isDomainSus(matches[data][3])) + (matches[data][1].includes("/gift") ? 2:0) + (matches[data][1].includes("/nitro") ? 2:0))
        };


        // Check if the link is whitelisted
        if(whitelist.indexOf(link.domain) === -1){
            hasLink = true;
            links.push(link);
        }

    }

    if(!hasLink)
        return false;
    else
        return links;
};

exports.removeAndNotify = async function (message, susMessage, susDomain) {

        let channel = message.guild.channels.cache.find(r => r.name === "🔒-shitcloset");

        // return false if the channel is not found.
        if(channel === undefined || channel === false)
            return false;

        let embed = {
            color: ((susMessage + susDomain) > 5 ? 0xd2193e : 0x19d247),
            title : "ඞ Removed a message from a suspicious user.", // AMOGUS
            description : message.author.toString() + " inside " + message.channel.toString() + " (" + message.member.joinedAt + " [" + message.member.joinedTimestamp + "]) \n```" + message.content + "```",
            fields: [
                {
                    "name": "Suspicion level of Domain",
                    "value": susDomain +  ".0",
                    inline: true
                },
                {
                    "name": "Suspicion level of Message",
                    "value": susMessage + ".0",
                    inline: true
                },
            ]
        };

        await channel.send({embeds:[embed]});
        message.delete();
        message.reply('ඞ Your message is suspicious and has been removed.')
        .then(msg => {
            setTimeout(() => msg.delete(), 8000)
        });
};

exports.isMessageSus = async function (message) {
    let susLevel = 0;

    let content = message.content.toLowerCase();

    let phrases = ["dis", "tri" , "bution", "nitro", "for 3 months", "for three months", "free nitro", "get free nitro", "get your free", "for a month", "for one month", "take nitro fast", "discord nitro", "offer ends", "from steam"];

    for(let i in phrases){

        let phrase = phrases[i];
        let phrase_L = phrases[i].replaceAll(/i/g, "l");

        // check if the message contains the phrase
        if(content.includes(phrase)){
            susLevel += 1;
        }

        // check the same phrase with replaced I's as L's
        if(content.includes(phrase_L)){
            susLevel += 2;
        }

    }

    return susLevel;
};

async function isDomainSus (domain) {
    let susLevel = 0;

    let phrases = ["dicsord", ".ru", "diiscord", "discord", "-gifts", "dicsord", "-given", "nitroi", ".gift", "discorl", "dilscocd", "discrde"];

    // Check if the domain contains the word discord but scrambled
    let scrambleCheck = ["d", "i", "s", "c", "o", "r", "d"];
    let scrambleValue = 0;
    for(let letter in scrambleCheck){
        if(domain.includes(scrambleCheck[letter]))
            scrambleValue += 1;
    }
    if(scrambleValue >= 5)  // If the domain contains at least 5 letters from the word discord
        susLevel += 5;

    for(let i in phrases){

        let phrase = phrases[i];
        let phrase_L = phrases[i].replaceAll(/i/g, "l");

        // check if the message contains the phrase
        if(domain.includes(phrase)){
            susLevel += 3;
        }

        // check the same phrase with replaced I's as L's
        if(domain.includes(phrase_L)){
            susLevel += 5;
        }

    }

    return susLevel;
};


function getAllMatches(regex, text) {
    let res = [];
    let match = null;
    if (regex.global) {
        while (match = regex.exec(text)) {
            res.push(match);
        }
    }
    else {
        if (match = regex.exec(text)) {
            res.push(match);
        }
    }
    return res;
}
