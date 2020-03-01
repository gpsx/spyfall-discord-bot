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
    }
}