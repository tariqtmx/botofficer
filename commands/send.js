const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args)=>{

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let pCoins = coins[pUser.id].coins; //sender
  let sCoins = coins[message.author.id].coins; //reciver

  if(message.author.id === pUser.id){
    return message.reply("Tu negali sau nusiusti žetonu!");//Chekinam ar zmogus bando sau nusisiusti zetonu
  }

  if(sCoins < 1){
    return message.reply("Tu neturi jokiu žetonu!");//Chekinam ar zmogus turiu daugiau nei 0 zenotu
  }

  if(sCoins < args[1]){
    return message.reply("Tu neturi tiek žetonu!");//Chekinam ar suncia pakankamai zenotu o ne daugiau nei turi
  }


  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  if(sCoins < args[0]) return message.reply("Nepakankamai žetonu ten!");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} davė ${pUser} ${args[1]} žetonu`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
    if(err) console.log(err);
  });

}

module.exports.help = {
  name: "send"
}
