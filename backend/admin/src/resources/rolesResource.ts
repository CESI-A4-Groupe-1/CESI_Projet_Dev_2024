import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";

var models = initModels(sequelize);

export const rolesResource = {
    resource: models.roles,
    options: {
        properties: {
            role_title: {
                isTitle: true,
            },
            description: {
                type: 'richtext'
            }
        },
        actions: {
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN])
            },
            show: {
                isAccessible: roleMiddleware([ROLES.ADMIN])
            },
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN])
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN])
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN])
            },
        }
    }

};