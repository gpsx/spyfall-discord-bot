module.exports = {
    receiveMessage: (msg) => {
        command = switchMessage(msg)
    }
}

switchMessage = (msg) => {
    defineChannel(msg)
    msgSplit = msg.content.split(' ')
    text = msgSplit[1]
    switch (text) {
        case '':
            return 
        default:
            msg.reply("Comando não reconhecido!")
            break;
    }
}