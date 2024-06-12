import {middlewares} from "../middlewares/middlewares";
import StatisticsController from "../controllers/statistics.controller";

export default function (app: any) {
    // logging middleware
    middlewares(app);
    app.get("/statistics", (new StatisticsController()).getPerf);
}