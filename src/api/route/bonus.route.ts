import BonusController from "../controller/BonusController";
import Route from "./route";

class BonusRoute extends Route {
  private bonusController = new BonusController();

  constructor() {
    super();
    this.setPrefix("/nftamounts");
    this.setRoutes();
  }

  protected setRoutes() {
    this.getRouter().get("/:contractId/:userId", this.getBonusController().retrieve);
    this.getRouter().post("/", this.getBonusController().create);
  }

  public getBonusController() {
    return this.bonusController;
  }
}

export default BonusRoute;
