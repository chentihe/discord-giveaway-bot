import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./router";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

for (const route of router) {
  app.use(route.prefix, route.router);
}

export default app;