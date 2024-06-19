import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";
import {messaging} from "../firebaseAdmin";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {Notifications} = initModels(db);

export default class NotificationsController {
    constructor() {

    }

    register(req: any, res: any) {
            const { token } = req.body;
            const {user_id} = req.params;
            if (token) {
                Notifications.create({
                    user_id,
                    device_token: token
                })
                    .then((notification) => {
                        return res.status(200).json({success: true, message: 'Token registered successfully'});
                    })
                    .catch((err) => {
                        console.error(err);
                        return res.status(500).json({success: false, message: 'Internal Server Error'});
                    });

            } else {
                res.status(400).send({ success: false, message: 'Token is required' });
            }

    }

    send(req: any, res: any) {
            const { notification } = req.body;
            const {user_id} = req.params;

            Notifications.findAll({where: {user_id}})
                .then(async (notifications) => {
                    console.log(notifications.length);
                    if (notifications.length > 0) {
                        const tokens = notifications.map((notification) => notification.device_token);
                        const message = {
                            notification,
                            tokens,
                        };
                        try {
                            const response = await messaging.sendEachForMulticast(message);
                            res.status(200).send(response);
                        } catch (error) {
                            res.status(500).send(error);
                        }
                    }
                    else {
                        res.status(404).send({success: false, message: 'No tokens found'});
                    }
                })
                .catch((err) => {
                    console.error(err);
                    return res.status(500).json({msg: "Internal Server Error"});
                });
    }


}