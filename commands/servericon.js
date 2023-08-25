const Discord = require("discord.js")

exports.run = async(client, message, args,)=> { 

        let icone = new Discord.MessageEmbed() 
        .setDescription(`**Click [here](${message.guild.iconURL()}) to upload the server icon!**`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 2048 })) 
        message.channel.send(icone)
}