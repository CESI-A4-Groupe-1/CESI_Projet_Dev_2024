import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const rolesResource = {
    resource: models.roles,
    options: {
        properties: {
            role_title: {
                isTitle: true,
            }
        }
    }

};