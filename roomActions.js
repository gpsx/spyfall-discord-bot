const utils = require("./utils")
const Discord = require('discord.js');



module.exports = {
    join: (msg,bot) => {       
        if(game.active){
            if(utils.searchPlayerIndex(msg.author.id) == -1){
                game.players.push({
                    name: msg.author.username,
                    id: msg.author.id
                })

                var embed = utils.embed({
                    msg, title: 'Você entrou no jogo', thumb: 'https://image.flaticon.com/icons/svg/57/57659.svg'
                }, bot)

                msg.author.send(embed)
            }
            else
            {
                var embed = utils.embed({
                    msg, title: 'Você já está dentro do jogo!', thumb: 'https://image.flaticon.com/icons/svg/57/57659.svg'
                }, bot)

                msg.author.send(embed)
            } 
        }
        else
        {
            var embed = utils.embed({
                msg, title: 'Nenhum jogo em andamento.', thumb: 'https://image.flaticon.com/icons/svg/57/57659.svg'
            }, bot)

            msg.author.send(embed)
        } 
    },    
    leave: (msg,bot) => {       
        if(game.active){
            index = utils.searchPlayerIndex(msg.author.id)
            if(index >= 0){
                game.players.splice(index, 1)
                msg.reply("SAIU DO JOGO")
            }
            else
            {
                var embed = utils.embed({
                    msg, title: "Você não está em nenhum jogo! Digite 'spy join' para entrar.", thumb: 'https://image.flaticon.com/icons/svg/57/57659.svg'
                }, bot)

                msg.author.send(embed)
            } 
        }
        else
        {
            var embed = utils.embed({
                msg, title: 'Nenhum jogo em andamento.', thumb: 'https://image.flaticon.com/icons/svg/57/57659.svg'
            }, bot)

            msg.author.send(embed)
        } 
    }
}