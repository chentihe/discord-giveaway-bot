import dotenv from "dotenv";
import { Collection } from "discord.js";
import app from "./api/app.js";
import Bot from "./client/client.js";
import LoadCommands from "./client/handlers/command.js";
import LoadEvents from "./client/handlers/event.js";

dotenv.config();

const bot = new Bot();

// add aliases and commands for client
["aliases", "commands"].forEach((x) => (bot[x] = new Collection()));

// add commands for client
LoadCommands(bot);

// add events for client & client.giveawaysManger
LoadEvents(bot);

bot.login(process.env.DISCORD_BOT_TOKEN);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`RUN ${port}`);
});
