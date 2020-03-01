const createGame = require("./createGame")
global.game = {
    active: false,
    players: [],
    location: "",
    creator: ""
}

module.exports = {
    receiveMessage: (msg) => {       
        command = switchMessage(msg)
    }
}

switchMessage = (msg) => {
    msgSplit = msg.content.split(' ')
    text = msgSplit[1]
    switch (text) {
        case 'create':
            return createGame.createGame(msg)
        default:
            msg.reply("Comando não reconhecido!")
            break;
    }
}