import initModels from "../db/models/init-models.js";
import sequelize from "../db/config.js";
import hashPassword from '@adminjs/passwords';
import bcrypt from "bcrypt";
import componentLoader from "../admin/component-loader.js";
import argon2 from 'argon2';
import {ListActionResponse, RecordActionResponse} from "adminjs";
import { roleMiddleware, ROLES } from "./roles.js";
var models = initModels(sequelize);

export const compteResource = {
    resource: models.compte,
    options: {
        properties: {
            email: {
                isTitle: true,
            },
            password: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: false,
                    edit: true, // we only show it in the edit view
                },
                isRequired: false
            }
        },
        actions: {
            new: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL]),
                before: async (req) => {
                    if (req.payload?.password) {
                        req.payload.password = bcrypt.hashSync(req.payload.password, 10);
                    }
                    return req;
                }
            },
            show: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL]),

                after: async (response) => {
                    response.record.params.password = '';
                    return response;
                }
            },
            edit: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL]),

                before: async (request) => {
                    // no need to hash on GET requests, we'll remove passwords there anyway
                    if (request.method === 'post') {
                        // hash only if password is present, delete otherwise
                        // ,so we don't overwrite it
                        if (request.payload?.password) {
                            request.payload.password = bcrypt.hashSync(request.payload.password, 10);
                        } else {
                            delete request.payload?.password;
                        }
                    }
                    return request;
                },
                after: async (response: RecordActionResponse) => {
                    response.record.params.password = '';
                    return response;
                },
            },
            list: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL]),

                after: async (response: ListActionResponse) => {
                    response.records.forEach((record) => {
                        record.params.password = '';
                    });
                    return response;
                },
            },
            delete: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL]),
            },
            bulkDelete: {
                isAccessible: roleMiddleware([ROLES.ADMIN, ROLES.COMMERCIAL]),
            },

        }

    }

};