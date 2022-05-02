import NftController from "../controller/NftController";
import Route from "./route";

class NftRoute extends Route {
  private nftController = new NftController();

  constructor() {
    super();
    this.setPrefix("/nfts");
    this.setRoutes();
  }

  protected setRoutes() {
    this.getRouter().get("/:nftId", this.getNftController().retrieve);
    this.getRouter().post("/", this.getNftController().create);
  }

  public getNftController() {
    return this.nftController;
  }
}

export default NftRoute;
