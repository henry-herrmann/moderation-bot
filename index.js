require('dotenv').config();

const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
client.commands = new Discord.Collection();

const fs = require('fs');

const prefix = "!";

const commandFiles = fs.readdirSync('./cmds/').filter(file => file.endsWith(".js"));

for(file of commandFiles){
    const command = require(`./cmds/${file}`);

    client.commands.set(command.name, command);
}


client.login(process.env.TOKEN);

client.once('ready', (ready) =>{
    client.user.setActivity('Moderation bot von Henry Herrmann ', {type: 'PLAYING'})
    
})

client.on('message', async message =>{
  if(!message.content.startsWith(prefix) ||  message.author.bot) return;

  const args = message.content.substring(prefix.length).split(" ");

  const command = args.shift().toLowerCase();

  if(command == "kick"){
      client.commands.get('kick').execute(message, args);
  }else if(command == "ban"){
      client.commands.get("ban").execute(message, args);
  }else{
      var embed = new Discord.MessageEmbed()
      .setTitle("Moderation bot")
      .setColor("#003bed")
      .setDescription("The following commands are all commands being processed by this bot:")
      .addField("**Utility**", ">>> **!kick** @User <Reason>\n**!ban** @User <Reason>")
      .setFooter("Made by Henry Herrmann.")
      .setTimestamp();

      message.channel.send(embed)
  }
})

