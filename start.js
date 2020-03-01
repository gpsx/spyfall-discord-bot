const locations = require('./assets/locations.json')
const utils = require("./utils")

module.exports = {
    startGame: (msg, bot) => {
        if(game.active) {
            if(msg.author.id == game.creator) {
                location = locations.locations[utils.randomize(locations.locations.length)] //random a location
                game.location = location.name //set the game location
                spy = game.players[utils.randomize(game.players.length)] //spy receive object player randomized
                spy.roles = "Spy" //set spy player role as spy

                //set the roles to others players
                for (let i = 0; i < game.players.length; i++) {
                    if (game.players[i].id != spy.id) {
                        console.log(game.players[i].roles)
                        game.players[i].roles = location.roles[utils.randomize(location.roles.length)]
                    }
                }

                //message the player with the location and role
                for (let i = 0; i < game.players.length; i++) {
                    bot.fetchUser(game.players[i].id,false).then(user => {
                        user.send(`Local: ${game.location}\nPapel: ${game.players[i].roles}`)
                    })
                    
                }

                msg.channel.send("O jogo começou, achem o espião ou descubra o local!")
                console.log(game);
            }
            else msg.channel.send(`Somente <@${game.creator}> pode iniciar o jogo!`)
        }
        else msg.channel.send("Não há nenhum jogo criado!")
    }
}