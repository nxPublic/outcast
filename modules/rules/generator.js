exports.grimDawnRules = async function (channel, guild) {

    let embed = {};

    // post logo
    channel.send({ files: ['./modules/rules/resources/logo.png'] });
    // post divider
    channel.send({ files: ['./modules/rules/resources/divider.png'] });

    // post welcome text
    embed = {
        "title": "Welcome to the Grim Dawn Discord server!",
        "description" : "Grim Dawn is an ARPG set inside a apocalyptic fantasy world where humanity is on the brink of extinction, iron is valued above gold and trust is hard earned. Grim Dawn features complex character development, hundreds of unique items, crafting and quests with choice & consequence."
    };
    channel.send({embed:embed });

    // attitude header
    channel.send({ files: ['./modules/rules/resources/attitude.png'] });
    // attitude text
    embed = {
        title: "Global Rules",
            description: "**1.** Follow the channel rules.\n" +
        "**2.** Be respectful to everyone.\n" +
        "**3.** Restrict yourself to english.\n" +
        "**4.** Posting pornographic, disturbing, illegal images/links is strictly prohibited.\n" +
        "**5.** There is no need to be upset about anything.\n" +
        "**6.** Moderators and Admins private message you for a reason, listen.\n" +
        "**7.** Do not advertise or encourage anything that is against the TOS/EULA of Grim Dawn.\n" +
        "**8.** Do not advertise any kind of Discord/community/campaign or other links without permission. \n" +
        "**9.** Check the links down below before asking for support.\n"
    };
    channel.send({embed:embed });

    // channel rules
    channel.send({ files: ['./modules/rules/resources/channelRules.png'] });

    // Global Channels
    embed = {
        fields: [
            {
                name: "Global",
                value:
                    getChannel("news", guild) + "\n " +
                    "News about recent important events related to Grim Dawn.\n" +
                    getChannel("social-media", guild) + "\n" +
                    "This channel will be updated with the official Crate Entertainment [Twitter](https://twitter.com/grimdawn) and [Twitch](https://www.twitch.tv/crateentertainment) account activity.\n"+
                    getChannel("crate-tracker", guild) + "\n" +
                    "This channel will be used by the bot to post about all official Crate Entertainment employees account activities inside the [Grim Dawn Forum](http://grimdawn.com/forums).\n"
                ,
            },
        ]
    };
    channel.send({embed:embed });

    // Grim Dawn
    embed = {
        fields: [
            {
                name: "↓ Grim Dawn ↓",
                value:
                    getChannel("general", guild) + "\n " +
                    "Is meant to be only about Grim Dawn.\n" +
                    getChannel("forum", guild) + "\n" +
                    "Closed community, open topic channel for " + rl("Forum Verified") + " members. \n" +
                    getChannel("mod-discussion", guild) + "\n" +
                    "All about Grim Dawn mods and everything related. \n(Other channels are not restricted to talk about mods for Grim Dawn.) \n"
                ,
            },
        ]
    };
    channel.send({embed:embed });

    // Grim Dawn Builds
    embed = {
        fields: [
            {
                name: "↓ Grim Dawn Builds ↓",
                value:
                    getChannel("build-discussion", guild) + "\n" +
                    "This channel is for Grim Dawn build discussions and helping each other with game related questions based on making your characters or improving them. \n"
                ,
            },
        ]
    };
    channel.send({embed:embed });

    // Community
    embed = {
        fields: [
            {
                name: "↓ Community ↓",
                value: "```py\n" +
                    "@ ↓ No text conversations within the Community channels ↓ \n" +
                    "@ ↓ Message people in private to get in contact. ↓```" +
                    getChannel("searching-players", guild) + "\n " +
                    "This channel is for the sole purpose of creating text posts with informations regarding the people you are searching to play with. \n" +
                    getChannel("trade", guild) + "\n " +
                    "This channel is for the sole purpose of searching/finding people to trade items with. \n Please use <LINK> if you are posting links."
                ,
            },
        ]
    };
    channel.send({embed:embed });

    // Off topic
    embed = {
        fields: [
            {
                name: "↓ Offtopic ↓",
                value:
                    getChannel("gaming", guild) + "\n " +
                    "Is meant to be about games. \n" +
                    "(This is not supposed to contain #off-topic related posts) \n" +
                    getChannel("off-topic", guild) + "\n" +
                    "Everything is allowed within range of the rules but use common sense, please stay away from politics. \n" +
                    getChannel("memes", guild) + "\n" +
                    "Is a image only channel. Post memes. Be respectful, no clearly over the line offensive content please. \n" +
                    getChannel("music", guild) + "\n" +
                    "Only music related discussions or links. *If your posts look like ads, we will ban you.*"
                ,
            },
        ]
    };
    channel.send({embed:embed});

    // Chat Roles Header
    channel.send({ files: ['./modules/rules/resources/chatRoles.png'] });

    // Chat Roles
    embed = {
        description:
            rl("Admin", guild) + "\n The founder and the manager of the Discord.\n This Discord moderation is not affiliated with Crate Entertainment. \n \n" +
            rl("Moderator", guild) + "\n Helps you with questions and keeps the Discord chat clean. \n \n" +
            rl("Janitor", guild) + "\n Our cleaning crew that enforces mostly channel rules. \n \n" +
            rl("Official Grim Dawn Forum Moderator", guild) + "\n Official Grim Dawn Forum moderator. \n \n" +
            rl("Praetorian", guild) + "\n Long term community members with access to alpha versions of grim dawn to provide feedback and game testing results. \n \n" +
            rl("Forum Verified", guild) + "\n People that have verified their forum account through our Discord bot. \n \n"
    }
    channel.send({embed:embed});


};

async function rl(name, guild){
    let role = guild.roles.cache.find(r => r.name === name);
    return name.toString();
}

function getChannel(name, guild) {
    let channel = guild.channels.cache.find(r => r.name === name);

    // return false if the role is not found.
    if(channel === undefined || channel === false)
        return false;

    return channel.toString();
}