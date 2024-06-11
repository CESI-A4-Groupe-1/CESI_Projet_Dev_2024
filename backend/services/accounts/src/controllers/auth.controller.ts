import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Compte} = initModels(db);

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


            if ((await compte.getRole()).role_title === "admin") {
                hasPermission(req, "create_superuser")
                    .then((hasPerm) => {
                        if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    });
                    }

            compte.save()
                .then((user) => {
                    return res.status(201).json(user);
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    login = async (req: any, res: any) => {
        try {
            const compte = await Compte.findOne({where: {email: req.body.email}});
            if (!compte) {
                return res.status(401).json({
                    "msg": "User Not Found"
                });
            }
            const isMatch = bcrypt.compareSync(req.body.password, compte.password);
            if (!isMatch) {
                return res.status(401).json({
                    "msg": "Invalid Credentials"
                });
            }
            const token = jwt.sign({
                id: compte.id,
                email: compte.email,
                role_id: compte.role_id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }, process.env.ACCESS_JWT_KEY);
            return res.status(200).json({
                message: "Login Successful",
                token: token,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }

    }

    authenticate = async (req: any, res: any) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    msg: "Invalid Credentials"
                });
            }
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.ACCESS_JWT_KEY);
            } catch (err) {
                return res.status(401).json({
                    "msg": "Invalid Credentials"
                });
            }
            const compte = await Compte.findOne({where: {id: decoded.id}});
            if (!compte) {
                return res.status(401).json({
                    "msg": "Invalid Credentials"
                });
            }
            res.setHeader("x-user-id", compte.id);
            res.setHeader("x-user-role", compte.role_id);
            return res.status(200).json({
                message: "User Authenticated",
                token: token,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

}