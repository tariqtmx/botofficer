const Discord = require("discord.js");
const coins = require("../coins.json");
const fs = require("fs");

module.exports.run = async (bot, message, args)=>{


  const msg = message.content.toUpperCase();
  let sCoins = coins[message.author.id].coins;
  let random = Math.floor(Math.random() * 2);
  let suma = args[1];
  console.log(random);
  if(!args[0]){
    message.reply("Nenurodei ar herbas ar skaicius");
    return;
  }

  if(!suma){
    message.reply("Nenurodei sumos");
    return;
  }

  if(sCoins < args[1]){
    return message.reply("Tu neturi tiek žetonu!");
  }

if(sCoins > 1)
{//Chekinam ar yra pas zmogu pinigu daugiau nei nulis



    if(msg.includes("HERBAS"))
    {
    coins[message.author.id] = {
      coins: sCoins - suma
      };
      console.log(`${sCoins} and ${suma}`);
      if(random == 0){
      let sCoins2 = suma * 2;
      coins[message.author.id] = {
        coins: sCoins + sCoins2
      };
      //laimejai
      console.log(`${sCoins} and ${suma}`);
      let winEmbed = new Discord.RichEmbed()
      .setColor("#ffc132")
      .setAuthor(message.author.username)
      .addField("Laimejai💸", sCoins2)
      .addField("Dabar turi", sCoins + sCoins2);

      message.channel.send(winEmbed).then(msg => {msg.delete(5000)})
      }
      else
      {
      coins[message.author.id] = {
        coins: sCoins - suma
        };
        //Pralosei
        let losEmbed = new Discord.RichEmbed()
        .setColor("#ffc132")
        .setAuthor(message.author.username)
        .addField("Pralosei😰", suma)
        .addField("Dabar turi", sCoins - suma);

        message.channel.send(losEmbed).then(msg => {msg.delete(5000)})

      }
      fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
      if(err) console.log(err);
      });
      console.log(`${sCoins} and ${suma}`);
      return;
    }

  if(msg.includes("SKAICIUS"))
  {
      coins[message.author.id] = {
      coins: sCoins - suma
      };
      if(random == 1)
      {
        let sCoins2 = suma * 2;
      coins[message.author.id] = {
        coins: sCoins + sCoins2
      };
      //laimejai
      let winEmbed = new Discord.RichEmbed()
      .setColor("#ffc132")
      .setAuthor(message.author.username)
      .addField("Laimejai💸", sCoins2)
      .addField("Dabar turi", sCoins + sCoins2);

      message.channel.send(winEmbed).then(msg => {msg.delete(5000)})
      }
      else
      {
        coins[message.author.id] = {
          coins: sCoins - suma
          };
          //pralosei
          let losEmbed = new Discord.RichEmbed()
          .setColor("#ffc132")
          .setAuthor(message.author.username)
          .addField("Pralosei😰", suma)
          .addField("Dabar turi", sCoins - suma);

          message.channel.send(losEmbed).then(msg => {msg.delete(5000)})
      }
      fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
      if(err) console.log(err);
      });
      return;
  }

}

}

module.exports.help = {
  name: "flip"
}
