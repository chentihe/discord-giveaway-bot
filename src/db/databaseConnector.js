import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: process.env.DIALECT,
  dialectOptions: {
    connectTimeout: 100000,
    ssl: { require: false, rejectUnauthorized: false },
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

try {
  await this.sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;
