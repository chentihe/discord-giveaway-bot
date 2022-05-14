import "reflect-metadata";
import { Collection, Intents } from "discord.js";
import { Client } from "discordx";
import { GiveawaysManager } from "discord-giveaways";

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

  private _command: Collection<string, Function> = new Collection();

  private _alias: Collection<string, Function> = new Collection();

  constructor() {
    super({
      simpleCommand: {
        prefix: "!g",
      },
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
      ],
    });
  }

  public get giveawaysManager(): GiveawaysManager {
    return this._giveawaysManager;
  }

  public get command(): Collection<string, Function> {
    return this._command;
  }

  public get alias(): Collection<string, Function> {
    return this._alias;
  }
}

export default Bot;
