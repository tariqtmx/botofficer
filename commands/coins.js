const Discord = require("discord.js");
let coins = require("../coins.json")

module.exports.run = async (bot, message, args)=>{
  //cheking if there is an coin
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;

  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#ffc132")
  .addField("💰", uCoins);

  message.channel.send(coinEmbed).then(msg => {msg.delete(4000)});

}

module.exports.help = {
  name: "coins"
}
