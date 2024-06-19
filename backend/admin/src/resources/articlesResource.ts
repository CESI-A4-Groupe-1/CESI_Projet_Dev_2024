import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const articlesResource = {
    resource: models.articles,
    options: {
        properties: {
            nom: {
                isTitle: true,
            }
        }
    }

};