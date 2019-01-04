const Discord = require("discord.js");
const botconfig = require("../botconfig");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args)=>{

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 0
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = curlvl * 300;
  let difference = nxtLvl - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#a3ffba")
  .addField("Lygis", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP liko iki kito lygio`, message.author.displayAvatarURL);
  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "level"
}
