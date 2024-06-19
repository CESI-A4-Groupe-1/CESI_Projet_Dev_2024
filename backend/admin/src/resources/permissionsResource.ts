import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const permissionsResource = {
    resource: models.permissions,
    options: {
        properties: {
            code: {
                isTitle: true,
            }
        }
    }

};