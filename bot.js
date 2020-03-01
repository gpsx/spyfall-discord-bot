const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');
const controller = require('./controller')

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content.startsWith('spy')) {
      controller.receiveMessage(msg, bot)
    }
});

bot.login(auth.token);