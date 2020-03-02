const utils = require("./utils");

module.exports = {
  createGame: (msg, bot) => {
    if (!game.active) {
      (game.active = true), (game.creator = msg.author.id);

      var embed = utils.embed(
        {
          msg,
          title:
            "Jogo criado com sucesso, use 'spy join' para entrar e 'spy leave' se quiser sair.",
          thumb:
            "https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png"
        },
        bot
      );

      msg.channel.send(embed);
    } else msg.reply("Já há um jogo em andamento, se acalme!");
  },

  cancelGame: (msg, bot) => {
    if (game.active) {
      if (msg.author.id == game.creator) {
        global.game = {
            active: false,
            players: [],
            location: "",
            creator: "",
            votes: 0
        }

        var embed = utils.embed(
          {
            msg,
            title: "Jogo cancelado, use 'spy create' para criar um novo jogo.",
            thumb:
              "https://www.onlygfx.com/wp-content/uploads/2017/12/cancelled-stamp-4.png"
          },
          bot
        );

        msg.channel.send(embed);
      } else {
        var embed = utils.embed(
          {
            msg,
            title: "Cancelamento",
            thumb: "https://image.flaticon.com/icons/svg/57/57659.svg"
          },
          bot
        );

        embed.setDescription(
          `Para que ocorra o cancelamento do jogo é necessário que <@${game.creator}> o cancele`
        );

        msg.channel.send(embed);
      }
    } else {
      var embed = utils.embed(
        {
          msg,
          title:
            "Nenhum jogo em andamento use 'spy create' para criar um novo jogo.",
          thumb: "https://image.flaticon.com/icons/svg/57/57659.svg"
        },
        bot
      );

      msg.channel.send(embed);
    }
  }
};
