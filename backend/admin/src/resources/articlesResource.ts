import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";
import throwRestaurantValidationError from "./restaurantResource.js";

var models = initModels(sequelize);

export const articlesResource = {
    resource: models.articles,
    options: {
        properties: {
            nom: {
                isTitle: true,
            }
        },
        actions: {
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR])
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR]),
                before: async (request, context) => {
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const article = await models.articles.findByPk(request.params.recordId, {include: [{model: models.section, as: "id_section_section", include: [{model: models.restaurants, as: "id_restaurant_restaurant"}]}]});

                        if (article.getDataValue("id_section_section").getDataValue("id_restaurant_restaurant").getDataValue("id_restaurateur") !== context.currentAdmin.id) {
                            throwRestaurantValidationError();
                        }

                    }
                    return request;
                }
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR]),
                before: async (request, context) => {
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const article = await models.articles.findByPk(request.params.recordId, {include: [{model: models.section, as: "id_section_section", include: [{model: models.restaurants, as: "id_restaurant_restaurant"}]}]});

                        if (article.getDataValue("id_section_section").getDataValue("id_restaurant_restaurant").getDataValue("id_restaurateur") !== context.currentAdmin.id) {
                            throwRestaurantValidationError();
                        }

                    }
                    return request;
                }
            },
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR]),
                before: async (req, context) => {
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        // filter articles by section, and each section by restaurant
                        // get restaurant of the current admin
                        const restaurant = await models.restaurants.findOne({where: {
                                id_restaurateur: context.currentAdmin.id
                            }});
                        // get all sections of the restaurant
                        const sections = await models.section.findAll({
                            where: {
                                id_restaurant: restaurant.getDataValue("id")
                            }
                        });
                        req.query = {
                            ...req.query,
                            'filters.id_section': sections.map(s => s.getDataValue("id")).join(",")
                        };
                    }
                    return req;
                }
            }
        }
    }

};