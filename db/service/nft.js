import { DataTypes } from "sequelize";

class NftService {
  constructor(sequelize) {
    this.Nft = sequelize.define("Nft", {
      contractId: DataTypes.TEXT,
      name: DataTypes.TEXT,
      abi: DataTypes.TEXT,
    });
  }

  init() {
    this.Nft.sync();
  }

  async createNft(nft) {
    const [Nft, created] = await this.Nft.findOrCreate({
      where: {
        contractId: nft.contractId,
        name: nft.name,
        abi: nft.abi,
      },
    });
    return Nft;
  }

  async retrieveNft(contractId) {
    return await this.Nft.findOne({ where: { contractId: contractId } });
  }
}

export default NftService;
