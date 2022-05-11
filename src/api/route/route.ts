import { Router } from "express";

abstract class Route {
    private _router: Router = Router();

    private _prefix: string = "/";

    protected abstract setRoutes(): void;

    public get router(): Router {
        return this._router;
    }

    public setPrefix(prefix: string): void {
        this._prefix = prefix;
    }

    public get prefix(): string {
        return this._prefix;
    }
}

export default Route;