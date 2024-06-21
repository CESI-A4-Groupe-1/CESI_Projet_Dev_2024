import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {Model} from "sequelize";

const dashboardHandler = async () => {
    const V_GraphPrix = initModels(sequelize).V_GraphPrix;

    const res = (await V_GraphPrix.findAll());
    // console.log(res);

    return res;
}

export default dashboardHandler