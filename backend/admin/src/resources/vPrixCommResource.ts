import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const vPrixCommResource = {
    resource: models.V_PrixComm,
    options: {
        navigation: false,
    }

};