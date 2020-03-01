const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    msg.reply('PAPA')
})

bot.login(auth.token);