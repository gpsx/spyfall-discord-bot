const utils = require("./utils")

module.exports = {
    help: (msg, bot) => {

        msgSplit = msg.content.split(' ')
        var embed = utils.embed({
            msg,
            title: 'Help',
            thumb: ''
        }, bot)

        if (msgSplit.length == 2) {

            embed.setDescription("Digite 'spy help' e o número da página assim: 'spy help 1'")
                .addBlankField()
                .addField('Página 1', 'Apresentação do jogo, como funciona')
                .addField('Página 2', 'Comandos')

            msg.author.send(embed)
        }
        else
        {
            text = msgSplit[2]
            switch (text) {
                case '1':
                    return page1(embed,msg)
                case '2':
                    return page2(embed,msg)
                default:
                    msg.reply("Página não encontrada")
                    break;
            }
        }
    },
}

function page1(embed,msg) {
    embed.setDescription('O Jogo')
        .addField('Não sei', 'Sei lá')

    msg.author.send(embed)
}


function page2(embed,msg) {
    embed.setDescription('Mostrando os comandos do jogo')
        .addField('spy create', 'Cria o jogo')
        .addField('spy cancel', 'Cancela o jogo (apenas o criador)')
        .addField('spy join', 'Junta-se a um jogo já criado')
        .addField('spy leave', 'Sai do jogo após já ter entrado nele')
        .addField('spy start', 'Inicia o jogo (apenas o criador)')
        .addField('spy vote', 'Vota em um jogador para ser eliminado')
        .addField('spy locations', 'Disponibiliza os locais em jogo')

    msg.author.send(embed)
}