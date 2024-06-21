import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";
import AdminJS, {ValidationError} from "adminjs";

var models = initModels(sequelize);

export default function throwRestaurantValidationError() {
    throw new ValidationError({}, {
        type: 'not-allowed',
        message: 'Vous n\'êtes pas le propriétaire du restaurant',
    });
}

export const restaurantsResource = {
    resource: models.restaurants,
    options: {
        properties: {
            nom: {
                isTitle: true,
            }
        },
        actions: {
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL, ROLES.RESTAURATEUR]),
                before: async (req, context) => {
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        req.query = {
                            ...req.query,
                            'filters.id_restaurateur': context.currentAdmin.id
                        };
                    }
                    return req;
                }
            },
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL]),
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR]),
                before: async (request, context) => {
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const restaurant = await models.restaurants.findByPk(request.params.recordId);
                        if (restaurant.getDataValue("id_restaurateur") !== context.currentAdmin.id) {
                            throwRestaurantValidationError();
                        }
                    }
                    return request;
                },
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL])
            },
        }
    }

};