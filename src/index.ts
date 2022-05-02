import app from "./api/app";
import "reflect-metadata";
import Bot from "./client/client";

const port = process.env.PORT || 7000;

const bot = new Bot();

app.listen(port, () => {
  console.log(`RUN ${port}`);
});