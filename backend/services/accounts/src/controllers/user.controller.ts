import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Compte, Roles} = initModels(db);

export default class UserController {
    constructor() {
    }

    getUsers(req: any, res: any) {
        try {
            hasPermission(req, "list_users")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Compte.findAll()
                        .then((users) => {
                            return res.status(200).json(users);
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

    getUser(req: any, res: any) {
        const headUserId = req.headers['x-user-id'];
        const { user_id } = req.params;

        function doGetUser() {
            Compte.findByPk(user_id)
                .then((user) => {
                    if (!user) return res.status(404).json({msg: "Not Found"});
                    return res.status(200).json(user);
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                })
        }

        try {
            hasPermission(req, "list_users")
                .then((hasPerm) => {
                    if (!hasPerm && headUserId !== user_id) return res.status(403).json({msg: "Forbidden"});
                    doGetUser();
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    updateUser = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { user_id } = req.params;

        function applyUpdateUser() {
            Compte.update(req.body, {where: {id: user_id}})
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
            hasPermission(req, "update_user")
                .then((hasPerm) => {
                    if (!hasPerm && headUserId !== user_id) return res.status(403).json({msg: "Forbidden"});
                    applyUpdateUser();
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }
    deleteUser = async (req: any, res: any) => {
        const headUserId = req.headers['x-user-id'];
        const { user_id } = req.params;

        function applyDelete() {
            Compte.destroy({where: {id: user_id}})
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
            hasPermission(req, "delete_user")
                .then((hasPerm) => {
                    if (!hasPerm && headUserId !== user_id) return res.status(403).json({msg: "Forbidden"});
                    applyDelete();
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }


}