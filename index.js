import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import { GiveawaysManager } from "discord-giveaways";
import LoadCommands from "./handlers/command.js";
import LoadEvents from "./handlers/event.js";

const { Bot_Info } = JSON.parse(fs.readFileSync("config.json", "utf-8"));
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
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

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageID} ended! Winners: ${winners
      .map((member) => member.user.username)
      .join(", ")}`
  );
});

// add aliases and commands for client
["aliases", "commands"].forEach((x) => (client[x] = new Collection()));
// add commands for client
LoadCommands(client);
// add events for client
LoadEvents(client);
client.login(Bot_Info.token);
