const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if(command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      }
    

      if(command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
      }


      if(command === "kick") {
        if(!message.member.roles.some(r=>["Administrator", "Moderator, Mod, Admin, Co-Owner,Server Creator,Gods"].includes(r.name)) )
        return message.reply("Sorry You do Not Have Permission to do this https://www.pinterest.com/pin/585890232758035753/");
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
          return message.reply("You dingbat mention someone idiots these days");
        if(!member.kickable) 
          return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
          let reason = args.slice(1).join(' ');
          if(!reason) reason = "No reason provided";
          await member.kick(reason)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
      }

if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator,Gods, Server Creator,Co-Owner, Moderator"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("You dingbat mention someone idiots these days");
  if(!member.bannable) 
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason provided";
  
  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
}

if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Sorry Buuddy i only accept 2 to 100 messages");
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  });

  client.login (config.token);