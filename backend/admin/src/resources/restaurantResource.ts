import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const restaurantsResource = {
    resource: models.restaurants,
    options: {
        properties: {
            nom: {
                isTitle: true,
            }
        }
    }

};