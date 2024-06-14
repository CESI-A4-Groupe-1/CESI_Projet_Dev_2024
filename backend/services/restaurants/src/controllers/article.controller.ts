import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Articles, Section} = initModels(db);

export default class ArticleController {
    constructor() {
    }

    getArticle(req: any, res: any) {
        const { article_id } = req.params;

        function doGet() {
            Articles.findByPk(article_id)
                .then((article) => {
                    if (!article) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json(article);
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

    getArticles(req: any, res: any) {
        const { menu_id } = req.params;
        try {
            hasPermission(req, "list_restaurants")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Section.findByPk(menu_id)
                        .then((menu) => {
                            if (!menu) return res.status(404).json({msg: "Not Found"});
                            menu.getArticles()
                                .then((articles) => {
                                    return res.status(200).json(articles);
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                });
                        })
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    createArticle = (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { menu_id } = req.params;


        function applyCreate() {
            try {
                Section.findByPk(menu_id)
                    .then((menu) => {
                        if (!menu) return res.status(404).json({msg: "Not Found"});
                        const { nom, prix, description } = req.body;
                        if (!nom || !prix || !description ) {
                            return res.status(400).json({msg: "Bad Request"});
                        }
                        menu.createArticle({
                            nom: nom,
                            prix: prix,
                            description: description,
                            id_section: menu.id,
                        })
                            .then((article) => {
                                return res.status(201).json(article);
                            })
                            .catch((err) => {
                                console.error(err);
                                return res.status(500).json({msg: "Internal Server Error"});
                            });
                    })
            } catch (err) {
                console.error(err);
                return res.status(400).json({msg: "Bad Request"});
            }
        }
        try {
            Section.findByPk(menu_id)
                .then((menu) => {
                    if (!menu) return res.status(404).json({msg: "Not Found"});
                    menu.getId_restaurant_restaurant()
                        .then((restaurant) => {
                            if (!restaurant) return res.status(404).json({msg: "Not Found"});
                            hasPermission(req, "create_restaurant")
                                .then((hasPerm) => {
                                    if (!hasPerm && headUserId !== restaurant.id_restaurateur) return res.status(403).json({msg: "Forbidden"});
                                    applyCreate();
                                })
                        })
                })
        } catch (err) {
            console.error(err);
            return res.status(400).json({msg: "Bad Request"});
        }

    }



    updateArticle = (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { article_id } = req.params;

        function applyUpdate() {
            Articles.update(req.body, {where: {id: article_id}})
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

            Articles.findByPk(article_id)
                .then((article) => {
                    if (!article) {
                        return res.status(404).json({msg: "Not Found"})
                    }
                    article.getId_section_section()
                        .then((section) => {
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

                })


        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }
    deleteArticle = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { article_id } = req.params;

        function applyDelete() {
            Articles.destroy({where: {id: article_id}})
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
            Articles.findByPk(article_id)
                .then((article) => {
                    if (!article) {
                        return res.status(404).json({msg: "Not Found"})
                    }
                    article.getId_section_section()
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
                })

        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }


}