const axios = require("axios");
const sT = require("striptags");

exports.isEmployee = function (id) {

    for(let i in employees.members){
        let member = employees.members[i];
        if(member.id === id){
            return {isEmployee:true,color:16731648};
        }
    }

    for(let i in moderators.members){
        let member = moderators.members[i];
        if(member.id === id){
            return {isEmployee:true,color:16731648};
        }
    }

    return  {isEmployee:false};
};

exports.hasValidLink = function (text) {
    let https = new RegExp("/(?<=http:\/\/forums\.crateentertainment\.com\/t\/)[a-zA-Z0-9\/\-]{10,200}");
    let http = new RegExp("/(?<=https:\/\/forums\.crateentertainment\.com\/t\/)[a-zA-Z0-9\/\-]{10,200}");

    let check = https.exec(text);
    let check2 = http.exec(text);

    if(check !== null || check2 !== null){
        return ((check === null) ? check2 : check)[0].substring(1);
    }

    return false;
};

exports.isOnlyForumLink = function (text) {
    let https = new RegExp("/(?<=http:\/\/forums\.crateentertainment\.com\/t\/)[a-zA-Z0-9\/\-]{10,200}");
    let http = new RegExp("/(?<=https:\/\/forums\.crateentertainment\.com\/t\/)[a-zA-Z0-9\/\-]{10,200}");

    let check = https.exec(text);
    let check2 = http.exec(text);

    let linkLength = 40;  // + 40 for https://forums.crateentertainment.com/t/
    if(check !== null || check2 !== null) {
        if(check !== null && check.length !== 0){
            linkLength = linkLength + check[0].length;
        }
        if(check2 !== null && check2.length !== 0){
            linkLength = linkLength + check2[0].length;
        }
    }

    return (text.length - linkLength) < 8;
};

exports.checkMessageForLink = async function (message){
    let link = forumEmbeds.hasValidLink(message.content);
    if(link !== false){
        let embed = await forumEmbeds.embed(link);
        message.channel.send({embeds: [embed]}).then(function (botMessage) {
            if(forumEmbeds.isOnlyForumLink(message.content))
                try { // in case the bot misses permissions to remove the message.
                    message.delete();
                }catch(error) { console.error(error);}
        });
    }
};

exports.embed = async function (link) {
    let data = await getThreadData(link);
    if(!data)
        return false;

    let embed = {
        "title": decodeHTMLEntities(data.name),
        "description": `** Thread Author** [${data.author.name}](https://forums.crateentertainment.com/u/${data.author.name})` + "\n" + sT(data.content),
        "url": data.link,
        "color": (data.author.employee.isEmployee ? data.author.employee.color : 45300),
        "timestamp" : new Date(data.creationTime),
        "footer": {
            "icon_url": "https://cdn.discordapp.com/attachments/426464234994532364/598264173415366686/1d73734693fe84d11fefd6510f179a4ec992a7a9_2_32x32.png",
            "text":  `${data.categorie}`
        },
        "thumbnail": {
            "url": data.author.image,
        },
        "fields": [
            {
                "name": "Thread created",
                "value": global.timeAge(data.creationTime) + " ago",
                inline : true
            },
            {
                "name": "Thread views",
                "value": `${data.views}`,
                inline : true
            },
            {
                "name": "Total posts",
                "value": `${data.posts}`,
                inline : true
            },
            {
                "name": "Last post",
                "value": data.lastPost.author.name + ", " + global.timeAge(data.lastPost.time) + " ago - [View](" + data.lastPost.link + ")",
                inline : false
            }
        ]
    };
    embed.description = embed.description.substring(0,250) + "...";
    return embed;
};


function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"'],
        ['rsquo', '\'']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

async function getThreadData(link){
    let data = await axios.get(`https://forums.crateentertainment.com/t/${link}.json`);
    if(data.status === undefined || data.status !== 200){
        return false;
    }
    data = data.data; // unwrap

    let thread = {
        link: `https://forums.crateentertainment.com/t/${link}`,
        name : data.fancy_title,
        views : data.views,
        posts: data.posts_count,
        creationTime : new Date(data.created_at),
        categorie :   global.subCategories[data.category_id].parent.name + " / " + global.subCategories[data.category_id].name,
        content: data.post_stream.posts[0].cooked,
        author: {
            name: data.details.created_by.username,
            employee: exports.isEmployee(data.details.created_by.id),
            image: "https://forums.crateentertainment.com/" + data.details.created_by.avatar_template.replace("{size}", "64")
        },
        lastPost: {
            author: {
                name: data.details.last_poster.username,
                employee: exports.isEmployee(data.details.last_poster.id),
                image: "https://forums.crateentertainment.com/" + data.details.last_poster.avatar_template.replace("{size}", "64")
            },
            link: `https://forums.crateentertainment.com/t/${link}/${data.posts_count}`,
            time: new Date(data.last_posted_at).getTime()
        }

    };

    //  data.fancy_title / title
    //  data.views
    //  data.created_at
    //  data.category_id
    //  data.highest_post_number
    //  data.last_posted_at
    //  data.post_count
    //  data.draft_key
    //  details.created_by
    //  details.last_poster
    //  details.participants
    //  data.post_stream.posts - array
    //  data.post_stream.stream (ids of all posts)

    let b;
    return thread;
}