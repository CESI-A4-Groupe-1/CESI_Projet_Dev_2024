import express from 'express';
import AdminJS from 'adminjs';
import {buildAuthenticatedRouter} from '@adminjs/express';
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

console.log("registering adapter")
AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

console.log("adapter registered")

const port = process.env.PORT || 3030;

const authenticate = async (email: string, password: string) => {
    const Compte = initModels(sequelize).compte;
    const Roles = initModels(sequelize).roles;

    try {
        const compte = await Compte.findOne({where: {email: email}});
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
        if (role.getDataValue("role_title") !== "admin") {
            return null;
        }

        // const token = jwt.sign({
        //     id: compte.id,
        //     email: compte.email,
        //     role_id: compte.role_id,
        //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
        // }, process.env.ACCESS_JWT_KEY);
        // await sendNotification(compte.id, {title: "Logged In", body: `Logged in as ${compte.email}`});
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
            vTotalCommandesResource
        ],
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
