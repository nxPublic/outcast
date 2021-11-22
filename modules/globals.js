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
global.mysql = require('mysql');
global.MysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'outcast',
    password : 'outcast',
    database : 'theoutca_discord'
});


//Our Modules
global.twitter = require('./twitter/main.js');
global.twitch = require('./twitch/main.js');