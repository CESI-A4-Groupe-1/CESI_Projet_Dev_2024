import express from 'express';
import AdminJS from 'adminjs';
import {AuthenticationContext, buildAuthenticatedRouter} from '@adminjs/express';
import initializeDb from './db/index.js';

import * as AdminJSSequelize from '@adminjs/sequelize';
import sequelize from "./db/config.js";

import initModels from "./db/models/init-models.js";
import bcrypt from "bcrypt";
import {permissionsResource} from "./resources/permissionsResource.js";
import {rolesResource} from "./resources/rolesResource.js";
import {restaurantsResource} from "./resources/restaurantResource.js";
import {categoriesResource} from "./resources/categoriesResource.js";
import {articlesResource} from "./resources/articlesResource.js";
import {sectionResource} from "./resources/sectionResource.js";
import {vPrixCommResource} from "./resources/vPrixCommResource.js";
import {vTotalArticlesResource} from "./resources/vTotalArticleResource.js";
import {vTotalCommandesResource} from "./resources/vTotalCommandesResource.js";
import {vGestionCommResource} from "./resources/vGestionCommResource.js";
import {vGraphPrixResource} from "./resources/vGraphPrixResource.js";
import {compteResource} from "./resources/compteResource.js";
import {componentLoader, Components} from "./components.js";
import dashboardHandler from "./components/dashboardHandler.js";
import {ROLES} from "./resources/roles.js";
import session from 'express-session';
import sequelizeStore from 'connect-session-sequelize';
import {ordersResource} from "./resources/ordersResource.js";
import {deliveryResource} from "./resources/deliveryResource.js";
import {permissionRoleResource} from "./resources/permissionRoleResource.js";
import {notificationsResource} from "./resources/notificationsResource.js";
import {loggedSessionsResource} from "./resources/loggedSessionResource.js";

console.log("registering adapter")
AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

console.log("adapter registered")

const port = process.env.PORT || 3030;

const authenticate = async (email: string, password: string, context: AuthenticationContext) => {
    const Compte = initModels(sequelize).compte;
    const Roles = initModels(sequelize).roles;

    try {
        const compte = await Compte.findOne({where: {email: email}, include: [{model: Roles, as: "role"}]});
        if (!compte) {
            return null;
        }
        const isMatch = bcrypt.compareSync(password, compte.getDataValue("password"));;
        if (!isMatch) {
            return null;
        }

        const role = await Roles.findOne({where: {role_id: compte.getDataValue("role_id")}});
        if (!role) {
            return null;
        }
        if (role.getDataValue("role_title") !== ROLES.ADMIN && role.getDataValue("role_title") !== ROLES.COMMERCIAL && role.getDataValue("role_title") !== ROLES.DELIVERY && role.getDataValue("role_title") !== ROLES.RESTAURATEUR) {
            return null;
        }



        return Promise.resolve(compte);
    } catch (err) {
        console.log(err);
        return null;
    }
}

const start = async () => {
    const app = express();

    await initializeDb();

    // console.log(models)
    const adminOptions = {
        databases: [sequelize],
        resources: [
            permissionsResource,
            rolesResource,
            restaurantsResource,
            categoriesResource,
            articlesResource,
            sectionResource,
            compteResource,
            vGestionCommResource,
            vGraphPrixResource,
            vPrixCommResource,
            vTotalArticlesResource,
            vTotalCommandesResource,
            ordersResource,
            deliveryResource,
            permissionRoleResource,
            notificationsResource,
            loggedSessionsResource
        ],
        dashboard: {
            component: Components.Dashboard,
            handler: dashboardHandler
        },
        componentLoader
    };
        console.log("creating admin")
      const admin = new AdminJS(adminOptions);

      if (process.env.NODE_ENV === 'production') {
        await admin.initialize();
      } else {
        admin.watch();
      }

      const router = buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword: process.env.COOKIE_SECRET,
            cookieName: 'adminjs'
        },
        null,
        {
          secret: process.env.COOKIE_SECRET,
          saveUninitialized: true,
          resave: true,
        },
      );

      app.use(admin.options.rootPath, router);

      app.listen(port, () => {
        console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
      });
};

start();
