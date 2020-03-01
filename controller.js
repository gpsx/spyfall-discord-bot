const createGame = require("./createGame")
const roomActions = require("./roomActions")
const start = require("./start")
const Discord = require('discord.js');

global.game = {
    active: false,
    players: [],
    location: "",
    creator: ""
}

module.exports = {
    receiveMessage: (msg, bot) => {       
        command = switchMessage(msg, bot)
    }
}

switchMessage = (msg, bot) => {
    msgSplit = msg.content.split(' ')
    text = msgSplit[1]
    switch (text) {
        case 'create':
            return createGame.createGame(msg, bot)
        case 'join':
            return roomActions.join(msg, bot)
        case 'leave':
            return roomActions.leave(msg, bot)
        case 'cancel':
            return createGame.cancelGame(msg, bot)
        case 'start':
            return start.startGame(msg, bot)
        default:
            msg.reply("Comando não reconhecido!")
            break;
    }
}