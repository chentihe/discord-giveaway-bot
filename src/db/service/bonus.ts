import { Bonus } from "../entity/Bonus";
import { Database } from "../databaseConnector";

class BonusService {
  async create(bonus: Bonus): Promise<Bonus | null> {
    return await Database.manager.save(bonus);
  }

  async retrieve(contractId: string, userId: string) {
    return await Database.manager.findOneBy(Bonus, {
      contractId: contractId,
      userId: userId,
    });
  }
}

const bonusService = new BonusService();

export { bonusService };

export default BonusService;
