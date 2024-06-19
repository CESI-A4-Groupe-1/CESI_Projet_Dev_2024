import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const categoriesResource = {
    resource: models.categories,
    options: {
        properties: {
            titre: {
                isTitle: true,
            }
        }
    }

};