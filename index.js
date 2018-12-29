const Botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs")
const bot = new Discord.Client({disableEveryone: true});
const antispam = require("./discord-anti-spam");
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
      console.log("Neradau komandu");
      return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} užkrautas!`);
    bot.commands.set(props.help.name, props);
  });

});



bot.on("ready", async () => {
  console.log(`${bot.user.username}`);
  //Cia paraso ka botas veikia tai dabar rasys Watching Patruliuoja
  bot.user.setActivity("Patruliuoja", {type: "WATCHING"});
});

//auto role add
bot.on("guildMemberAdd", member => {
  console.log("Žmogus vardu " + member.user.username + " katik prisijunge!")

  let role = member.guild.roles.find(role => role.name === "Member");

  member.addRole(role)
});

antispam(bot, {
  warnBuffer: 5, //Maximum amount of messages allowed to send in the interval time before getting warned.
  maxBuffer: 10, // Maximum amount of messages allowed to send in the interval time before getting banned.
  interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
  warningMessage: "baik spaminti arba gausi per pakauši.", // Warning message send to the user indicating they are going to fast.
  banMessage: "buvo užbanintas už spaminima, gal dar kažkas nori?", // Ban message, always tags the banned user in front of it.
  maxDuplicatesWarning: 6,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
  maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  deleteMessagesAfterBanForPastDays: 7, // Delete the spammed messages after banning for the past x days.
  exemptUsers: ["Boost#7515", "MldcČiūvas#0591", "BotOfficer#2653", "Lincax#8383"]
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let prefix = Botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  const sender = message.author;
  const msg = message.content.toUpperCase();


  //chat filter
  if(msg.includes("NIGGER") || msg.includes("NIBBER") || msg.includes("NIGERIS") || msg.includes("NIBERIS") || msg.includes("NIGER") || msg.includes("NIBER") || msg.includes("N-I-B-B-E-R") || msg.includes("N-I-G-G-E-R") || msg.includes("N-I-G-E-R-I-S"))
  {
    let fUser = message.author;


    let filterEmbed = new Discord.RichEmbed()
    .setDescription("ChatFilteris")
    .setColor("#48f442")
    .addField("Panaudojo uždrausta žodi", `${fUser}`)
    .addField("Kokiam chaneli", message.channel);

    let filterchanel = message.guild.channels.find(`name`, "reportai_ismesti_banai");
    if(!filterchanel) return message.channel.send("Neradau chanelio");
    message.delete().catch(O_o=>{});

    filterchanel.send(filterEmbed);

  };



  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

  if (cmd == `${prefix}ping`)
  {
    message.channel.send("Pong!");
  }


});


bot.login(process.env.token);
