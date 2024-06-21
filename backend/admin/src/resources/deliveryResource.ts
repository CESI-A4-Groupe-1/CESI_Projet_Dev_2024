import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import {roleMiddleware, ROLES} from "./roles.js";
import AdminJS, {ActionContext, ActionRequest, ActionResponse, ResourceWithOptions} from "adminjs";

var models = initModels(sequelize);

export const deliveryResource = {
    resource: models.livraisons,
    options: {
        properties: {
            titre: {
                isTitle: true,
            }
        },
        actions: {
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL, ROLES.RESTAURATEUR, ROLES.DELIVERY]),
                before: async (req, context) => {
                    const { currentAdmin } = context;
                    if (currentAdmin?.role.role_title === ROLES.DELIVERY) {
                        req.query = {
                            ...req.query,
                            filters: {
                            },
                            sortBy: 'created_at',
                            direction: 'desc'
                        }
                    }

                    else if (currentAdmin?.role.role_title === ROLES.RESTAURATEUR) {
                        const restaurant = await models.restaurants.findOne({
                            where: {
                                id_restaurateur: context.currentAdmin.id
                            }
                        });

                        const orders = await models.commandes.findAll({
                            where: {
                                id_restaurant: restaurant.getDataValue("id")
                            }
                        });

                        const delivery_ids = orders.map(s => s.getDataValue("id_livraison"))
                        console.log("DELIVERIES:", delivery_ids)
                        req.query = {
                            ...req.query,
                            filters: {
                                'id': delivery_ids
                            },
                            sortBy: 'created_at',
                            direction: 'desc',
                        }

                    }

                    return req;
                }
            },
            show: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.DELIVERY, ROLES.RESTAURATEUR]),
            },
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            bulkDelete: {
                isAccessible: roleMiddleware([ROLES.ADMIN]),
            },
            pick_up: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.DELIVERY]),
                actionType: 'record',
                component: false,
                guard: 'Confirmez-vous avoir récupéré la livraison ?',
                icon: 'ArrowUp',
                handler: async (req: ActionRequest, res: ActionResponse, context: ActionContext)=> {
                    const {record, currentAdmin} = context;
                    if (record.params.picked_up_at) {
                        return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                                message: "Deja en livraison",
                                type: "error",
                            }
                        }
                    }

                    await record.update({
                        ["picked_up_at"]: new Date(),
                        ["id_livreur"]: currentAdmin.id,
                    });

                    return {
                        record: record.toJSON(currentAdmin),
                        notice: {
                            message: "Livraison recupérée",
                            type: "success",
                        }
                    };
                }
            },
            deliver: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.DELIVERY]),
                actionType: 'record',
                component: false,
                guard: 'Confirmez-vous la livraison ?',
                icon: 'Check',
                handler: async (req: ActionRequest, res: ActionResponse, context: ActionContext)=> {
                    const {record, currentAdmin} = context;
                    if (record.params.delivered_at) {
                        return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                                message: "Deja livrée",
                                type: "error",
                            }
                        }
                    }

                    if (!record.params.picked_up_at) {
                        return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                                message: "Pas encore en livraison",
                                type: "error",
                            }
                        }
                    }

                    await record.update({
                        ["delivered_at"]: new Date(),
                    });

                    return {
                        record: record.toJSON(currentAdmin),
                        notice: {
                            message: "Commande livrée",
                            type: "success",
                        }
                    };
                }
            },
        }
    }

};