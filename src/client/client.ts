import "reflect-metadata";
import { Collection, Intents } from "discord.js";
import { Client } from "discordx";
import { GiveawaysManager } from "discord-giveaways";
import LoadCommands from "../client/handlers/command.js";
import LoadEvents from "../client/handlers/event.js";

import dotenv from "dotenv";

dotenv.config();

class Bot extends Client {
  private _giveawaysManager = new GiveawaysManager(this, {
    storage: "./giveaways.json",
    forceUpdateEvery: 5000,
    default: {
      botsCanWin: false,
      embedColor: "#FF0000",
      reaction: "🎉",
    },
  });

  constructor() {
    super({
      simpleCommand: {
        prefix: "!",
      },
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
      ],
    });

    // add aliases and commands for client
    ["aliases", "commands"].forEach((x) => (this[x] = new Collection()));

    // add commands for client
    LoadCommands(this);

    // add events for client & client.giveawaysManger
    LoadEvents(this);

    this.login(process.env.DISCORD_BOT_TOKEN!);
  }

  public get giveawaysManager(): GiveawaysManager {
    return this._giveawaysManager;
  }
}

export default Bot;
