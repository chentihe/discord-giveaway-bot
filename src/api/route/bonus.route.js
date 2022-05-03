import BonusController from "../controller/BonusController.js";
import Route from "./route.js";

class BonusRoute extends Route {
  bonusController = new BonusController();

  constructor() {
    super();
    this.setPrefix("/nftamounts");
    this.setRoutes();
  }

  setRoutes() {
    this.getRouter().get("/:contractId/:userId", this.getBonusController().retrieve);
    this.getRouter().post("/", this.getBonusController().create);
  }

  getBonusController() {
    return this.bonusController;
  }
}

export default BonusRoute;
