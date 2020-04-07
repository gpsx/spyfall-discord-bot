const utils = require('./utils.js')

function processVote(msgOwnerIndex, playerVotedIndex,msg) {
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

function isTied(msg, mostVotedPlayer, mostVotedPlayerIndex) {
    if (mostVotedPlayerIndex.length > 1) {
        game.tied = mostVotedPlayer
        msg.channel.send("Voto empatado entre: ")
        game.tied.forEach(player => {
            msg.channel.send(`<@${player.id}>`)
        })
        msg.channel.send("Rodada de votos novamente. Somente pode votar nestes players")
        utils.resetVotes();
    } else {
        announceWhoIsTheVoted(msg, mostVotedPlayer[0], mostVotedPlayerIndex[0])
    }
}

function searchMostVotedPlayers(msg) {
    var mostVotedPlayer = [];
    var mostVotedPlayerIndex = [];
    game.players.forEach((player, index) => {
        if (!player.votes) {
            player.votes = 0;
        }
        if (mostVotedPlayer.length == 0 || player.votes > mostVotedPlayer[0].votes) {
            mostVotedPlayer = []
            mostVotedPlayerIndex = []
            mostVotedPlayer.push(player);
            mostVotedPlayerIndex.push(index);
        }
        else if (player.votes == mostVotedPlayer[0].votes) {
            mostVotedPlayer.push(player);
            mostVotedPlayerIndex.push(index);
        }
    })
    return isTied(msg, mostVotedPlayer, mostVotedPlayerIndex)
}

function finishVoteSession(msg) {
    if(game.tied.length > 1){
        utils.resetGameTied
    }
    msg.channel.send("Acabou a rodada dos votos")
    searchMostVotedPlayers(msg)

}

function announceWhoIsTheVoted(msg, playerVoted, playerVotedIndex) {
    msg.channel.send(`Jogador mais votado foi: <@${playerVoted.id}>`)

    if (playerVoted.roles == "Spy") {
        msg.channel.send('O SPY foi descoberto, escolha o lugar com ```spy location <lugar>```')
        game.status = "Final"
    } else {
        game.players.splice(playerVotedIndex, 1)
        msg.channel.send("O Spy continua no jogo")
        checkSpyIsTheLastOne(msg)
    }
    utils.resetVotes();
    utils.resetGameTied();
}

function checkSpyIsTheLastOne(msg){
    if(game.players.length == 1){
        msg.channel.send(`<@${game.players[0].id}> Ganhou o Jogo como SPY`)
        utils.deactivateGame()
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
        if (msgOwnerIndex == -1) {
            msg.reply("Você não está nesse jogo")
            return
        }
        if (game.players[msgOwnerIndex].voted) {
            msg.reply("Você só pode votar uma vez!")
            return;
        }
        var mention = msg.mentions.users.first()
        
        if(mention == null){
           
            msg.reply("Vota em alguém")
            return
        }
        var playerVotedIndex = utils.searchPlayerIndex(mention.id);
        processVote(msgOwnerIndex, playerVotedIndex,msg)
        if (game.votes == game.players.length) {
            finishVoteSession(msg)
        }
        //msg.channel.send("Vota certo MEU!")

    },
    votingTied: (msg, bot) => {
        playerFound = false;
        game.tied.forEach(tiedPlayer => {
            if (msg.mentions.users.first().id == tiedPlayer.id) {
                playerFound = true
                return module.exports.voting(msg, bot)
            }
        })
        if(!playerFound)
            msg.reply("Somente os players que estão empatados")
    }
}