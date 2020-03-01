const createGame = require("./createGame")
const roomActions = require("./roomActions")
const start = require("./start")

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
            return createGame.createGame(msg)
        case 'join':
            return roomActions.join(msg)
        case 'leave':
            return roomActions.leave(msg)
        case 'cancel':
            return createGame.cancelGame(msg)
        case 'start':
            return start.startGame(msg, bot)
        default:
            msg.reply("Comando não reconhecido!")
            break;
    }
}