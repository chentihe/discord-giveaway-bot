import { Request, Response } from "express";
import { Service } from "typedi";
import { database } from "../../db/databaseConnector";
import { Nft } from "../../db/entity/nft.entity";
import { Repository } from "typeorm";

@Service()
class NftController {
  private _nftRepository: Repository<Nft> = database.getRepository(Nft);

  public async create(req: Request, res: Response): Promise<Response<Nft>> {
    const data = await this.nftRepository.save(req.body);
    return res.status(201).send(JSON.stringify(data));
  }

  public async retrieve(req: Request, res: Response): Promise<Response<Nft>> {
    const data = await this.nftRepository.findOneBy({
      contractId: req.params.nftId,
    });
    return res.status(200).send(JSON.stringify(data));
  }

  protected get nftRepository(): Repository<Nft> {
    return this._nftRepository;
  }
}

export default NftController;
