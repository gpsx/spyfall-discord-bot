// const utils = require("./utils")

// module.exports = {

//     message :(msg,bot) =>{
//         var embed = utils.embed({msg, title: 'A rodada de declarações de iniciou',thumb:''}, bot);
//         embed.setDescription(`<@${game.players[0].id}> faça sua declaração digitando spy declaration <declaração>`)
//         msg.channel.send(embed)
//     },
//     declaration: (msg, bot) => {
//         if(game.status == "Declaration"){
//             var length = game.declaration.length
//             var declaracao = msg.content.split(" ")[2]

//             if(msg.author.id == game.players[length-1].id){
//                 game.declaration.push({
//                     name : msg.author.username,
//                     content : declaracao
//                 })
//             }
//             else{
//                 msg.channel.send("Apenas")
//             }

//             var embed = utils.embed({msg, title: 'Declarações',thumb:''}, bot);
//             for (let j = 0; j < length; j++) {
//                 embed.addField(game.declaration[j].name, game.declaration[j].message)
        
//             }
//             msg.channel.send(embed)
//         }
//         else
//         {
//             var embed = utils.embed({msg, title: 'Não é hora de declarações',thumb:''}, bot);
//             msg.channel.send(embed)
//         }
//     },
//     declarationInfo: (msg,bot) =>{
//         if(status!="Prepare"){
//             var embed = utils.embed({msg, title: 'Declarações',thumb:''}, bot);
//             for (let j = 0; j < length; j++) {
//                 embed.addField(game.declaration[j].name, game.declaration[j].message)
//             }
//             msg.channel.send(embed)
//         }
//     }
// }