import { Request, Response } from "express";
import { database } from "../../db/databaseConnector";
import { Bonus } from "../../db/entity/bonus.entity";
import { Repository } from "typeorm";

class BonusController {
  private _bonusRepository: Repository<Bonus> = database.getRepository(Bonus);

  public async create(req: Request, res: Response): Promise<Response<Bonus>> {
    const data = await this.bonusRepository.save(req.body);
    return res.status(201).send(JSON.stringify(data));
  }

  public async retrieve(req: Request, res: Response): Promise<Response<Bonus>> {
    const data = await this.bonusRepository.findOneBy({
      contractId: req.params.contractId,
      userId: req.params.userId,
    });
    return res.status(200).send(JSON.stringify(data));
  }

  protected get bonusRepository(): Repository<Bonus> {
    return this._bonusRepository;
  }
}

export default BonusController;
