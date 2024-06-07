import jwt from "jsonwebtoken";
import {initModels} from "../models/init-models";
import db from "../db/db";

const {Roles} = initModels(db);

export async function isAdmin(req: any): Promise<boolean> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return false;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return false;
    }

    try {
        const decoded : any = jwt.verify(token, process.env.ACCESS_JWT_KEY!);
        console.log(decoded);
        console.log(decoded.role_id);
        return decoded.role_id === (await Roles.findOne({where: {role_title: "admin"}}))?.role_id;
    } catch {
        return false;
    }
}