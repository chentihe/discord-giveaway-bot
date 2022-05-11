import NftController from "../controller/NftController";
import { nftService } from "../../db/service/nft";
import Route from "./route";

class NftRoute extends Route {
  private _nftController: NftController = new NftController(nftService);

  constructor() {
    super();
    this.setPrefix("/nfts");
    this.setRoutes();
  }

  protected setRoutes(): void {
    this.router.get("/:nftId", this.nftController.retrieve);
    this.router.post("/", this.nftController.create);
  }

  protected get nftController(): NftController {
      return this._nftController;
  }
}

export default NftRoute;
