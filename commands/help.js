const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  let helpembed = new Discord.RichEmbed()
  .setDescription("~Pagalba~")
  .setColor("#4f80ff")
  .addField("Komandos", "$report @vardas kodel \n $serverinfo \n $botinfo \n $kick @vardas kodel \n $ban @vardas kodel \n $tempmute @vardas s/m/h/d \n $ping");
  message.delete().catch(O_o=>{});
  message.author.send(helpembed);
}

module.exports.help = {
  name: "help"
}
