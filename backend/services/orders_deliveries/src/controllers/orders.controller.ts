import {Articles, initModels} from "../models/init-models";
import db from "../db/db";
import hasPermission from "./hasPermission";
import {CreatedAt} from "sequelize-typescript";
import * as constants from "node:constants";

const {Compte, Roles, Commandes, Restaurants, CommandeList} = initModels(db);

export default class OrdersController {
    constructor() {
    }

    userOrders(req: any, res: any) {
        const headUserId = req.headers['x-user-id'];
        const { user_id } = req.params;
        try {
            hasPermission(req, "list_user_orders")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Compte.findByPk(user_id)
                        .then((user) => {
                            if (!user) return res.status(404).json({msg: "Not Found"});
                            Commandes.findAll(
                                {
                                    where: {
                                        id_client: user_id
                                    },
                                    include:
                                        [
                                            {
                                                model: CommandeList,
                                                as: "commande_lists",
                                            }
                                        ]
                                })
                                .then((orders) => {
                                    return res.status(200).json(orders);
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                });
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        });
                });
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    restOrders(req: any, res: any) {
        const headRestId = req.headers['x-user-id'];
        const { resto_id } = req.params;
        try {
            hasPermission(req, "list_rest_orders")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Restaurants.findByPk(resto_id)
                        .then((resto) => {
                            if (!resto) return res.status(404).json({msg: "Not Found"});
                            Commandes.findAll({where: {id_restaurant: resto_id}})
                                .then((orders) => {
                                    return res.status(200).json(orders);
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                });
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        });
                });
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    createOrder(req: any, res: any) {
        const headOrderId = req.headers['x-user-id'];
        const { order_id } = req.params;
        try {
            hasPermission(req, "create_order")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    const {id_client, id_restaurant, created_at} = req.body;
                    if(!id_client || !id_restaurant) return res.status(400).json({msg: "Bad Request"});
                    const commande = Commandes.build({
                        id_client : id_client,
                        id_restaurant : id_restaurant,
                        created_at : new Date()
                    })

                    commande.save()
                        .then((order) => {
                            return res.status(201).json(order);
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        })
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    getOrder(req: any, res: any) {
        const headOrderId = req.headers['x-user-id'];
        const { order_id } = req.params;
        try {
            hasPermission(req, "get_order")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Commandes.findByPk(order_id)
                        .then((order) => {
                            if (!order) return res.status(404).json({msg: "Not Found"});
                            return res.status(200).json(order);
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        })
                })

        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    updateAdd(req: any, res: any) {
        const headOrderId = req.headers['x-user-id'];
        const { order_id } = req.params;
        const { article_id } = req.params;

        try {
            hasPermission(req, "update_order").then((hasPerm) => {
                if (!hasPerm) {
                    return res.status(403).json({msg: "Forbidden"});
                }

                CommandeList.findOne({ where: { id_commande: order_id, id_article: article_id } }).then((commlist) => {
                    if (!commlist) {
                        // Si aucune commande n'existe pour cet article, créez-en une nouvelle
                        const article = CommandeList.build({
                            id_article: req.body.id_article,
                            id_commande: order_id,
                            quantite: req.body.quantite
                        });

                        article.save().then((article) => {
                            CommandeList.findByPk(article.id).then((commlist) => {
                                if (!commlist) {
                                    return res.status(404).json({ msg: "Not Found" });
                                }

                                const logdate = { updated_at: new Date() };
                                Commandes.update(logdate, { where: { id: order_id } }).then((updated) => {
                                    if (!updated) {
                                        return res.status(404).json({ msg: "Not Found" });
                                    }

                                    return res.status(200).json({ msg: "Order Updated" });
                                }).catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({ msg: "Internal Server Error" });
                                });
                            }).catch((err) => {
                                console.error(err);
                                return res.status(500).json({ msg: "Internal Server Error" });
                            });
                        }).catch((err) => {
                            console.error(err);
                            return res.status(500).json({ msg: "Internal Server Error" });
                        });
                    } else {
                        // Si la commande existe déjà pour cet article, mettez à jour la quantité
                        CommandeList.update(req.body, { where: { id: commlist.id } }).then((updated) => {
                            if (!updated) {
                                return res.status(404).json({ msg: "Not Found" });
                            }

                            return res.status(200).json({ msg: "Order Updated" });
                        }).catch((err) => {
                            console.error(err);
                            return res.status(500).json({ msg: "Internal Server Error" });
                        });
                    }
                }).catch((err) => {
                    console.error(err);
                    return res.status(500).json({ msg: "Internal Server Error" });
                });
            }).catch((err) => {
                console.error(err);
                return res.status(500).json({ msg: "Internal Server Error" });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }


    updateRemove(req: any, res: any) {
        const headOrderId = req.headers['x-user-id'];
        const { order_id } = req.params;
        const { article_id } = req.params;
        try {
            hasPermission(req, "update_order")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    CommandeList.destroy({where: {id_article: article_id, id_commande: order_id}})
                        .then((deleted) => {
                            if (!deleted) return res.status(404).json({msg: "Not Found"});
                            return res.status(200).json({msg: "Order Deleted"});
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        })
                    const logdate = {updated_at : new Date()}
                    Commandes.update(logdate, {where: {id: order_id}})
                        .then((updated) => {
                            if (!updated) return res.status(404).json({msg: "Not Found"});
                            return res.status(200).json({msg: "Order Updated"});
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        })
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    markOrderPaid(req: any, res: any) {
        const headOrderId = req.headers['x-user-id'];
        const { order_id } = req.params;
        try {
            hasPermission(req, "pay_order")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Commandes.findByPk(order_id)
                        .then((order) => {
                            if (!order) return res.status(404).json({msg: "Not Found"});
                            const commande = {paid_at : new Date()}
                            order.update(commande)
                                .then((updated) => {
                                    if (!updated) return res.status(404).json({msg: "Not Found"});
                                    return res.status(200).json({msg: "Order Updated"});
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                })
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        })

                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    markOrderDenied(req: any, res: any) {
        const headOrderId = req.headers['x-user-id'];
        const { order_id } = req.params;
        try {
            hasPermission(req, "deny_order")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Commandes.findByPk(order_id)
                        .then((order) => {
                            if (!order) return res.status(404).json({msg: "Not Found"});
                            const commande = {denied_at : new Date()}
                            order.update(commande)
                                .then((updated) => {
                                    if (!updated) return res.status(404).json({msg: "Not Found"});
                                    return res.status(200).json({msg: "Order Updated"});
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                })
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        })

                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    markOrderValidated(req: any, res: any) {
        const headOrderId = req.headers['x-user-id'];
        const { order_id } = req.params;
        try {
            hasPermission(req, "accept_order")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Commandes.findByPk(order_id)
                        .then((order) => {
                            if (!order) return res.status(404).json({msg: "Not Found"});
                            if (order.paid_at == null) return res.status(400).json({msg: "Bad Request"});
                            const commande = {validated_at : new Date()}
                            order.update(commande)
                                .then((updated) => {
                                    if (!updated) return res.status(404).json({msg: "Not Found"});
                                    return res.status(200).json({msg: "Order Updated"});
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                })
                        })
                        .catch((err) => {
                            console.error(err);
                            return res.status(500).json({msg: "Internal Server Error"});
                        })

                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }
}
