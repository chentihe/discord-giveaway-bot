import { Client, Intents } from "discord.js";
import { GiveawaysManager } from "discord-giveaways";

class Bot extends Client {
  giveawaysManager = new GiveawaysManager(this, {
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
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
      ],
    });
  }
}

export default Bot;
