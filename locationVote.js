const utils = require('./utils')

module.exports = {
    spyVote: (msg, bot) => {
        if(!game.active ) {
            var embed = utils.embed({
                msg, title: `Não há nenhum jogo criado!`, thumb: 'https://images.emojiterra.com/twitter/v12/512px/2753.png'
            }, bot)
            msg.channel.send(embed)

            return;
        }

        if(game.status != "Final"){
            var embed = utils.embed({
                msg, title: `O jogo está longe de acabar, não é hora da votação, ainda!`, thumb: 'https://images.emojiterra.com/twitter/v12/512px/2753.png'
            }, bot)
            msg.channel.send(embed)

            return;
        }


        index = utils.searchPlayerIndex(msg.author.id)
        if(game.players[index].roles == "Spy") {
            // vote = msg.content.split(" ").splice(0,2)
            // localguess=vote.join(" ")
            vote = msg.content.substring(13)
            
            console.log(vote,game.location)
            if (vote == game.location) {
                var embed = utils.embed({msg, title: 'O spy acertou a localização!',
                thumb:''}, bot);
                embed.setColor("#41AD49")
            }
            else {
                var embed = utils.embed({msg, title: `O spy errou! A localização era ${game.location}`,thumb:''}, bot);
                embed.setColor("#f41e1e")
            }
            msg.channel.send(embed)
            utils.deactivateGame();
        }
        else {
            var embed = utils.embed({msg, title: 'Somente o espião pode votar em um local',thumb:''}, bot);
            msg.channel.send(embed)
        }
    }
}