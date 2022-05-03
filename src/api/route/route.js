import { Router } from "express";

class Route {
    router = Router();

    prefix = "/";

    setRoutes();

    getRouter() {
        return this.router;
    }

    setPrefix(prefix) {
        this.prefix = prefix;
    }

    getPrefix() {
        return this.prefix;
    }
}

export default Route;