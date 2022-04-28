import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import NftService from "./service/nft.js";
import BonusService from "./service/bonus.js";

dotenv.config();

class Database {
  constructor() {
    this.sequelize = new Sequelize({
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      dialect: process.env.DIALECT,
      dialectOptions: {
        connectTimeout: 100000,
        ssl: { require: false, rejectUnauthorized: false }
      },
      define: {
        timestamps: false,
      },
      pool: {
        max: 25,
        min: 0,
        idle: 10000,
      },
    });
    this.nft = new NftService(this.sequelize);
    this.bonus = new BonusService(this.sequelize);
    this.init(this);
    this.connect();
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  init(database) {
    Object.values(database)
      .filter((value) => !(value instanceof Sequelize))
      .forEach((model) => model.init());
  }
}

export default Database;
