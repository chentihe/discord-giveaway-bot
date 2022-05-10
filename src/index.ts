import app from "./api/app";
import "reflect-metadata";
import Bot from "./client/client";
import LoadCommands from "./client/handlers/command";
import LoadEvents from "./client/handlers/event";
import { Collection } from "discord.js";

const port = process.env.PORT || 7000;

const bot = new Bot();

// add aliases and commands for client
["aliases", "commands"].forEach((x) => (bot[x] = new Collection()));

// add commands for client
LoadCommands(bot);

// add events for client & client.giveawaysManger
LoadEvents(bot);

bot.login(process.env.DISCORD_BOT_TOKEN!);

app.listen(port, () => {
  console.log(`RUN ${port}`);
});
