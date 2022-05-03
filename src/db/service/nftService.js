import { Nft } from "../entity/Nft.js";

class NftService {
  constructor() {
    Nft.sync();
  }

  async create(nft) {
    const [newNft, create] = await Nft.findOrCreate({
      where: {
        contractId: nft.contractId,
        name: nft.name,
        abi: nft.abi,
      },
    });

    return newNft;
  }

  async retrieve(contractId) {
    return await Nft.findOne({ where: { contractId: contractId } });
  }
}

export const nftService = new NftService();
