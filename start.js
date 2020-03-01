const locations = require('./assets/locations.json');
const utils = require("./utils")

module.exports = {
    startGame: () => {
        console.log(locations.length);
        
        location = locations[utils.randomize(locations.length)]
        game.location = location.name
        spy = game.players[utils.randomize(game.players.length)].role = "Spy"
        spyID = spy.id
        for (let i = 0; i < game.players.length; i++) {
            if (game.players[i].id != spyID) {
                game.players[i].role = locations.role[utils.randomize(locations.role.length)]
            }
        }
        console.log(game);
    }
}
