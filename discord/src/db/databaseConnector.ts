import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Nft } from "./entity/nft.entity";
import { Bonus } from "./entity/bonus.entity";

dotenv.config();

export const database: DataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [Nft, Bonus],
  synchronize: true,
  logging: true,
});