import Bot from "../../src/client/client";

declare global {
    namespace Express {
        export interface Request {
            client: Bot;
        }
    }
}

// uncommont once above config dosen't work
// declare module "express-serve-static-core" {
//     interface Request {
//         client?: Bot;
//     }
// }