import BonusController from "../controller/BonusController";
import { bonusService } from "../../db/service/bonus";
import Route from "./route";

class BonusRoute extends Route {
  private _bonusController: BonusController = new BonusController(bonusService);

  constructor() {
    super();
    this.setPrefix("/nftamounts");
    this.setRoutes();
  }

  protected setRoutes(): void {
    this.router.get("/:contractId/:userId", this.bonusController.retrieve);
    this.router.post("/", this.bonusController.create);
  }

  public get bonusController(): BonusController {
    return this._bonusController;
  }
}

export default BonusRoute;
