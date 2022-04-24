import { Sequelize, Model } from "sequelize";
import dotenv from "dotenv";
import NftService from "./service/nft.js";
import NftAmountService from "./service/nftAmount.js";

dotenv.config();

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.POSTGRES_DATABASE,
      process.env.POSTGRES_USER,
      process.env.POSTGRES_PASSWORD,
      {
        host: process.env.POSTGRES_HOST,
        dialect: process.env.DIALECT,
        port: process.env.POSTGRES_PORT,
      }
    );
    this.nft = new NftService(this.sequelize);
    this.nftAmount = new NftAmountService(this.sequelize);
    this.init(this);
    this.connect();
  }

  async connect() {
    try {
      console.log(this.sequelize);
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  init(database) {
    Object.values(database)
      .filter((value) => value instanceof Model)
      .forEach((model) => model.sync());
  }
}

export default Database;
