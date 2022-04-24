import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import { GiveawaysManager } from "discord-giveaways";
import Database from "./db/databaseConnector.js";
import LoadCommands from "./handlers/command.js";
import LoadEvents from "./handlers/event.js";

const { Bot_Info } = JSON.parse(fs.readFileSync("config.json", "utf-8"));

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉",
  },
});

client.database = new Database();

// add aliases and commands for client
["aliases", "commands"].forEach((x) => (client[x] = new Collection()));

// add commands for client
LoadCommands(client);

// add events for client & client.giveawaysManger
LoadEvents(client);

client.login(Bot_Info.token);