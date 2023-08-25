const Discord = require("discord.js"); 
const db = require('quick.db'); 
const ms = require('ms'); 

exports.run = async (client, message, args) => {

    const no = client.emojis.cache.find(emoji => emoji.name === "nocheck");

    let avatar = message.author.displayAvatarURL({format: 'png'});
    let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;
        
    let tempo_esgotado = 84000000;
    let author = await db.fetch(`worked_${user.id}`);

    let embedErro = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`${no} | ${user}, **Sorry but you already took you daily money!**`)

    if(author !== null && tempo_esgotado - (Date.now() - author) > 0){
        let time = ms(tempo_esgotado - (Date.now() - author));
        return message.channel.send(embedErro)
    } else {

    let amount = Math.floor(Math.random() * 100) + 300;
    let ruby = Math.floor(Math.random() * 5) + 1;

    let embed = new Discord.MessageEmbed()
    .setColor('GOLD')
    .setDescription(`⭐ | Congratulations ${user}, you win ||**${amount}**|| on daily!`);

    db.add(`coins_${user.id}`, amount)
    db.set(`worked_${user.id}`, Date.now())

    message.channel.send(`${user}`, embed);
    
    }
}
