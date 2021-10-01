const Discord = require('discord.js')

exports.run = async(client, message, args) => {

	if(args.length > 50) return message.channel.send(':x: | **Limite de 50 caracteres!**')

	const embed = new Discord.MessageEmbed()
	.setColor('BLUE')
	.setDescription(`:inbox_tray: | Embed feita pelo(a) ${message.author}\n` + '```' + `${args.join(' ')}` + '```')

	message.channel.send(embed)
}