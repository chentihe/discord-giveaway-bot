import { Nft } from "../entity/Nft";
import { Database } from "../databaseConnector";

class NftService {
  async create(nft: Nft): Promise<Nft | null> {
    await Database.manager.save(nft);
    return nft;
  }

  async retrieve(contractId: string): Promise<Nft | null> {
    return await Database.manager.findOneBy(Nft, { contractId: contractId });
  }
}

const nftService = new NftService();

export { nftService };

export default NftService;
