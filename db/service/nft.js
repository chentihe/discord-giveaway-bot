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

  async create(nft) {
    const [Nft, created] = await this.Nft.findOrCreate({
      where: {
        contractId: nft.contractId,
        name: nft.name,
        abi: nft.abi,
      },
    });
    return Nft;
  }

  async retrieve(contractId) {
    return await this.Nft.findOne({ where: { contractId: contractId } });
  }
}

export default NftService;
