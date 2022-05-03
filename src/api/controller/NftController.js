import { nftService } from "../../db/service.js";

class NftController {
  create() {
    async (req, res) => {
      const data = await nftService.create(req.body);
      return res.status(201).send(JSON.stringify(data));
    };
  }

  retrieve() {
    async (req, res) => {
      const data = await nftService.retrieve(req.params.nftId);
      return res.status(200).send(JSON.stringify(data));
    };
  }
}

export default NftController;
