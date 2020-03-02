const utils = require('./utils.js')

module.exports = {
    voteInfo: (msg, bot) => {
        var embed = utils.embed({
            msg, title:'Votos', thumb: 'https://cdn.discordapp.com/attachments/368818652109078532/683790044016017549/topsecret.png'
        }, bot)
        embed.setDescription('Para realizar o voto, utilize: ```spy vote @<Nome de usuário>```')
        msg.reply(embed);
    },
    voting: (msg, bot) =>{ 
        ownerIndex = utils.searchPlayerIndex(msg.author.id)
        if(game.players[ownerIndex].voted){
            msg.reply("Você só pode votar uma vez!")
            return;
        }
        var playerIndex = utils.searchPlayerIndex(msg.mentions.users.first().id);
        if(playerIndex != -1){
            if(game.players[playerIndex].votes){
                game.players[playerIndex].votes += 1;
            }else{
                game.players[playerIndex].votes = 1;
            }
            game.players[ownerIndex].voted = playerIndex
            game.votes += 1 
        }
        if(game.votes == game.players.length){
            msg.reply("acabou os votos")
            var playerVoted = game.players[0];
            var playerVotedIndex = 0;
            if(!playerVoted.votes){
                playerVoted.votes = 0;
            }
            for(player in game.players){
                if(!game.players[player].votes){
                    game.players[player].votes = 0;
                    playerVotedIndex = player;
                }
                if(game.players[player].votes > playerVoted.votes){
                    playerVoted = game.players[player];
                }
            }
            msg.reply(`Jogador mais votado foi: <@${playerVoted.id}>`)
            game.players.splice(playerVotedIndex, 1)
            if(playerVoted.roles == "Spy"){
                msg.reply('O SPY foi descoberto, escolha o lugar com ```spy location <lugar>```')
            }else{
                msg.reply("O Spy continua no jogo")
            }
        }
    }
}