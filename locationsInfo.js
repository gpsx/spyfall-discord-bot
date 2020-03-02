const locations = require('./assets/locations.json')
const utils = require('./utils')

module.exports = {
    showLocations: (msg, bot) => {
        var embed = utils.embed({msg, title: 'Todos Locais', thumb:'https://images.emojiterra.com/twitter/v12/512px/2753.png'}, bot);
        for(location in locations.locations){
            embed.addField(parseInt(location)+1 + ':', locations.locations[location].name)
        }
        msg.reply(embed)
    }
}