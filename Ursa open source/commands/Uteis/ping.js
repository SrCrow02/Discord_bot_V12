const Discord = require(`discord.js`)

module.exports.run = async (client, message, args) => {

  //Emoji
  const ping = client.emojis.cache.find(emoji => emoji.name === "API");

  const pingMessge = await message.channel.send(('Carregando...'), 100);

//Messagem de carregando
console.log(`LoadPing: ${pingMessge}`)

  //Editando a menssagem para a de ping
  pingMessge.edit(` ${ping} **| Meu Ping**\nServidor: **${pingMessge.createdTimestamp -
      message.createdTimestamp}ms.**\nAPI: **${Math.round(
      client.ws.ping
    )}ms**`
  );
  
  //Printando a menssagem
  console.log(`ExelPing: ${pingMessge.edit} & ${message.author}`)
}; //Exel = Execulta Message No Console //Load Mostra Carregamento No Console