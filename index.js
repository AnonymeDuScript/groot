const express = require('express');
const server = express();

server.all('/', (req, res) => {
    res.send('<h2>Server is ready!</h2>');
});

server.listen(4000, () => {
      console.log('Server Ready.');
});


const { Client, GatewayIntentBits, Message, Guild } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
	],
});
const Database = require("@replit/database")
const db = new Database()

client.on('ready', () => {
  console.log('I am ready!');
  updateStatus();
});

var grootMsg = [
      "Je s'appelle Groot",
      "Jeg er Groot", 
      "Ich bin Groot",
      "O wau ‘o Groot",
      "Sono Groot",
      "Watashi wa Gurūtodesu",
      "Ego sum Groot",
      "Jestem Groot",
      "Eu sou Groot",
      "O a‘u o Groot",
      "Yo soy Groot",
      "Mimi ni Groot",
      "I am Groot",
      "Je s'appelle groot",
      "Je s'appelle grooooot", 
      "Jeg er groot", 
      "Ich bin groot",
      "O wau ‘o groot",
      "Sono groot",
      "Watashi wa gurūtodesu",
      "Ego sum groot",
      "Jestem groot",
      "Eu sou groot",
      "O a‘u o groot",
      "Yo soy groot",
      "Mimi ni groot",
      "I am groot",
      "Yo soy grooooot",
      "Je s'appelle Grooooot"
  ]

// Crée une fonction qui change le statut du bot
function updateStatus() {
  // Sélectionne un message aléatoire de grootMsg
  const status = grootMsg[Math.floor(Math.random() * grootMsg.length)];
  
  // Change le statut du bot avec le message sélectionné
  client.user.setPresence({ activity: { name: status } });
}

// Appelle la fonction toutes les minutes (60 000 milliseconds)
setInterval(updateStatus, 60000);

//Create the !on command and !off command
client.on('messageCreate', function(message) {
  if (message.member.permissions.has('ADMINISTRATOR')) {
    if (message.content === '!on') {
        message.channel.send(grootMsg[Math.floor(Math.random() * grootMsg.length)] + " 🥳");
        db.set(message.guildId, true);
    }
    if (message.content === '!off') {
        db.set(message.guildId, false);
    }
  } else {
    message.channel.send(grootMsg[Math.floor(Math.random() * grootMsg.length)] + " ❌");
  }
});

client.on('messageCreate', function(message) {
  try {
  if (message.author.bot) return;
    db.get(message.guildId).then(value => {
        if (value === false) return;
          if (grootMsg.includes(message.content)) {
            message.react('❌');
          } else {
            message.channel.send(grootMsg[Math.floor(Math.random() * grootMsg.length)]);
           } 
      })
  } catch (error) {
    console.error(error);
  }
});

client.on('guildMemberAdd', (member) => {
  try {
  member.send(grootMsg[Math.floor(Math.random() * grootMsg.length)] + " 👋");
  } catch (error) {
    console.error(error);
  }
});

client.on('guildCreate', (guild) => {
  try {
   db.set(guild.id, true).then(() => {});
  guild.fetchOwner().then(owner => { 
    owner.send(grootMsg[Math.floor(Math.random() * grootMsg.length)] + " 🎉 (You can turn off the bot with !off and turn on with !on");
  })
  } catch (error) {
    console.error(error);
  }
});

client.login("TOKEN HERE");
