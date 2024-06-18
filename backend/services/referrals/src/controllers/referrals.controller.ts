import {initModels} from "../models/init-models";
import db from "../db/db";
import hasPermission from "./hasPermission";
import {CreatedAt} from "sequelize-typescript";
import * as constants from "node:constants";

const {Compte} = initModels(db);

export default class ReferralsController {
    constructor() {
    }

    getParain(req: any, res: any) {
        const headUserId = req.headers['x-user-id'];
        const {user_id} = req.params;
        try {
            hasPermission(req, "get_parain")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                    Compte.findByPk(user_id)
                        .then((user) => {
                            if (!user) return res.status(404).json({msg: "Not Found"});
                            return res.status(200).json(user.id_parain);
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

    addParain(req: any, res: any) {
        const headUserId = req.headers['x-user-id'];
        const {user_id} = req.params;
        const {referee_id} = req.params;
        try {
            hasPermission(req, "add_parain")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Forbidden"});
                            Compte.findByPk(user_id)
                                .then((commlist) => {
                                    if (!commlist) return res.status(404).json({msg: "Not Found"});
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                })
                            const parain = {id_parain: referee_id}
                            Compte.update(parain, {where: {id: user_id}})
                                .then((updated) => {
                                    if (!updated) return res.status(404).json({msg: "Not Found"});
                                    return res.status(200).json({msg: "Referral Updated"});
                                })
                                .catch((err) => {
                                    console.error(err);
                                    return res.status(500).json({msg: "Internal Server Error"});
                                })
                })
        } catch (err) {
            console.error(err);
            return res.status(500).json({msg: "Internal Server Error"});
        }
    }

}