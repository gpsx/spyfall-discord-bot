const Discord = require('discord.js');

module.exports = {
    searchPlayerIndex:(idPlayer) => {
        for (let i = 0; i < game.players.length; i++) {
            if(game.players[i].id == idPlayer) 
                return i
        }
        return -1
    },
    randomize: (maxNumber) => {
        return Math.floor(Math.random() * maxNumber)
    },
    embed: (embedInfo,bot) => {
        var embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarUrl)
        .setColor('ff5500')
        .setFooter('@SpyFall','https://cdn.discordapp.com/avatars/683525313946189838/b14ad05c5abdf558592c9f1bf9bc2551.webp?size=128')
        .setTimestamp(embedInfo.msg.createdAt)
        .setTitle(embedInfo.title)
        .setThumbnail(embedInfo.thumb)

        return embed
    } ,
    resetVotes: () => {
        game.players.forEach(player => {
            player.votes = 0;
            delete player.voted
        })
        game.votes = 0
    },
    resetGameTied: () =>{
        game.tied = []
    },
    deactivateGame: () =>{
        global.game = {
            active: false,
            players: [],
            location: "",
            creator: "",
            votes: 0,
            tied: []
          }
    }
}