const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Boto Informacija")
      .setColor("#4f80ff")
      .setThumbnail(bicon)
      .addField("Boto Vardas", bot.user.username)
      .addField("Boto versija", "0.8.0");
      message.delete();
      message.author.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
