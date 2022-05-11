import { Request, Response } from "express";
import BonusService from "../../db/service/bonus";

class BonusController {
  private _bonusService : BonusService;

  constructor(bonusService: BonusService) {
    this._bonusService = bonusService;
  }


  public create() {
    async (req: Request, res: Response) => {
      const data = await this.bonusService.create(req.body);
      return res.status(201).send(JSON.stringify(data));
    };
  }

  public retrieve() {
    async (req: Request, res: Response) => {
      const data = await this.bonusService.retrieve(
        req.params.contractId,
        req.params.userId
      );
      return res.status(200).send(JSON.stringify(data));
    };
  }

  protected get bonusService(): BonusService {
    return this._bonusService;
  }
}

export default BonusController;
