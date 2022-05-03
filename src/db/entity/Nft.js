import { DataTypes } from "sequelize";
import sequelize from "../databaseConnector.js";

export const Nft = sequelize.define("Nft", {
  contractId: DataTypes.TEXT,
  name: DataTypes.TEXT,
  abi: DataTypes.TEXT,
});
