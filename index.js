const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json"); 
const db = require('quick.db');

client.on("ready", () => { 
  let activities = [
  `${client.users.cache.size} Users!`,
  `Use u-help to see my commands`,

  ],
  i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "WATCHING"
  }), 1000 * 20); 
  client.user
  .setStatus("dnd")
  .catch(console.error);
  console.log("I'm Online!")
  console.log(`I am on ${client.guilds.cache.size} Servers`)
});

client.on("message", async message => {  

  if(message.channel.type === "dm") return;
  
  if(!message.content.startsWith(config.prefix))return;

  const manutencao = false;

  if(manutencao === true && message.author.id != config.dono) {
    return message.channel.send(':x: | **Sorry for the inconvenience, but my creator is fixing some things, please wait a while to use me again.**')
  }

  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length)

  try{
  const commandFile = require(`./commands/${command}.js`)
  commandFile.run(client, message, args);

 } catch (err) {
   console.error("Error: " + err);
 }
})

client.on('message', message => {
 const spaceperfil = client.emojis.cache.find(emoji => emoji.name === "Space_perfil");
 const dev = client.emojis.cache.find(emoji => emoji.name === "dev");
 const lapis = client.emojis.cache.find(emoji => emoji.name === "lapis");
 const net = client.emojis.cache.find(emoji => emoji.name === "internet");

 const embed = new Discord.MessageEmbed()
 .setColor('BLUE')
 .setDescription(`**Hi, i'm a Discord bot**` + 
  `\n\n${dev} | my dev:` + '``SrCrow02``' + `\n\n${lapis} | My prefix is: ` + `**${config.prefix}**` + `\n\n${net} | Use **${config.prefix}help** to see my commands!.`)

 if (message.author.bot) return;
 if (message.channel.type == 'dm') return;
 if (
  message.content == '<@785567076302979113>' ||
  message.content == '<@!785567076302979113>'
  ) {
  return message.channel.send(embed);
}
});

client.login(config.token);