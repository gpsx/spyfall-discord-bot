const locations = require('./assets/locations.json')
const Discord = require('discord.js');
const utils = require("./utils")

module.exports = {
    startGame: (msg, bot) => {
        if (game.active) {
            if (msg.author.id == game.creator) {
                location = locations.locations[utils.randomize(locations.locations.length)] //random a location
                game.location = location.name //set the game location
                spy = game.players[utils.randomize(game.players.length)] //spy receive object player randomized
                spy.roles = "Spy" //set spy player role as spy

                //set the roles to others players
                for (let i = 0; i < game.players.length; i++) {
                    if (game.players[i].id != spy.id) {
                        game.players[i].roles = location.roles[utils.randomize(location.roles.length)]
                    }
                }

                //message the player with the location and role
                for (let i = 0; i < game.players.length; i++) {
                    if (game.players[i].id != spy.id) {
                        bot.fetchUser(game.players[i].id, false).then(user => {

                            var embed = utils.embed({
                                msg, title: 'Spyfall', thumb: 'https://images.emojiterra.com/twitter/v12/512px/2753.png'
                            }, bot)

                            embed.addBlankField()
                                .addField('Local:', game.location)
                                .addField('Papel:', game.players[i].roles)

                            user.send(embed)
                        })
                    }
                    else {
                        bot.fetchUser(game.players[i].id, false).then(user => {

                            var embed = utils.embed({
                                msg, title: 'Spyfall', thumb: 'https://cdn.discordapp.com/attachments/368818652109078532/683790044016017549/topsecret.png'
                            }, bot)

                            embed.addBlankField()
                                .addField('Local:', 'Descubra')
                                .addField('Papel:', 'Spy :detective: ')

                            user.send(embed)
                        })
                    }
                }

                var embed = utils.embed({
                    msg, title: 'O jogo começou, achem o espião ou descubra o local!', thumb: 'https://images.emojiterra.com/twitter/v12/512px/2753.png'
                }, bot)

                msg.channel.send(embed)
            }
            else {
                var embed = utils.embed({
                    msg, title: `Início`, thumb: 'https://images.emojiterra.com/twitter/v12/512px/2753.png'
                }, bot)

                embed.setDescription(`Somente <@${game.creator}> pode iniciar o jogo!`)

                msg.channel.send(embed)
            }
        }
        else {
            var embed = utils.embed({
                msg, title: `Não há nenhum jogo criado!`, thumb: 'https://images.emojiterra.com/twitter/v12/512px/2753.png'
            }, bot)

            msg.channel.send(embed)
        }
    }
}