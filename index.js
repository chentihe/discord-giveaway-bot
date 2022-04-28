import { Client, Collection, Intents } from "discord.js";
import { GiveawaysManager } from "discord-giveaways";
import Database from "./db/databaseConnector.js";
import LoadCommands from "./handlers/command.js";
import LoadEvents from "./handlers/event.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

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

client.login(process.env.DISCORD_BOT_TOKEN);

const app = express();
const port = process.env.PORT || 7000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// fetch nft
app.get("/nfts/:nftId", (req, res) => {
  return client.database.nft
    .retrieve(req.params.nftId)
    .then((data) => res.send(JSON.stringify(data)));
});

// fetch nftamounts
app.get("/nftamounts/:contractId/:userId", (req, res) => {
  return client.database.bonus
    .retrieve(req.params.contractId, req.params.userId)
    .then((data) => res.send(JSON.stringify(data)));
});

// create nftamounts
app.post("/nftamounts", (req, res) => {
  return client.database.bonus
    .create(req.body)
    .then((data) => res.send(JSON.stringify(data)));
});

app.listen(port, () => {
  console.log(`RUN ${port}`);
});
