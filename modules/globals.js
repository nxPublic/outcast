//Discord.js
const Discord = require("discord.js");
global.client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]});
const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");

//Other Modules
global.dotenv = require("dotenv").config();
global.Twit = require('twit');
global.colors = require('colors');
global.axios = require('axios');
global.fs = require ('fs');

// Misc custom helper functions
function timeAge (date) {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
global.timeAge = timeAge;


// Initialize Discourse API access
// Required for Forum Tracking of Crate Employees
if(!global.skipTracker){
    global.employees = require('./forumTracker/employees.json'); // Crate Entertainment - Employees
    global.moderators = require('./forumTracker/moderators.json'); // Crate Entertainment - Forum Moderators
    const discourse = require('discourse-sdk');
    let discourseCredentials = {
        "url" : "https://forums.crateentertainment.com/",
        "user" : "TheOutcast",
        "key" : process.env.FORUMAPIKEY,
        "urls" : {
            "privateMessages" : "topics/private-messages/TheOutcast.json",
            "profile" : function (profileName) { return "/u/" + profileName + ".json";},
            "profileActivity" : function (profileName) { return "/u/" + profileName + "/activity.json";},
            "profileActions" : "/user_actions.json",
            "newMessage" : "/post"
        }
    };
    global.discourseClient = new discourse(discourseCredentials.url, discourseCredentials.key, discourseCredentials.user);
    discourseClient.discourseCredentials = discourseCredentials;
    global.ForumTracker = require('./forumTracker/discourse.js');
}

//Social Media Modules
global.twitter = require('./twitter/main.js');
global.twitch = require('./twitch/main.js');

// Auto Embeds
global.forumEmbeds = require('./forumEmbeds/main.js');

//ThinkMatics™ by KidPid
//Essentially a joke function that answers to text messages with emojis that are a mix of the 2 posted while removing the original ones.
global.thinkMatics = require('./thinkmatics/engine.js');

//Community Ranking
global.ranking = require('./ranking/main.js');