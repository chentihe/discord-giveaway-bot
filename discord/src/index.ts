import app from "./api/app";
import "reflect-metadata";
import Bot from "./client/client";
import LoadCommands from "./client/handlers/command";
import LoadEvents from "./client/handlers/event";
import { database } from "./db/databaseConnector";
import {DIService} from "discordx";
import {Container} from "typedi";

const port = process.env.PORT || 7000;

DIService.container = Container;

const bot = new Bot();

database
  .initialize()
  .then(() => {
    // add commands for client
    LoadCommands(bot);

    // add events for client & client.giveawaysManger
    LoadEvents(bot);

    bot.login(process.env.DISCORD_BOT_TOKEN!);

    app.listen(port, () => {
      console.log(`RUN ${port}`);
    });
  })
  .catch((error) => console.log(error));
