import Bot from "../../client/client";
import { Request, Response, NextFunction } from "express";

const ClientMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.client = new Bot();
    next();
};

export default ClientMiddleware;