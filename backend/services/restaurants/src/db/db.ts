import {Sequelize} from "sequelize-typescript";
import dotenv from "dotenv";
import {Compte} from "../models/init-models";
dotenv.config();

const db = new Sequelize(
    process.env.MYSQL_DATABASE!,
    process.env.MYSQL_USER!,
    process.env.MYSQL_PASSWORD,
    {
    dialect: 'mysql',
    host: "db",
    protocol: "tcp",
        define: {
            timestamps: false,
            underscored: true,
        }
});

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
})
export default db;