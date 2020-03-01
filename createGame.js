module.exports = {
    createGame: (msg) => {       
        if (!game.active) {
            game.active = true,
            game.creator = msg.author.id
            msg.channel.send("Jogo criado com sucesso, use 'spy join' para entrar e 'spy leave' se quiser sair. ️️️️️️🕵️")
        }else{
            msg.reply("já há um jogo em andamento, se acalme!")
        }
    }
}