import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const vGestionCommResource = {
    resource: models.V_GestionComm,
    options: {
        navigation: false,
    }

};