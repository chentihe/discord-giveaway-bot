import { DataTypes } from "sequelize";

class NftAmountService {
  constructor(sequelize) {
    this.NftAmount = sequelize.define("Nft", {
      contractId: DataTypes.TEXT,
      userId: DataTypes.BIGINT,
      userAccountAddress: DataTypes.TEXT,
      nftAmount: DataTypes.INTEGER,
    });
  }

  async createNftAmount(nftAmount) {
    return await this.NftAmount.create({
      contractId: nftAmount.contractId,
      userId: nftAmount.userId,
      userAccountAddres: nftAmount.userAccountAddres,
      nftAmount: nftAmount.nftAmount,
    });
  }

  async retrieveNftAmount(contractId, userId) {
    return await this.NftAmount.findOne({
      where: { contractId: contractId, userId: userId },
    });
  }
}

export default NftAmountService;
