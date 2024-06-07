import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import {isAdmin} from "./isAdmin";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Compte, Roles} = initModels(db);

export default class UserController {
    constructor() {
    }

    getUsers = async (req: any, res: any) => {
        try {
            const users = await Compte.findAll();
            return res.status(200).json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    getUser = async (req: any, res: any) => {
        try {
            const {user_id} = req.params;

            if ((await Roles.findByPk(req.headers['x-user-role']))?.role_title === "customer" && req.headers['x-user-id'] !== user_id) {
                return res.status(403).json({msg: "Forbidden"});
            }

            const user = await Compte.findByPk(user_id);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

    // TODO - add update user functionality
    updateUser = async (req: any, res: any) => {}
    // TODO - add delete user functionality
    deleteUser = async (req: any, res: any) => {}


}