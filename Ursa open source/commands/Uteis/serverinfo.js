const Discord = require('discord.js');

exports.run = (client,message,args) => {
    const guild = message.guild;

    const mod = client.emojis.cache.find(emoji => emoji.name === "moderador");
    const mundo = client.emojis.cache.find(emoji => emoji.name === "mundo");
    const coroa = client.emojis.cache.find(emoji => emoji.name === "coroa");
    const user = client.emojis.cache.find(emoji => emoji.name === "user");
    const lapis = client.emojis.cache.find(emoji => emoji.name === "lapis");
    const setaDireita = client.emojis.cache.find(emoji => emoji.name === "setaDireita");
    const web = client.emojis.cache.find(emoji => emoji.name === "internet");
    

    let createdAt = String(guild.createdAt);
    const description = guild.description;
    const banner = guild.banner;
    const id = guild.id;
    const membersCount = guild.memberCount;
    const ownerID = guild.ownerID;
    const name = guild.name;
    const region = guild.region;
    const verified = guild.verified;

    createdAt = createdAt.split('.')[0]

    const response = new Discord.MessageEmbed()
        .setColor("#00BFFF")
        .setTitle("Informações do servidor")
        .setDescription("Informações sobre o servidor:\n\n" + `**${web} | Nome:** ${name}\n\n` + `**${coroa} | Dono:** <@${ownerID}>\n\n`
         + `**${user} | Quantidade de membros:** ${membersCount}\n\n` + `**${mundo} | Região: ** ${region}\n\n` + `**${setaDireita} | ID do servidor:** ${id}\n\n` + `**Criado em:** ${createdAt}`)
        .setThumbnail(guild.bannerURL())
        .setTimestamp();

    message.channel.send(response);
}