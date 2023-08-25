const Discord = require('discord.js')

exports.run = async(client, message, args) => {

	if(args.length > 50) return message.channel.send(':x: | **50 character limit!**')

	const embed = new Discord.MessageEmbed()
	.setColor('BLUE')
	.setDescription(`:inbox_tray: | Embed made by ${message.author}\n` + '```' + `${args.join(' ')}` + '```')

	message.channel.send(embed)
}