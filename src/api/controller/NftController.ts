import { Request, Response } from "express";

class NftController {
  public create() {
    async (req: Request, res: Response) => {
      const data = await req.client.database.nft.create(req.body);
      return res.status(201).send(JSON.stringify(data));
    };
  }

  public retrieve() {
    async (req: Request, res: Response) => {
      const data = await req.client.database.nft.retrieve(req.params.nftId);
      return res.status(200).send(JSON.stringify(data));
    };
  }
}

export default NftController;
