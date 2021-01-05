const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    execute(message, client, args){
        if(message.member.hasPermission('KICK_MEMBERS')){
          const mention = message.mentions.users.first() || message.users.cache.get(args[0]);

          var member = message.mentions.users.first(), user;
          if(member) user = member.user;
          if(member) user = message.guild.member(member);

          if(mention){

            if(user.kickable){
                if(args.length == 1){
                    const embed = new Discord.MessageEmbed()
                      .setColor("#000000")
                      .setTitle("You have been kicked")
                      .setDescription("You've been kicked from **"+ message.guild.name + "**")
                      .setTimestamp();

                      user.send(embed).then(() =>{
                        user.kick("Kicked " + member.username);
                      })
                      
                }else if(args.length >= 2){
                    var reason = message.content.split(' ').splice(2).join(' ');

                    var embed = new Discord.MessageEmbed()
                      .setColor("#000000")
                      .setTitle("You have been kicked")
                      .setDescription("You've been kicked from **"+ message.guild.name + "** Reason: " + reason)
                      .setTimestamp();

                      user.send(embed).then(() =>{
                        user.kick("Kicked " +member.username + " Reason: " + reason);

                        var kick = new Discord.MessageEmbed()
                        .setTitle("Success!")
                        .setColor("#0cf533")
                        .setDescription("Sucessfully kicked the stated user.")
                        .setTimestamp();

                        message.channel.send(kick);
                      })
                      
                }else{
                    var embed = new Discord.MessageEmbed()
                    .setTitle("Incorrect Usage :warning:")
                    .setColor("#eb3434")
                    .setDescription("Please use: **!kick @User <Reason>**")
                    .setTimestamp();

                    message.channel.send(embed);
                }
            }else{
              var embed = new Discord.MessageEmbed()
              .setTitle("Unable to kick stated user :warning:")
              .setColor("#eb3434")
              .setDescription("The stated user cannot be kicked by the bot. In order to kick the stated user place the bot role above the role of the stated user.")
              .setTimestamp();
              
              message.channel.send(embed);  
            }

          }else{
            var embed = new Discord.MessageEmbed()
            .setTitle("No user mentioned :warning:")
            .setColor("#eb3434")
            .setDescription("Please mention a user according to the syntax: **!kick @User <Reason>**")
            .setTimestamp();
            
            message.channel.send(embed);
          }
        }else{
          var embed = new Discord.MessageEmbed()
          .setTitle(`Insufficient permissions :warning:`)
          .setColor("#eb3434")
          .setDescription(`You lack the **KICK_MEMBERS** permission.`)
          .setTimestamp();
          message.channel.send(embed);
        }  
    }
}