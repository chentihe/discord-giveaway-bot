import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Nft } from "./entity/Nft";
import { Bonus } from "./entity/Bonus";

dotenv.config();

export const Database = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Nft, Bonus],
  synchronize: true,
  logging: true,
});
