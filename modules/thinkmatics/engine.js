// NOTE: The idea for this was originally made by KidPid in 2016, we retired this when we switched to Javascript base in 2017~2018
// Now its back.


exports.check = async function (message, channel) {

    if(message.content.length > 20) // Don't process messages with more than 5 characters.
        return;

    let combo = isValidEmojiCombination(message.content);
    if(message.content.includes("🤔") && combo !== false){

        if(message.content.charAt(0) !== "!") // Allows the prevention of auto deletion
            message.delete();

        //channel.send({files: "https://cdn.discordapp.com/emojis/" + combo + ".png?size=48"})
        channel.send({ files: [{ attachment: "https://cdn.discordapp.com/emojis/" + combo + ".png?size=48" }] });
    }
    let b;

};

function isValidEmojiCombination(messageText){

    for(i in combinations){
        if(messageText.includes(combinations[i].required))
            return combinations[i].id; // return true if the emoji is in the list
    }
    return false;
}

// Yes, this is ugly and a disgrace to humanity to reference the Unicode characters instead of the actual emoji names.
// Discord just sends the Unicode character without any formatting or emoji data through in the message content.
let combinations =
    [
        {name: "winking", required:"wink", id:"359819933711859713"},
        {name: "weebthink", required:"🇯🇵", id:"359798823725432842"},
        {name: "upthink", required:"🖕", id:"359820561305829386"},
        {name: "thrugging", required:"🤷", id:"359800247838441478"},
        {name: "thinkyang", required:"☯", id:"359822049650147339"},
        {name: "thinkwave", required:"🌊" ,id:"359800247876059139"},
        {name: "thinkusVult", required:"✝",id:"359798826581753858"},
        {name: "thinkup", required:"👍",id:"359823000159387649"},
        {name: "thinkstare", required:"😐",id:"359820274532614144"},
        {name: "thinkspinner", required:"🔄",id:"359822309466570753"},
        {name: "thinkrage", required:"😡", id:"359798824404910080"},
        {name: "thinkplant", required:"🍆",id:"359822667655938048"},
        {name: "thinkpad", required:"💻",id:"359821250484502540"},
        {name: "thinkfusing", required:"😕",id:"359822865584881690"},
        {name: "thinkfish", required:"🐟",id:"359822611191955466"},
        {name: "thinkeyes", required:"👀",id:"359798823486226443"},
        {name: "thinkdrops", required:"💦",id:"359821539392225291"},
        {name: "thinkcern", required:"😰",id:"359822227073662976"},
        {name: "squarethink", required:"⬜",id:"359821163817467904"},
        {name: "squarethink", required:"🔲",id:"359821163817467904"},
        {name: "spudthink", required:"🥔",id:"359800263688847360"},
        {name: "crabthink", required:"🦀",id:"359801074414125056"},
        {name: "ok_thinking", required:"👌",id:"359798825763995648"},
        {name: "mthinking", required:"🎩",id:"359821640340733952"},
        {name: "leftythink", required:"👈",id:"359821079264624640"},
        {name: "kmsthink", required:"🔫",id:"359820702813257728"},
        {name: "clapking", required:"👏",id:"359798826388815889"},
        {name: "breading", required:"🍞",id:"359821383401865228"},
        {name: "beerthink", required:"🍺",id:"359821722439909376"},
        {name: "thinkyawn", required:"😫",id:"359821867634393089"},
        {name: "thinkcorn", required:"🍿",id:"376774691144204288"}
    ]
;