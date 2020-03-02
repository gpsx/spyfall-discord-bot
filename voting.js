const utils = require('./utils.js')

function processVote(msgOwnerIndex, playerVotedIndex) {
    if (playerVotedIndex != -1) {
        if (game.players[playerVotedIndex].votes) {
            game.players[playerVotedIndex].votes += 1;
        } else {
            game.players[playerVotedIndex].votes = 1;
        }
        game.players[msgOwnerIndex].voted = playerVotedIndex
        game.votes += 1
    } else {
        msg.reply("Esta pessoa não está jogando")
    }
}

function finishVoteSession(msg) {
    msg.channel.send("Acabou a rodada dos votos")
    var playerVoted;
    var playerVotedIndex;
    game.players.forEach((player, index) => {
        if(!player.votes){
            player.votes = 0;
        }
        if(!playerVoted || player.votes > playerVoted.votes){
            playerVoted = player;
            playerVotedIndex = index;
        }
    })
    announceWhoIsTheVoted(msg, playerVoted, playerVotedIndex)
}

function announceWhoIsTheVoted(msg, playerVoted, playerVotedIndex){
    msg.channel.send(`Jogador mais votado foi: <@${playerVoted.id}>`)
    game.players.splice(playerVotedIndex, 1)
    if (playerVoted.roles == "Spy") {
        msg.channel.send('O SPY foi descoberto, escolha o lugar com ```spy location <lugar>```')
    } else {
        msg.channel.send("O Spy continua no jogo")
    }
}

module.exports = {
    voteInfo: (msg, bot) => {
        var embed = utils.embed({
            msg, title: 'Votos', thumb: 'https://cdn.discordapp.com/attachments/368818652109078532/683790044016017549/topsecret.png'
        }, bot)
        embed.setDescription('Para realizar o voto, utilize: ```spy vote @<Nome de usuário>```')
        msg.channel.send(embed);
    },
    voting: (msg, bot) => {
        msgOwnerIndex = utils.searchPlayerIndex(msg.author.id)
        if (game.players[msgOwnerIndex].voted) {
            msg.reply("Você só pode votar uma vez!")
            return;
        }
        try{
            var playerVotedIndex = utils.searchPlayerIndex(msg.mentions.users.first().id);
            processVote(msgOwnerIndex, playerVotedIndex)
            if (game.votes == game.players.length) {
                finishVoteSession(msg)
            }
        }catch{
            msg.channel.send("Vota certo MEU!")
        }
    }
}