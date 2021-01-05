const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    execute(message, client, args){
        if(message.member.hasPermission("BAN_MEMBERS")){
            const mention = message.mentions.users.first() || client.users.cache.get(args[0]);

            if(mention){
                var member = message.mentions.users.first(), user;
                if(member) user = member.user;
                if(member) user = message.guild.member(member);

                if(user.bannable){
                    if(args.length == 1){
                        var embed = new Discord.MessageEmbed()
                        .setTitle("You've been banned")
                        .setColor('#000000')
                        .setDescription("You've banned from **" + message.guild.name + "**")
                        .setTimestamp();

                        user.send(embed).then(() =>{
                            user.ban({days: 7, reason: 'Banned from the server'});

                            var ban = new Discord.MessageEmbed()
                            .setTitle("Success!")
                            .setColor("#0cf533")
                            .setDescription("You successfully banned the stated user")
                            .setTimestamp();

                            message.channel.send(ban);
                        })
                    }else if(args.length >= 2){
                        var reason = message.content.split(" ").splice(2).join(" ");

                        var embed = new Discord.MessageEmbed()
                        .setTitle("You've been banned")
                        .setColor('#000000')
                        .setDescription("You've banned from **" + message.guild.name + "** Reason: " + reason)
                        .setTimestamp();

                        user.send(embed).then(() =>{
                            user.ban({days: 7, reason: reason});

                            var ban = new Discord.MessageEmbed()
                            .setTitle("Success!")
                            .setColor("#0cf533")
                            .setDescription("You successfully banned the stated user.")
                            .setTimestamp();

                            message.channel.send(ban);
                        })
                    }else{
                        var embed = new Discord.MessageEmbed()
                        .setTitle("Incorrect Usage :warning:")
                        .setColor("#eb3434")
                        .setDescription("Please use: **!ban @User <Reason>**")
                        .setTimestamp();

                        message.channel.send(embed);
                    }
                }else{
                    var embed = new Discord.MessageEmbed()
                    .setTitle("Unable to ban stated user :warning:")
                    .setColor("#eb3434")
                    .setDescription("The stated user cannot be banned by the bot. In order to ban the stated user place the bot role above the role of the stated user.")
                    .setTimestamp();
              
                    message.channel.send(embed);
                }
            }else{
                var embed = new Discord.MessageEmbed()
                .setTitle("No user mentioned :warning:")
                .setColor("#eb3434")
                .setDescription("Please mention a user according to the syntax: **!ban @User <Reason>**")
                .setTimestamp();
                
                message.channel.send(embed); 
            }
        }else{
            var embed = new Discord.MessageEmbed()
            .setTitle("Insufficient Permissions :warning:")
            .setColor("#eb3434")
            .setDescription(`You lack the **BAN_MEMBERS** permission.`)
            .setTimestamp();

            message.channel.send(embed);
        }
    }
}