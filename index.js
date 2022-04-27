import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import { GiveawaysManager } from "discord-giveaways";
import Database from "./db/databaseConnector.js";
import LoadCommands from "./handlers/command.js";
import LoadEvents from "./handlers/event.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

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


const app = express();
const port = process.env.PORT || 7000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/nfts/:nftId", async (req, res) => {
  const nft = await client.database.nft.retrieve(req.params.nftId);
  return res.send(JSON.stringify(nft));
});

app.get("/nftamounts/:contractId/:userId", async (req, res) => {
  const nftAmount = await client.database.nftAmount.retrieve(req.params.contractId, req.params.userId);
  return res.send(JSON.stringify(nftAmount));
});

app.post("/nftamounts", async (req, res) => {
  const data = req.body;
  const nftAmount = await client.database.nftAmount.create(data);
  return res.send(JSON.stringify(nftAmount));
});

app.listen(port, () => {
  console.log(`RUN ${port}`);
});
