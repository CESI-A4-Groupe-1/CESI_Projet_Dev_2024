import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';

import * as AdminJSSequelize from '@adminjs/sequelize';

console.log("registering adapter")
AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

console.log("adapter registered")

import sequelize from "./db/config.js";

import initModels from "./db/models/init-models.js";

const port = process.env.PORT || 3030;

const start = async () => {
  const app = express();

  await initializeDb();
    var models = initModels(sequelize);
    console.log(models)
    const adminOptions = {
        databases: [sequelize],
        resources: [
            {
                resource: models.permissions,
                options: {}

            }
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
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
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
