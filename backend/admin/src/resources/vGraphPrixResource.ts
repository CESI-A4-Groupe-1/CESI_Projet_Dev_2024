import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const vGraphPrixResource = {
    resource: models.V_GraphPrix,
    options: {
        navigation: false
    }

};