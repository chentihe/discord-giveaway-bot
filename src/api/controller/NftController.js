import { nftService } from "../../db/service/nftService.js";

class NftController {
  async create(req, res) {
    const data = await nftService.create(req.body);
    return res.status(201).send(JSON.stringify(data));
  }

  async retrieve(req, res) {
    const data = await nftService.retrieve(req.params.nftId);
    return res.status(200).send(JSON.stringify(data));
  }
}

export default NftController;
