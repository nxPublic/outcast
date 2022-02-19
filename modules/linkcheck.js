exports.checkMessage = async function (message) {

    let whitelist = ["grimdawn.fandom.com", "grimtools.com", "forums.crateentertainment.com"];

    // RFC 1738
    let check = new RegExp(/((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi);

    let matches = getAllMatches(check, message.content);

    let isValid = true;

    for(let data in matches){
        // check if it is a grimtools link or a forum link
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
            parameters: matches[data][3]
        };

        // Check if the link is whitelisted
        if(whitelist.indexOf(link.domain) === -1){
            isValid = false;
        }

    }

    let b;

};

exports.isMessageSus = async function (message) {
    let susLevel = 0;

    let content = message.content.toLowerCase();

    let phrases = ["dis", "tri" , "bution", "nitro", "for 3 months", "free nitro", "get free nitro", "get your free", "for a month", "take nitro fast", "discord nitro", "offer ends", "from steam"];

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
