const Discord = require("discord.js"); //Chamano a lib do discord.js (npm i discord.js)
const client = new Discord.Client(); //Definindo o client
const config = require("./config.json"); //Conectando com a config.json 
const db = require('quick.db'); //Chamando o banco de dados (npm i quick.db)

//Definindo status perssonalizado e definindo o tempo de troca!
client.on("ready", () => { 
  let activities = [
  `${client.users.cache.size} usuários!`,
  `Utilize u-help para ver meus comandos`,
  `Visite meu site https://ursabot.000webhostapp.com`,
  `Estou em ${client.guilds.cache.size} servidores`

  ],
  i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "WATCHING"
  }), 1000 * 20); 
  client.user
  .setStatus("dnd")
  .catch(console.error);
  console.log("Estou Online!")
  console.log(`Estou em ${client.guilds.cache.size} servidores`)
});
 
//Se o bot entrar em um servidor
client.on("guildCreate", guild => {
  console.log(`O bot entrou no servidor: ${guild.name} (ID do servidor: ${guild.id}). Membros: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);
});

//Se o bot for removido ou sair do servdor
client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (ID do servidor: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("message", async message => {  

  if(message.channel.type === "dm") return;
  
  if(!message.content.startsWith(config.prefix))return;

  const manutencao = false;

  if(manutencao === true && message.author.id != config.dono) {
    return message.channel.send(':x: | **Desculpe pelo transtorno, mas meu criador está consertando algumas coisas, espere um pouco para voltar a me usar.**')
  }

  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length)

  try{
  const commandFile = require(`./commands/Economia/${command}.js`)
  commandFile.run(client, message, args);

 } catch (err) {
   console.error("Error: " + err);
}

  try{
    let commandFile = require(`./commands/Economia/Bitcoin/${command}.js`);
    delete require.cache[require.resolve(`./commands/Economia/Bitcoin/${command}.js`)];
    return commandFile.run(client, message, args);
  }catch (err){
    console.error("Error: " + err);
  }
  try{
    let commandFile = require(`./commands/Diversao/${command}.js`);
    delete require.cache[require.resolve(`./commands/Diversao/${command}.js`)];
    return commandFile.run(client, message, args);
  }
  catch (err){
    console.error("Error: " + err);
  }
  try{
    let commandFile = require(`./commands/Moderação/${command}.js`);
    delete require.cache[require.resolve(`./commands/Moderação/${command}.js`)];
    return commandFile.run(client, message, args);
  }
  catch (err){
    console.error("Error: " + err);
  }
  try{
    let commandFile = require(`./commands/Açoes/${command}.js`);
    delete require.cache[require.resolve(`./commands/Açoes/${command}.js`)];
    return commandFile.run(client, message, args);
  }
  catch (err){
    console.error("Error: " + err);
  }
  try{
    let commandFile = require(`./commands/owner/${command}.js`)
    delete require.cache[require.resolve(`./commands/owner/${command}.js`)];
    return commandFile.run(client, message, args);
  }
  catch (err){
    console.error("Error: " + err);
  }
  try{
    let commandFile = require(`./commands/Uteis/${command}.js`)
    delete require.cache[require.resolve(`./commands/Uteis/${command}.js`)];
    return commandFile.run(client, message, args);
  }
  catch (err){
    console.error("Error: " + err);
  }
  try{
    let commandFile = require(`./commands/Economia/Empresa/${command}.js`)
    delete require.cache[require.resolve(`./commands/Economia/Empresa/${command}.js`)];
    return commandFile.run(client, message, args);
  }
  catch (err){
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
 .setDescription(`**Olá! Eu sou a **Ursa**, Sou uma bot de Diversão e Economia**` + 
  `\n\n${dev} | Meu developer:` + '``<SrCrow/>#1435``' + `\n\n${lapis} | Meu prefixo padrão é: ` + `**${config.prefix}**` + `\n\n${net} | Use **${config.prefix}help** para ver todos os meus comandos.`)

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