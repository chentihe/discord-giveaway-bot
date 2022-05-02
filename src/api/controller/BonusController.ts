import { Request, Response } from "express";

class BonusController {
  public create() {
    async (req: Request, res: Response) => {
      const data = await req.client.database.bonus.create(req.body);
      return res.status(201).send(JSON.stringify(data));
    };
  }

  public retrieve() {
    async (req: Request, res: Response) => {
      const data = await req.client.database.bonus.retrieve(
        req.params.contractId,
        req.params.userId
      );
      return res.status(200).send(JSON.stringify(data));
    };
  }
}

export default BonusController;
