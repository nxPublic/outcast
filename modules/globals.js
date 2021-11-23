//Discord.js
const Discord = require("discord.js");
global.client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]});
const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");

//Other Modules
global.dotenv = require("dotenv").config();
global.Twit = require('twit');
global.colors = require('colors');
global.fetch = require('node-fetch');
global.axios = require('axios');
global.fs = require ('fs');

// Initialize Discourse API access
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


//Our Modules
global.twitter = require('./twitter/main.js');
global.twitch = require('./twitch/main.js');