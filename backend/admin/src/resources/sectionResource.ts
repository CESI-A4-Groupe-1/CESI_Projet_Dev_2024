import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

var models = initModels(sequelize);

export const sectionResource = {
    resource: models.section,
    options: {
        properties: {
            titre_section: {
                isTitle: true,
            }
        }
    }

};