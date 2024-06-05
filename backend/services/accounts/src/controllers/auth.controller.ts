require('dotenv').config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

import User from "../models/user.model";
const User_DB : User[] = [];

export default class AuthController {
    register = (req: any, res: any) => {
        const user = new User(req.body.username, bcrypt.hashSync(req.body.password, 10))
        User_DB.push(user)
        return res.status(201).json({
            "msg": "New User Created"
        });
    }

    login = (req: any, res: any) => {
        const {username, password} = req.body

        const user = User_DB.find(
            (u) => u.username === username && bcrypt.compareSync(password, u.password)
        );
        if (user) {
            const token = jwt.sign({
                username: user.username,
                exp: Math.floor(Date.now() / 1000) + (2 * 60),
            }, process.env.ACCESS_JWT_KEY);

            return res.status(200).json({
                message: "Login Successful",
                token: token,
            });
        } else {
            return res.status(401).json({
                message: "Invalid Credentials",
            });
        }
    }

    authenticate = (req: any, res: any) => {
        let token;
        try {
            token = req.headers.authorization.split(" ")[1];
        }
         catch (error) {
            return res.status(401).json({
                message: "No Token Provided",
            });
        }


        if (!token) {
            return res.status(401).json({
                message: "No Token Provided",
            });
        }

        jwt.verify(
            token,
            process.env.ACCESS_JWT_KEY,
            (err: any, decoded: any) => {
                // check if decoded user exists
                const user = User_DB.find((u) => u.username === decoded.username);
                // response
                if (user) {
                    return res.status(200).json({
                        message: "User Authenticated",
                        token: token,
                    });
                } else {
                    return res.status(401).json({
                        message: "Invalid Credentials",
                    });
                }
            }

        )
    }

}