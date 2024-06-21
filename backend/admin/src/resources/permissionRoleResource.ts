import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";

var models = initModels(sequelize);

export const permissionRoleResource = {
    resource: models.permission_roles,
    options: {
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