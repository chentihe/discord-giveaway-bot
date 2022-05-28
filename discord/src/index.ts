import app from "./api/app";
import "reflect-metadata";
import Bot from "./client/client";
import { database } from "./db/databaseConnector";
import { DIService } from "discordx";
import { Container } from "typedi";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 7000;

DIService.container = Container;

const bot = new Bot();

database
  .initialize()
  .then(() => {
    bot.login(process.env.DISCORD_BOT_TOKEN!);

    app.listen(port, () => {
      console.log(`RUN ${port}`);
    });
  })
  .catch((error) => console.log(error));