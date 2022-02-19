exports.grimDawnRules = async function (channel, guild) {

    let embed = {};

    // post logo
    await channel.send({ files: ['./modules/rules/resources/logo.png'] });
    // post divider
    await channel.send({ files: ['./modules/rules/resources/divider.png'] });

    // post welcome text
    embed = {
        "title": "Welcome to the Grim Dawn Discord server!",
        "description" : "Grim Dawn is an ARPG set inside a apocalyptic fantasy world where humanity is on the brink of extinction, iron is valued above gold and trust is hard earned. Grim Dawn features complex character development, hundreds of unique items, crafting and quests with choice & consequence."
    };
    await channel.send({embeds: [embed] });

    // attitude header
    await channel.send({ files: ['./modules/rules/resources/attitude.png'] });
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
    await channel.send({ embeds:[embed] });

    // channel rules
    await channel.send({ files: ['./modules/rules/resources/channelRules.png'] });

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
    await channel.send({embeds:[embed] });

    // Grim Dawn
    embed = {
        fields: [
            {
                name: "↓ Grim Dawn ↓",
                value:
                    getChannel("general", guild) + "\n " +
                    "Is meant to be only about Grim Dawn.\n" +
                    getChannel("forum", guild) + "\n" +
                    "Closed community, open topic channel for " + rl("Forum Verified", guild) + " members. \n" +
                    getChannel("mod-discussion", guild) + "\n" +
                    "All about Grim Dawn mods and everything related. \n(Other channels are not restricted to talk about mods for Grim Dawn.) \n"
                ,
            },
        ]
    };
    await channel.send({embeds:[embed] });

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
    await channel.send({embeds:[embed] });

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
    await channel.send({embeds:[embed] });

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
    await channel.send({embeds:[embed]});

    // Chat Roles Header
    await channel.send({ files: ['./modules/rules/resources/chatRoles.png'] });

    // Chat Roles
    embed = {
        description:
            await rl("Admin", guild) + "\n The founder and the manager of the Discord.\n This Discord moderation is not affiliated with Crate Entertainment. \n \n" +
            await rl("Moderator", guild) + "\n Helps you with questions and keeps the Discord chat clean. \n \n" +
            await rl("Janitor", guild) + "\n Our cleaning crew that enforces mostly channel rules. \n \n" +
            await rl("Grim Dawn Forum Moderator", guild) + "\n Official Grim Dawn Forum moderator. \n \n" +
            await rl("Praetorian", guild) + "\n Long term community members with access to alpha versions of grim dawn to provide feedback and game testing results. \n \n" +
            await rl("Forum Verified", guild) + "\n People that have verified their forum account through our Discord bot. \n \n"
    };
    await channel.send({embeds:[embed]});

    // Buy Now
    await channel.send({ files: ['./modules/rules/resources/buynow.png'] });

    // Grim Dawn - Base Game
    embed = {
        "color": 3288360,
            "image": {
            "url": "https://media.discordapp.net/attachments/426464234994532364/557061415827931148/GD2.png"
        },
        "thumbnail": {
            "url": "https://media.discordapp.net/attachments/426464234994532364/557061415827931148/GD2.png"
        },
        "fields": [
            {
                "name": "Official Crate Website",
                "value": "http://www.grimdawn.com/contribute_buynow01.php"
            },
            {
                "name": "Steam",
                "value": "http://store.steampowered.com/app/219990/Grim_Dawn/"
            },
            {
                "name": "Humble Bundle",
                "value": "https://www.humblebundle.com/store/grim-dawn"
            }
        ]
    };
    await channel.send({embeds:[embed]});

    // Grim Dawn - Ashes of Malmouth
    embed = {
        "color": 1935458,
            "image": {
            "url": "https://media.discordapp.net/attachments/426464234994532364/557059808361054210/gdheaderboxtop_2.png?width=839&height=155"
        },
        "thumbnail": {
            "url": "https://media.discordapp.net/attachments/426464234994532364/557059628802768897/aom_icon.png"
        },
        "fields": [
            {
                "name": "Official Crate Website",
                "value": "http://www.grimdawn.com/contribute_buynow01.php"
            },

            {
                "name": "Steam",
                "value": "http://store.steampowered.com/app/642280/Grim_Dawn__Ashes_of_Malmouth_Expansion/"
            },
            {
                "name": "Humble Bundle",
                "value": "https://www.humblebundle.com/store/grim-dawn-ashes-of-malmouth-expansion"
            }
        ]
    };
    await channel.send({embeds:[embed]});

    // Grim Dawn - Forgotten Gods
    embed = {
        "color": 16754503,
            "image": {
            "url": "https://media.discordapp.net/attachments/426464234994532364/557059372161957898/grimdawndiscordfg.png"
        },
        "thumbnail": {
            "url": "https://media.discordapp.net/attachments/426464234994532364/557059472254566410/Grim_Dawn_0000.png"
        },
        "fields": [
            {
                "name": "Official Crate Website",
                "value": "http://www.grimdawn.com/contribute_buynow01.php"
            },

            {
                "name": "Steam",
                "value": "https://store.steampowered.com/app/897670/Grim_Dawn__Forgotten_Gods_Expansion/"
            },
            {
                "name": "Humble Bundle",
                "value": "https://www.humblebundle.com/store/grim-dawn-forgotten-gods-expansion"
            }
        ]
    };
    await channel.send({embeds:[embed]});

    // Linkbase
    await channel.send({ files: ['./modules/rules/resources/linkbase.png'] });
    embed = {
        description : "**Official Links**\n" +
        "Grim Dawn Forum \n" +
        "https://forums.crateentertainment.com/\n" +
        "Grim Dawn Builds \n" +
        "https://forums.crateentertainment.com/c/grimdawn/classes-skills-and-builds\n" +
        "Grim Dawn Reddit \n" +
        "https://www.reddit.com/r/Grimdawn/\n" +
        "Grim Dawn Wikipedia \n" +
        "http://grimdawn.gamepedia.com/Grim_Dawn_Wiki\n" +
        "\n" +
        "**Useful Links**\n" +
        "Grim Dawn Online Map \n" +
        "https://www.grimtools.com/map/\n" +
        "Grim Dawn Build Compendium \n" +
        "http://www.grimdawn.com/forums/showthread.php?t=79419\n" +
        "Grim Dawn F.A.Q \n" +
        "https://tinyurl.com/n676c8y\n" +
        "Character Builder/Planner \n" +
        "http://www.grimtools.com/calc/\n" +
        "Item Database \n" +
        "https://www.grimtools.com/db/items/\n" +
        "Monster Database \n" +
        "https://www.grimtools.com/monsterdb/\n" +
        "Shrine/Chest/Quest Tracker \n" +
        "http://grimchecklist.com/\n" +
        "Relic Recipe Breakdown \n" +
        "https://koomzog.github.io/GrimDawnRelics/\n" +
        "Resistance Reduction Cheat Sheet \n" +
        "https://tinyurl.com/yya5hmo2\n" +
        "Modding Beginners Guide \n" +
        "http://www.grimdawn.com/forums/showthread.php?t=51590\n" +
        "GD Acronym and Abbreviation List \n" +
        "http://www.grimdawn.com/forums/showthread.php?t=32904"
    };
    await channel.send({embeds:[embed]});


};

async function rl(name, guild){
    let role = await guild.roles.cache.find(r => r.name === name);
    if(role)
        return role.toString();
    else
        return name;
}

function getChannel(name, guild) {
    let channel = guild.channels.cache.find(r => r.name === name);

    // return false if the role is not found.
    if(channel === undefined || channel === false)
        return false;

    return channel.toString();
}