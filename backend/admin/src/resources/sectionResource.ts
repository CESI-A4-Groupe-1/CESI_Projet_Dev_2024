import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";
import throwRestaurantValidationError from "./restaurantResource.js";

var models = initModels(sequelize);

export const sectionResource = {
    resource: models.section,
    options: {
        properties: {
            titre_section: {
                isTitle: true,
            }
            },
        actions: {
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL, ROLES.RESTAURATEUR]),
                before: async (request, context) => {
                    // make sure that the current admin is the owner of the restaurant
                    // when creating a new section, check that the selected restaurant is owned by the current admin
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const restaurant = await models.restaurants.findByPk(request.payload.id_restaurant);
                        if (restaurant.getDataValue("id_restaurateur") !== context.currentAdmin.id) {
                            throwRestaurantValidationError();
                        }
                    }
                    return request;
                }
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR, ROLES.COMMERCIAL]),
                before: async (request, context) => {
                    // make sure that the current admin is the owner of the restaurant
                    // when deleting a section, check that the selected restaurant is owned by the current admin
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const section = await models.section.findByPk(request.params.recordId);
                        const restaurant = await models.restaurants.findByPk(section.getDataValue("id_restaurant"));
                        if (restaurant.getDataValue("id_restaurateur") !== context.currentAdmin.id) {
                            throwRestaurantValidationError()
                        }
                    }
                    return request;
                }
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR, ROLES.COMMERCIAL]),
                before: async (request, context) => {
                    // make sure that the current admin is the owner of the restaurant
                    // when editing a section,
                    // check that the selected restaurant is owned by the current admin
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const restaurantReq = await models.restaurants.findByPk(request.payload.id_restaurant);
                        const section = await models.section.findByPk(request.params.recordId);
                        const restaurant = await models.restaurants.findByPk(section.getDataValue("id_restaurant"));
                        if (restaurantReq.getDataValue("id_restaurateur") !== context.currentAdmin.id || restaurant.getDataValue("id_restaurateur") !== context.currentAdmin.id) {
                            throwRestaurantValidationError()
                        }
                    }
                    return request;
                },
            },
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR, ROLES.COMMERCIAL]),
                before: async (request, context) => {
                    // filter the sections by the current restaurant
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const restaurant = await models.restaurants.findOne({ where: {id_restaurateur: context.currentAdmin.id}});
                        request.query = {
                            ...request.query,
                            'filters.id_restaurant': restaurant.getDataValue("id")
                        };
                    }
                    return request;
                }
            }
        }
    }

};