import { Request, Response } from "express";
import NftService from "../../db/service/nft";

class NftController {
  private _nftService: NftService;

  constructor(nftService: NftService) {
    this._nftService = nftService;
  }

  public async create(req: Request, res: Response) {
      const data = await this.nftService.create(req.body);
      return res.status(201).send(JSON.stringify(data));
  }

  public retrieve() {
    async (req: Request, res: Response) => {
      const data = await this.nftService.retrieve(req.params.nftId);
      return res.status(200).send(JSON.stringify(data));
    };
  }

  protected get nftService(): NftService {
    return this._nftService;
  }
}

export default NftController;
