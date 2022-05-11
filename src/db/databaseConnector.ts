import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Nft } from "./entity/Nft";
import { Bonus } from "./entity/Bonus";

dotenv.config();

export const Database: DataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [Nft, Bonus],
  synchronize: true,
  logging: true,
});
