import {logging} from "./logging";

export function middlewares(app: any) {
    logging(app);
}