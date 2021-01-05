require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const prefix = "!";

const commandFiles = fs.readdirSync('./cmds/').filter(file => file.endsWith(".js"));

for(file of commandFiles){
    const command = require(`./cmds/${file}`);

    client.commands.set(command.name, command);
}


client.login(process.env.TOKEN);

client.once('ready', (ready) =>{
    client.user.setActivity('BotTechStudi Moderation System', {type: 'WATCHING'});
})

client.on('message', message =>{
  if(!message.content.startsWith(prefix) ||  message.author.bot) return;

  const args = message.content.substring(prefix.length).split(" ");

  const command = args.shift().toLowerCase();

  if(command == "kick"){
      client.commands.get('kick').execute(message,client, args);
  }else if(command == "ban"){
      client.commands.get("ban").execute(message, client, args);
  }
})

