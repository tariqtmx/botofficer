const Discord = require("discord.js");

module.exports.run = async (bot, message, args)=>{
  //$clear 15
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu negali ištrinti žinučiu.").then(msg => {msg.delete(5000)});
  if(!args[0]) return message.channel.send("oof");
  message.channel.bulkDelete(args[0]).then(()=>{
    message.channel.send(`Ištrintos ${args[0]} žinučiu.`).then(msg => msg.delete(5000));
  });

}

module.exports.help = {
  name: "clear"
}
