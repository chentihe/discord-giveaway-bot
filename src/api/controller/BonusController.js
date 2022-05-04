import { bonusService } from "../../db/service/bonusService.js";

class BonusController {
  async create(req, res) {
    const data = await bonusService.create(req.body);
    return res.status(201).send(JSON.stringify(data));
  }

  async retrieve(req, res) {
    const data = await bonusService.retrieve(
      req.params.contractId,
      req.params.userId
    );
    return res.status(200).send(JSON.stringify(data));
  }
}

export default BonusController;
