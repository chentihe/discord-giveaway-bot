import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./router.js";
import ClientMiddleware from "./middleware/ClientMiddleware";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ClientMiddleware);

for (const route of router) {
  app.use(route.getPrefix(), route.getRouter());
}

export default app;