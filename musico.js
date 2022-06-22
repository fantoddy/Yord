const { Collection, Intents, Client } = require("discord.js");
const { Player } = require("discord-player");
const { readdirSync } = require("fs");
const db = require("quick.db");

require("./shard");
const config = require("./musico.config");
const handleEvents = require("./handlers/eventsHandler");
const handleInteractions = require("./handlers/interactionHandlers");
const registrar = require("./handlers/registrar");
const handlePlayer = require("./handlers/playerEventsHandler");

const client = new Client({
	intents: [
		
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

const players = new Player(client);
client.slashCommands = new Collection();
client.contextCommands = new Collection();
client.db = db;
client.player = players;
client.config = config;

handleEvents(client, `${__dirname}/events`);
handlePlayer(client, `${__dirname}/events/player`);
handleInteractions(client, __dirname);
registrar(client);


process.on('multipleResolves', (type, promise, reason) => { // Needed
    console.log('=== [antiCrash] | [multipleResolves] | [start] ===');
    
    console.log('=== [antiCrash] | [multipleResolves] | [end] ===');
  });
  process.on('unhandledRejection', (reason, promise) => { // Needed
    console.log('=== [antiCrash] | [unhandledRejection] | [start] ===');
    console.log(reason);
    console.log('=== [antiCrash] | [unhandledRejection] | [end] ===');
  });
  process.on('rejectionHandled', (promise) => { // If You Want You Can Use
    console.log('=== [antiCrash] | [rejectionHandled] | [start] ===');
    console.log(promise);
    console.log('=== [antiCrash] | [rejectionHandled] | [end] ===');
  })
  process.on("uncaughtException", (err, origin) => { // Needed
    console.log('=== [antiCrash] | [uncaughtException] | [start] ===');
    console.log(err);
    console.log('=== [antiCrash] | [uncaughtException] | [end] ===');
  });
  process.on('uncaughtExceptionMonitor', (err, origin) => { // Needed
    console.log('=== [antiCrash] | [uncaughtExceptionMonitor] | [start] ===');
    console.log(err);
    console.log('=== [antiCrash] | [uncaughtExceptionMonitor] | [end] ===');
  }); 



client.login(client.config.botToken);
