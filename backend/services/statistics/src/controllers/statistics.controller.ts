import {initModels} from "../models/init-models";
import db from "../db/db";
import {config} from "dotenv";
import hasPermission from "./hasPermission";

config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const {VGraphPrix, VGestionComm} = initModels(db);

export default class StatisticsController {

    constructor() {
    }

    getPerf(req: any, res: any) {
        try {
            const startDate = new Date(req.query.start);
            const endDate = new Date(req.query.end);

            if (!startDate || !endDate) {
                return res.status(400).json({msg: "Bad Request"});
            }

            hasPermission(req, "get_statistics")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Unauthorized"});

                    VGraphPrix.findAll({where: {jours: {between: [startDate, endDate]}}})
                        .then((perfs) => {
                            return res.status(200).json(perfs);
                        })
                })

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Internal Server Error.",
                err: err
            })
        }
    }

    getOrders(req: any, res: any) {
        try {
            hasPermission(req, "get_statistics")
                .then((hasPerm) => {
                    if (!hasPerm) return res.status(403).json({msg: "Unauthorized"});

                    VGestionComm.findAll()
                        .then((comms) => {
                            return res.status(200).json(comms);
                        })
                })

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Internal Server Error.",
                err: err
            })
        }
    }

}