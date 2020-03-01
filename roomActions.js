const utils = require("./utils")

module.exports = {
    join: (msg) => {       
        if(game.active){
            if(utils.searchPlayerIndex(msg.author.id) == -1){
                game.players.push({
                    name: msg.author.username,
                    id: msg.author.id
                })
                msg.author.send("Agora você está dentro da espionagem, prepare-se para o jogo!")
            }
            else msg.author.send("Você já está dentro do jogo!")
        }
        else msg.author.send("Nenhum jogo em andamento.")
    },    
    leave: (msg) => {       
        if(game.active){
            index = utils.searchPlayerIndex(msg.author.id)
            if(index >= 0){
                game.players.splice(index, 1)
                msg.reply("SAIU DO JOGO")
            }
            else msg.author.send("Você não está em nenhum jogo! Digite 'spy join' para entrar.")
        }
        else msg.author.send("Nenhum jogo em andamento.")
    }
}