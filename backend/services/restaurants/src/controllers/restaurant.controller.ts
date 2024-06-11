import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Restaurants, Section, Articles} = initModels(db);

export default class RestaurantController {
    constructor() {
    }

    getRestaurants(req: any, res: any) {
        try {
            hasPermission(req, "list_restaurants")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Restaurants.findAll()
                        .then((restaurants) => {
                            return res.status(200).json(restaurants);
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

    getRestaurant(req: any, res: any) {
        const { restaurant_id } = req.params;

        function doGet() {
            Restaurants.findByPk(
                restaurant_id,
                {
                    include:
                        [
                            {
                                model: Section,
                                as: "sections",
                                include:
                                    [
                                        {
                                            model: Articles,
                                            as: "articles"
                                        }
                                    ]
                            }
                            ]
                })
                .then((restaurant) => {
                    if (!restaurant) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json(restaurant);
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                })
        }

        try {
            hasPermission(req, "list_restaurants")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    doGet();
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    createRestaurant = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];


        function applyCreate() {
            try {
                const { id_restaurateur, nom, adresse, id_tag, description } = req.body;
                if (!nom || !adresse || !id_tag || !description || !id_restaurateur) {
                    return res.status(400).json({msg: "Bad Request"});
                }
                const restaurant = Restaurants.build({
                    id_restaurateur: id_restaurateur,
                    nom: nom,
                    adresse: adresse,
                    id_tag: id_tag,
                    description: description
                })
                restaurant.save()
                    .then((restaurant) => {
                        return res.status(201).json(restaurant);
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).json({msg: "Internal Server Error"});
                    })
            } catch (err) {
                console.error(err);
                return res.status(400).json({msg: "Bad Request"});
            }
        }

        hasPermission(req, "create_restaurant")
            .then((hasPerm) => {
                if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                applyCreate();
            });
    }

    updateRestaurant = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { restaurant_id } = req.params;

        function applyUpdate() {
            Restaurants.update(req.body, {where: {id: restaurant_id}})
                .then((updated) => {
                    if (!updated) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json({msg: "User Updated"});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                })
        }

        try {
            const restaurant = await Restaurants.findByPk(restaurant_id)
            if (headUserId === restaurant?.id_restaurateur) {
                applyUpdate();
            }

            hasPermission(req, "update_restaurant")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    applyUpdate();
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }
    deleteRestaurant = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { restaurant_id } = req.params;

        function applyDelete() {
            Restaurants.destroy({where: {id: restaurant_id}})
                .then((deleted) => {
                    if (!deleted) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json({msg: "User Deleted"});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                });
        }

        try {
            const restaurant = await Restaurants.findByPk(restaurant_id)
            if (headUserId === restaurant?.id_restaurateur) {
                applyDelete();
            }

            hasPermission(req, "delete_restaurant")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    applyDelete();
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }


}