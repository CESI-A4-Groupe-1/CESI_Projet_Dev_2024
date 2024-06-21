import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";
import throwRestaurantValidationError from "./restaurantResource.js";
import {ActionRequest, ActionResponse, Filter} from "adminjs";

var models = initModels(sequelize);

export const ordersResource = {
    resource: models.commandes,
    options: {
        properties: {

        },
        actions: {
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            show: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL, ROLES.RESTAURATEUR]),
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            bulkDelete: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL, ROLES.RESTAURATEUR]),
                before: async (req, context) => {
                    if (context.currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const restaurant = await models.restaurants.findOne({
                            where: {
                                id_restaurateur: context.currentAdmin.id
                            }
                        })
                        req.query = {
                            ...req.query,
                            filters: {
                                'id_restaurant': restaurant.getDataValue("id"),
                                // 'paid_at.$gt': new Date("01-01-1970")
                            },
                            'sortBy': 'paid_at',
                            'direction': 'desc'
                        };
                        console.log(req)
                    }
                    return req;
                }
            },
            // validate, set validated_at date to now
            validate: {
                actionType: 'record',
                guard: 'Valider la commande et envoie en livraison ?',
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR]),
                component: false,
                handler: async (req: ActionRequest, res: ActionResponse, context) => {
                    const { record, currentAdmin } = context;
                    const restaurant = await models.restaurants.findOne({
                        where: {
                            id_restaurateur: currentAdmin.id
                        }
                    })
                    if (currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        console.log(record)
                        console.log(restaurant.getDataValue("id"))
                        if (restaurant.getDataValue("id") !== record.params.id_restaurant) {
                            throwRestaurantValidationError();
                        }
                    }
                    if (record.params.denied_at) {
                        return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                                message: "Commande deja refusée",
                                type: "error",
                            }
                        }
                    }

                    const delivery = await models.livraisons.create({
                        type_transport: "Velo",
                        adresse_depart: restaurant.getDataValue("adresse"),
                        adresse_livraison: (await models.compte.findByPk(record.params.id_client)).getDataValue("adresse")
                    })
                    await record.update({
                        ["validated_at"]: new Date(),
                        ["denied_at"]: null,
                        ["id_livraison"]: delivery.getDataValue("id"),
                    });
                    return {
                        record: record.toJSON(currentAdmin),
                        notice: {
                            message: "Commande validée",
                            type: "success",
                        }
                    };
                }
            },

            deny: {
                actionType: 'record',
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.RESTAURATEUR]),
                component: false,
                guard: 'Voulez-vous vraiment refuser la commande ?',
                handler: async (req: ActionRequest, res: ActionResponse, context) => {
                    const {record, currentAdmin} = context;
                    if (currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const restaurant = await models.restaurants.findOne({
                            where: {
                                id_restaurateur: currentAdmin.id
                            }
                        })
                        console.log(record)
                        console.log(restaurant.getDataValue("id"))
                        if (restaurant.getDataValue("id") !== record.params.id_restaurant) {
                            throwRestaurantValidationError();
                        }
                    }
                    if (record.params.validated_at) {
                        return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                                message: "Commande deja validée",
                                type: "error",
                            }
                        }
                    }
                    record.update({
                        ["validated_at"]: null,
                        ["denied_at"]: new Date()
                    });
                    return {
                        record: record.toJSON(currentAdmin),
                        notice: {
                            message: "Commande validée",
                            type: "success",
                        }
                    };
                }
            }

        }
    }

};