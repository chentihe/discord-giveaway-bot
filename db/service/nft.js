import { DataTypes } from "sequelize";

class NftService {
  constructor(sequelize) {
    this.Nft = sequelize.define("Nft", {
      contractId: DataTypes.TEXT,
      name: DataTypes.TEXT,
      abi: DataTypes.TEXT,
    });
  }

  async createNft(nft) {
    return await this.Nft.create({
      contractId: nft.contractId,
      name: nft.name,
      abi: nft.abi,
    });
  }

  async retrieveNft(contractId) {
    return await this.Nft.findOne({ where: { contractId: contractId } });
  }
}

export default NftService;
