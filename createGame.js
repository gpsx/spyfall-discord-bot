module.exports = {
    createGame: (msg) => {       
        if (!game.active) {
            game.active = true,
            game.creator = msg.author.id
            msg.channel.send("Jogo criado com sucesso, use 'spy join' para entrar e 'spy leave' se quiser sair. ️️️️️️🕵️")
        }else{
            msg.reply("já há um jogo em andamento, se acalme!")
        }
    },

    cancelGame: (msg) => {
        if (game.active)
        {
            if  (msg.author.id == game.creator)
            {
                game.active = false,
                game.creator = ""
                msg.channel.send("Jogo cancelado, use 'spy create' para criar um novo jogo.")
            }
            else
            {
                msg.channel.send("Para que ocorra o cancelamento do jogo é necessário que o criador do mesmo o cancele.")
            }    
        }
        else
        {
            msg.channel.send("Nenhum jogo em andamento use spy create' para criar um novo jogo.")
        }
    }
}