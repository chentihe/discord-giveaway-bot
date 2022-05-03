import { Bonus } from "../entity/Bonus.js";

class BonusService {
  constructor() {
    Bonus.sync();
  }

  async create(bonus) {
    return await Bonus.findOrCreate({
      where: {
        contractId: bonus.contractId,
        userId: bonus.userId,
        userAccountAddress: bonus.userAccountAddress,
        nftAmount: bonus.nftAmount,
      },
    });
  }

  async retrieve(contractId, userId) {
    return await Bonus.findOne({
      where: { contractId: contractId, userId: userId },
    });
  }
}

export const bonusService = new BonusService();
