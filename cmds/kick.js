const Discord = require('discord.js');

module.exports = {
    name: "kick",
    execute(message, args){
      if(!message.member.hasPermission("KICK_MEMBERS")){
        var embed = new Discord.MessageEmbed()
        .setTitle("Insufficient Permissions :warning:")
        .setColor("#eb3434")
        .setDescription(`You lack the **KICK_MEMBERS** permission.`)
        .setTimestamp();

        message.channel.send(embed);
      }

      if(message.memntions.users.first() == undefined || message.mentions.users.first() == null){
          var embed = new Discord.MessageEmbed()
          .setTitle("No user mentioned :warning:")
          .setColor("#eb3434")
          .setDescription("Please mention a user according to the syntax: **!kick @User <Reason>**")
          .setTimestamp();
        
          message.channel.send(embed);
      }

      var user = message.mentions.users.first(), 
             member;
      if(user) member = await message.guild.members.fetch(user);

      if(!member.kickable){
          var embed = new Discord.MessageEmbed()
          .setTitle("Unable to kick the stated user :warning:")
          .setColor("#eb3434")
          .setDescription("The stated user cannot be kicked by the bot. In order to kick the stated user place the bots role above the role of the stated user.")
          .setTimestamp();
      
          message.channel.send(embed);
      }

      if(args.length == 1){
          var embed = new Discord.MessageEmbed()
          .setTitle("You've been kicked!")
          .setColor('#000000')
          .setDescription("You were kicked from **" + message.guild.name + "**\nReason: Kicked from the server.")
          .setTimestamp();

          member.send(embed).then(() =>{
            user.kick("Kicked.");

            var kick = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setColor("#0cf533")
            .setDescription("You successfully kicked the stated user")
            .setTimestamp();

            message.channel.send(kick);
        })
      }else if(args.length >= 2){
          var reason = message.content.split(" ").splice(2).join(" ");

          var embed = new Discord.MessageEmbed()
          .setTitle("You were kicked!")
          .setColor('#000000')
          .setDescription("You were kicked from **" + message.guild.name + "**\nReason: " + reason)
          .setTimestamp();

          member.send(embed).then(() =>{
              user.kick(reason);

              var kick = new Discord.MessageEmbed()
              .setTitle("Success!")
              .setColor("#0cf533")
              .setDescription("You successfully kicked the stated user")
              .setTimestamp();

              message.channel.send(kick);
          })
      }else{
          var embed = new Discord.MessageEmbed()
          .setTitle("Incorrect usage :warning:")
          .setColor("#eb3434")
          .setDescription("Please use: **!kick @User <Reason>**")
          .setTimestamp();

          message.channel.send(embed);
      }
    }
}