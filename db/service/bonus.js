import { DataTypes } from "sequelize";

class BonusService {
  constructor(sequelize) {
    this.Bonus = sequelize.define("Bonus", {
      contractId: DataTypes.TEXT,
      userId: DataTypes.BIGINT,
      userAccountAddress: DataTypes.TEXT,
      nftAmount: DataTypes.INTEGER,
    });
  }

  init() {
    this.Bonus.sync();
  }

  async create(bonus) {
    return await this.Bonus.findOrCreate({
      where: {
        contractId: bonus.contractId,
        userId: bonus.userId,
        userAccountAddress: bonus.userAccountAddress,
        nftAmount: bonus.nftAmount,
      },
    });
  }

  async retrieve(contractId, userId) {
    return await this.Bonus.findOne({
      where: { contractId: contractId, userId: userId },
    });
  }
}

export default BonusService;
