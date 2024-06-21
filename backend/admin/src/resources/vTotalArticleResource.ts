import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const vTotalArticlesResource = {
    resource: models.V_TotalArticles,
    options: {
        navigation: false,
    }

};