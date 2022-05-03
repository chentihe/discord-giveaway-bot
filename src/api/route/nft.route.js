import NftController from "../controller/NftController";
import Route from "./route.js";

class NftRoute extends Route {
  nftController = new NftController();

  constructor() {
    super();
    this.setPrefix("/nfts");
    this.setRoutes();
  }

  setRoutes() {
    this.getRouter().get("/:nftId", this.getNftController().retrieve);
    this.getRouter().post("/", this.getNftController().create);
  }

  getNftController() {
    return this.nftController;
  }
}

export default NftRoute;
