import { DataTypes } from "sequelize";
import sequelize from "../databaseConnector.js";

export const Bonus = sequelize.define("Bonus", {
  contractId: DataTypes.TEXT,
  userId: DataTypes.BIGINT,
  userAccountAddress: DataTypes.TEXT,
  nftAmount: DataTypes.INTEGER,
});
