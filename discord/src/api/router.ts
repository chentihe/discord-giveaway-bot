import Route from "./route/route";
import NftRoute from "./route/nft.route";
import BonusRoute from "./route/bonus.route";

export const router: Array<Route> = [
    new NftRoute(), new BonusRoute()
]