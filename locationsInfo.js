const locations = require('./assets/locations.json')
const utils = require('./utils')

module.exports = {
    showLocations: (msg, bot) => {
        var embed = utils.embed({msg, title: 'Todos Locais', thumb:'https://images.emojiterra.com/twitter/v12/512px/2753.png'}, bot);

        for (let i = 0; i < locations.locations.length; i+=2) {
            embed.addField(locations.locations[i].name, locations.locations[1+i].name, true)
        }
        msg.channel.send(embed)
    }
}
