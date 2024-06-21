import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const vTotalCommandesResource = {
    resource: models.V_TotalCommande,
    options: {
        navigation: false,
    }

};