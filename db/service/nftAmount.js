import { DataTypes } from "sequelize";

class NftAmountService {
  constructor(sequelize) {
    this.NftAmount = sequelize.define("NftAmount", {
      contractId: DataTypes.TEXT,
      userId: DataTypes.TEXT,
      userAccountAddress: DataTypes.TEXT,
      nftAmount: DataTypes.INTEGER,
    });
  }

  init() {
    this.NftAmount.sync();
  }

  async create(nftAmount) {
    return await this.NftAmount.findOrCreate({
      where: {
        contractId: nftAmount.contractId,
        userId: nftAmount.userId,
        userAccountAddress: nftAmount.userAccountAddress,
        nftAmount: nftAmount.nftAmount,
      },
    });
  }

  async retrieve(contractId, userId) {
    return await this.NftAmount.findOne({
      where: { contractId: contractId, userId: userId },
    });
  }
}

export default NftAmountService;
