import AdminJS from "adminjs";
import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";

const ROLES = {
    ADMIN: 'admin',
    COMMERCIAL: 'commercial',
    RESTAURATEUR: 'restaurant',
    DELIVERY: 'delivery',
};

const hasRole = (role : string, roles : string[]) => {
    // console.log(role, roles, roles.includes(role));
    return roles.includes(role);
};

const Roles = initModels(sequelize).roles;

const roleMiddleware = (roles: string[]) => {
    return ({ currentAdmin }) => {
        if (!currentAdmin) {
            return false;
        }
        return hasRole(currentAdmin.role.role_title, roles);
    };
};

export {
    ROLES,
    hasRole,
    roleMiddleware,
};