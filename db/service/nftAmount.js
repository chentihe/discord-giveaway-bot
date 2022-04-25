import { DataTypes } from "sequelize";

class NftAmountService {
  constructor(sequelize) {
    this.NftAmount = sequelize.define("NftAmount", {
      contractId: DataTypes.TEXT,
      userId: DataTypes.BIGINT,
      userAccountAddress: DataTypes.TEXT,
      nftAmount: DataTypes.INTEGER,
    });
  }

  init() {
    this.NftAmount.sync();
  }

  async createNftAmount(nftAmount) {
    return await this.NftAmount.findOrCreate({
      where: {
        contractId: nftAmount.contractId,
        userId: nftAmount.userId,
        userAccountAddres: nftAmount.userAccountAddres,
        nftAmount: nftAmount.nftAmount,
      },
    });
  }

  async retrieveNftAmount(contractId, userId) {
    return await this.NftAmount.findOne({
      where: { contractId: contractId, userId: userId },
    });
  }
}

export default NftAmountService;
