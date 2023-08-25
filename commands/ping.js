const Discord = require(`discord.js`)

module.exports.run = async (client, message, args) => {

  const ping = client.emojis.cache.find(emoji => emoji.name === "API");
  const pingMessge = await message.channel.send(('Loading...'), 100);

console.log(`LoadPing: ${pingMessge}`)

  pingMessge.edit(` ${ping} **| My Ping**\Server: **${pingMessge.createdTimestamp -
      message.createdTimestamp}ms.**\nAPI: **${Math.round(
      client.ws.ping
    )}ms**`
  );
  
  console.log(`ExelPing: ${pingMessge.edit} & ${message.author}`)
}