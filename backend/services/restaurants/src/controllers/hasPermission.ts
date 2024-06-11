import db from "../db/db";
import {initModels} from "../models/init-models";
const {Compte, Roles, PermissionRoles, Permissions} = initModels(db);
export default async function hasPermission(req: any, permissionCode: string) {

    const headUserId = req.headers['x-user-id'];
    if (!headUserId) return false;

    const reqUser = await Compte.findOne({ where: { id: headUserId } });
    if (!reqUser) return false;

    const permission = await Permissions.findOne({where: {code: permissionCode}});
    if (!permission) {
        return false;
    }
    const role = await Roles.findOne({where: {role_id: reqUser.role_id}});
    if (!role) {
        return false;
    }


    const permissionRole = await PermissionRoles.findOne({
        where: {
            permission_id: permission.permission_id,
            role_id: role.role_id
        }
    });

    return permissionRole !== null;
}