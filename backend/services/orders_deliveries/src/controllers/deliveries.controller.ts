import {initModels} from "../models/init-models";
import db from "../db/db";
import hasPermission from "./hasPermission";

const {Livraisons, Roles, Compte, Commandes} = initModels(db);

export default class DeliveriesController {
    constructor() {
    }

    getDelivery(req: any, res: any) {
        const headDeliveryId = req.headers['x-user-id'];
        const { delivery_id } = req.params;
        try {
            hasPermission(req, "get_delivery")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Livraisons.findByPk(delivery_id)
                        .then((delivery) => {
                            if (!delivery) return res.status(404).json({msg: "Not Found"});
                            return res.status(200).json(delivery);
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

    createDelivery(req: any, res: any) {
        const headDeliveryId = req.headers['x-user-id'];
        const { order_id } = req.params;
        try {
            hasPermission(req, "create_delivery")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    const {adresse_depart, adresse_livraison, id_livreur, type_transport, created_at} = req.body;
                    const livraison = Livraisons.build({
                        adresse_depart: adresse_depart,
                        adresse_livraison: adresse_livraison,
                        id_livreur: id_livreur,
                        type_transport: type_transport,
                        created_at: new Date()
                    })

                    livraison.save()
                        .then((delivery) => {
                            Commandes.findByPk(order_id)
                                .then((order) => {
                                    if (!order) return res.status(404).json({msg: "Not Found"});
                                    if (order.paid_at == null) return res.status(400).json({msg: "Bad Request"});
                                    const commande = {id_livraison: delivery.id}
                                        order.update(commande)
                                        .then((updated) => {
                                            if (!updated) return res.status(404).json({msg: "Not Found"});
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                            return res.status(500).json({msg: "Internal Server Error"});
                                        })
                                    return res.status(200).json(delivery);
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

    updateDelivery(req: any, res: any) {
        const headDeliveryId = req.headers['x-user-id'];
        const { delivery_id } = req.params;
        try {
            hasPermission(req, "update_delivery")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Livraisons.update(req.body, {where: {id: delivery_id}})
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

    markDeliveryValidated(req: any, res: any) {
        const headDeliveryId = req.headers['x-user-id'];
        const { delivery_id } = req.params;
        try {
            hasPermission(req, "validate_delivery")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Livraisons.findByPk(delivery_id)
                        .then((delivery) => {
                            if (!delivery) return res.status(404).json({msg: "Not Found"});
                            if (delivery.picked_up_at == null) return res.status(400).json({msg: "Bad Request"});
                            if (delivery.delivered_at == null) return res.status(400).json({msg: "Bad Request"});
                            const livraison = {validated_at : new Date()}
                            delivery.update(livraison)
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

    markDeliveryPickedUp(req: any, res: any) {
        const headDeliveryId = req.headers['x-user-id'];
        const { delivery_id } = req.params;
        try {
            hasPermission(req, "pickup_delivery")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Livraisons.findByPk(delivery_id)
                        .then((delivery) => {
                            if (!delivery) return res.status(404).json({msg: "Not Found"});
                            const livraison = {picked_up_at : new Date()}
                            delivery.update(livraison)
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

    markDeliveryDelivered(req: any, res: any) {
        const headDeliveryId = req.headers['x-user-id'];
        const { delivery_id } = req.params;
        try {
            hasPermission(req, "deliver_delivery")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Livraisons.findByPk(delivery_id)
                        .then((delivery) => {
                            if (!delivery) return res.status(404).json({msg: "Not Found"});
                            if (delivery.picked_up_at == null) return res.status(400).json({msg: "Bad Request"});
                            const livraison = {delivered_at : new Date()}
                            delivery.update(livraison)
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
