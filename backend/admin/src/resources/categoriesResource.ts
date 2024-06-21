import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";

var models = initModels(sequelize);

export const categoriesResource = {
    resource: models.categories,
    options: {
        properties: {
            titre: {
                isTitle: true,
            }
        },
        actions: {
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL])
            },
            show: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL])
            },
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL])
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL])
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL])
            },
        }
    }

};