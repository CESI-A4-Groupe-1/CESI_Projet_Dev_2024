import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Section, Articles, Restaurants} = initModels(db);

export default class MenusController {
    constructor() {
    }

    getMenus(req: any, res: any) {
        const {restaurant_id} = req.params;
        try {
            hasPermission(req, "list_restaurants")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Section.findAll({where: {id_restaurant: restaurant_id}, include: {model: Articles, as: "articles"}})
                        .then((menus) => {
                            return res.status(200).json(menus);
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

    getMenu(req: any, res: any) {
        const { menu_id } = req.params;

        function doGet() {
            Section.findByPk(
                menu_id,
                {
                    include:
                        [
                            {
                                model: Articles,
                                as: "articles"
                            }
                        ]
                }
                )
                .then((menu) => {
                    if (!menu) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json(menu);
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

    createMenu = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const {restaurant_id} = req.params;
        const restaurant = await Restaurants.findByPk(restaurant_id);
        function applyCreate() {
            try {
                const { description, titre_section} = req.body;
                if (!titre_section || !description || !restaurant_id) {
                    return res.status(400).json({msg: "Bad Request"});
                }

                restaurant?.createSection({
                    description,
                    titre_section,
                    id_restaurant: restaurant?.id
                })
                    .then((section) => {
                        return res.status(201).json(section);
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).json({msg: "Internal Server Error"});
                    });
            } catch (err) {
                console.error(err);
                return res.status(400).json({msg: "Bad Request"});
            }
        }

        if (!headUserId) return res.status(401).json({msg: "Unauthorized"});


        hasPermission(req, "create_restaurant")
            .then((hasPerm) => {
                if (!hasPerm && (restaurant?.id_restaurateur !== headUserId)) return res.status(403).json({msg: "Forbidden"});
                applyCreate();
            });
    }
    updateMenu = (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { menu_id } = req.params;

        function applyUpdate() {
            Section.update(req.body, {where: {id: menu_id}})
                .then((updated) => {
                    if (!updated) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json({msg: "Menu Updated"});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                })
        }

        try {
            if (!headUserId) return res.status(401).json({msg: "Unauthorized"});

            Section.findByPk(menu_id)
                .then((section) => {
                    if (!section) {
                        return res.status(404).json({msg: "Not Found"})
                    }
                    section.getId_restaurant_restaurant()
                        .then((restaurant) => {
                            if (!restaurant) {
                                return res.status(404).json({msg: "Not Found"})
                            }
                            hasPermission(req, "update_restaurant")
                                .then((hasPerm) => {
                                    if (!hasPerm && headUserId !== restaurant?.id_restaurateur) return res.status(403).json({msg: "Forbidden"});
                                    applyUpdate();
                                })
                        })
                })


        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }
    deleteMenu = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { menu_id } = req.params;

        function applyDelete() {
            Section.destroy({where: {id: menu_id}})
                .then((deleted) => {
                    if (!deleted) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json({msg: "Menu Deleted"});
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                });
        }

        try {
            Section.findByPk(menu_id)
                .then((section) => {
                    if (!section) {
                        return res.status(404).json({msg: "Not Found"})
                    }
                    section.getId_restaurant_restaurant()
                        .then((restaurant) => {
                            if (!restaurant) {
                                return res.status(404).json({
                                    msg: "Not Found"
                                });
                            }
                            hasPermission(req, "delete_restaurant")
                                .then((hasPerm) => {
                                    if (!hasPerm && headUserId !== restaurant?.id_restaurateur) return res.status(403).json({msg: "Forbidden"});
                                    applyDelete();
                                });
                        });
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }


}