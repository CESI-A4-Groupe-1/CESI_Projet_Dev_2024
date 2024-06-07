import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import {isAdmin} from "./isAdmin";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Compte, Roles} = initModels(db);

export default class AuthController {
    constructor() {
    }
    register = async (req: any, res: any) => {
        try {
            const { email } = req.body;
            const existingUser = await Compte.findOne({ where: { email } });

            if (existingUser) {
                return res.status(409).json({ msg: "User Already Exists" });
            }

            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const compte = new Compte(req.body);

            const userRole = await compte.getRole();
            if (userRole.role_title === "admin" && !isAdmin(req)) {
                return res.status(401).json({ msg: "Unauthorized" });
            }

            await compte.save();
            return res.status(201).json(compte);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    login = async (req: any, res: any) => {
        try {
            const { email, password } = req.body;
            const compte = await Compte.findOne({ where: { email } });

            if (!compte) {
                return res.status(401).json({ msg: "User Not Found" });
            }

            const isMatch = bcrypt.compareSync(password, compte.password);
            if (!isMatch) {
                return res.status(401).json({ msg: "Invalid Credentials" });
            }

            const token = jwt.sign(
                {
                    id: compte.id,
                    email: compte.email,
                    role_id: compte.role_id,
                    exp: Math.floor(Date.now() / 1000) + 2 * 60,
                },
                process.env.ACCESS_JWT_KEY
            );

            return res.status(200).json({ msg: "Login Successful", token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    authenticate = async (req: any, res: any) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ msg: "No Token Provided" });
            }

            const decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            const compte = await Compte.findOne({ where: { id: decoded.id } });

            if (!compte) {
                return res.status(401).json({ msg: "Invalid Credentials" });
            }
            res.setHeader("X-User-ID", decoded.id);
            res.setHeader("X-User-Role", decoded.role_id);
            return res.status(200).json({ msg: "User Authenticated", token });
        } catch (err) {
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ msg: "Invalid Credentials" });
            }
            console.error(err);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

}