const createGame = require("./createGame")
const roomActions = require("./roomActions")
const start = require("./start")
const locationsInfo = require("./locationsInfo")
const voting = require("./voting")
const help = require("./help")
const Discord = require('discord.js');

global.game = {
    active: false,
    players: [],
    location: "",
    creator: "",
    votes: 0
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
        case 'locations':
            return locationsInfo.showLocations(msg, bot)
        case 'vote':
            return voting.voting(msg, bot)
        case 'help':
            return help.help(msg,bot)
        default:
            msg.reply("Comando não reconhecido! Digite spy help para verificar os comandos")
            break;
    }
}