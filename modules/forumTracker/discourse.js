let striptags = require('striptags');

class grimDawnForumTracker {

    constructor (name){
        this.posts = [];

        this.loadRecentPosts(name);
    }

    async loadRecentPosts(name) {
        let para = {
            //?offset=0&username=" + profileName + "&filter=4,5"
            offset : 0,
            username : name,
            filter : "4,5"
        };
        await discourseClient.get(discourseClient.discourseCredentials.urls.profileActions, para,
            await async function (error, body, httpCode) {

                if(httpCode !== 200)
                    return false;

                let data = JSON.parse(body);

                if(data["user_actions"] === undefined)
                    return false;

                data = data["user_actions"];

                let i = 0;
                for(i; i<data.length; i++){
                    let entry = data[i];
                    let post = {
                        author: {
                            name: entry.username,
                            color: 16731648,
                            avatar: entry.avatar_template.replace("{size}", 64),
                        },
                        topic : {
                            id: entry.topic_id,
                            title: entry.title,
                            slug: entry.slug,
                            link: "https://forums.crateentertainment.com/t/" + entry.slug + "/" + entry.topic_id + "/" + entry.post_number
                        },
                        post: {
                            created_at: entry.created_at,
                            number: entry.post_number,
                            content: striptags(entry.excerpt),
                            id: entry.post_id
                        },
                        category: subCategories[entry.category_id]
                    };

                    // Exclude forum category "Bug Reports"
                    if(entry.category_id === 27)
                        break;

                    if(post.post.id !== undefined && post.post.id !== null && post.post.content !== "" && post.post.content !== undefined){
                        //let isRegisterd = await postsIsRegisterd(post.post.id); TODO: CHECK IF ITS ALREADY IN THE DATABASE
                        let empty = await client.emojis.cache.find(r => r.name === "empty").toString();

                        let embed = {
                            "title": decodeHTMLEntities(post.topic.title),
                            "description": post.post.content,
                            "url": post.topic.link,
                            "color": post.author.color,
                            "timestamp" : new Date(post.post.created_at),
                            "footer": {
                                "icon_url": "https://media.discordapp.net/attachments/426464234994532364/598264173415366686/1d73734693fe84d11fefd6510f179a4ec992a7a9_2_32x32.png",
                                "text":  post.category.parent.name + " / " + post.category.name
                            },
                            "thumbnail": {
                                "url":  "https://forums.crateentertainment.com" + post.author.avatar,
                            },
                            "fields": [
                                {
                                    "name": empty,
                                    "value": "[Click here to view full post.]("+ post.topic.link + ") "
                                },
                                {
                                    "name": "Author",
                                    "value": "["+ post.author.name + "](" + "https://forums.crateentertainment.com/u/" + post.author.name + "/)"
                                }
                            ]
                        };
                        let channel = await server.channels.cache.find(r => r.name === "test");

                        let isAlreadyPosted = await registerPost(post.post.id, post.author.name);

                        if(!isAlreadyPosted){
                            console.log("POST " + post.post.id);
                            //channel.send({ embeds: [embed] });
                        }


                    }
                }
            }
        );

        return true;
    }

};



function decodeHTMLEntities(text) {

    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', ''],
        ['gt', ''],
        ['nbsp', ' '],
        ['quot', '"'],
        ['rsquo', '\'']
    ];
    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

async function registerPost(id, name){
    let path = '\\posts\\' + name + ".json";

    let isPresent = false;
    let isNewFile = false;
    // check if file is present
    if(!await fs.existsSync(__dirname + path)) {
        // Create file if it doesnt exist
        await fs.appendFileSync(__dirname + path, id + ",");
        isNewFile = true;
    }else{
        // If file exist
        let ids = await fs.readFileSync(__dirname + path).toString().split(",");
        isPresent = ids.includes(`${id}`); // The string conversion is required.
    }

    if(!isPresent && isNewFile === false) {
        await fs.appendFileSync(__dirname + path, id + ",");
    }

    return isPresent;
}

module.exports = grimDawnForumTracker;