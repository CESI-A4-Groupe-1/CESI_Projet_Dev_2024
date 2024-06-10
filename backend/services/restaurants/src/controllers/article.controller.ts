import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Articles, Roles} = initModels(db);

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

    createArticle = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];


        function applyCreate() {
            try {
                const { nom, prix, id_section, description } = req.body;
                if (!nom || !prix || !id_section || !description ) {
                    return res.status(400).json({msg: "Bad Request"});
                }
                const restaurant = Articles.build({
                    nom: nom,
                    description: description,
                    prix: prix,
                    id_section: id_section
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

    updateArticle = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { article_id } = req.params;

        function applyUpdate() {
            Articles.update(req.body, {where: {id: article_id}})
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
            const restaurant = await Articles.findByPk(article_id)
            // if (headUserId === restaurant?.id_restaurateur) {
            //     applyUpdate();
            // }

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
    deleteArticle = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { article_id } = req.params;

        function applyDelete() {
            Articles.destroy({where: {id: article_id}})
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
            const restaurant = await Articles.findByPk(article_id)
            // if (headUserId === restaurant?.id_restaurateur) {
            //     applyDelete();
            // }

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