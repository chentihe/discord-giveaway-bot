import { Router } from "express";

abstract class Route {
    private router = Router();

    private prefix: string = "/";

    protected abstract setRoutes(): void;

    public getRouter() {
        return this.router;
    }

    protected setPrefix(prefix: string) {
        this.prefix = prefix;
    }

    public getPrefix() {
        return this.prefix;
    }
}

export default Route;