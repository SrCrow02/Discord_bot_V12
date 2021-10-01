const Discord = require("discord.js"); //Chamando o discord.js
const db = require('quick.db'); //Chamando o Banco de dados
const ms = require('ms'); //Chamando o NPM de ms

exports.run = async (client, message, args) => {

        //Emoji
        const no = client.emojis.cache.find(emoji => emoji.name === "nocheck");
        //Emoji

        //Definindo usuario e avatar
        let avatar = message.author.displayAvatarURL({format: 'png'});
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;
        
        //Tempo de espera pra cada daily
        let tempo_esgotado = 84000000;
        let author = await db.fetch(`worked_${user.id}`);

        //Embed tempo não concluido
        let embedErro = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`${no} | ${user}, **Desculpe mas você já pegou seu daily diario, Volte mais tarde!**`)

        //Se tempo não for concluido embedErro
        if(author !== null && tempo_esgotado - (Date.now() - author) > 0){
            let time = ms(tempo_esgotado - (Date.now() - author));
            return message.channel.send(embedErro)
        } else {

            //Random de quanto ira ganhar
            let amount = Math.floor(Math.random() * 100) + 300;
            let ruby = Math.floor(Math.random() * 5) + 1;

            //Embed sucesso
            let embed = new Discord.MessageEmbed()
            .setColor('GOLD')
            .setDescription(`⭐ | Parabéns ${user}, você ganhou ||**${amount}**|| no daily diário! Espere mais **1 dia** para realizar outro daily.`);

            //Adicionando dinheiro
            db.add(`coins_${user.id}`, amount)
            db.set(`worked_${user.id}`, Date.now())

            message.channel.send(`${user}`, embed);
        }
}
