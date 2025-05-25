// import { Sequelize } from "sequelize-typescript";
// import * as dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT,
//   models: [__dirname + "/../models"],
//   logging: console.log,
// });

// export default sequelize;


// import { Sequelize } from "sequelize-typescript";
// import * as config from "./config.json";

// const env = process.env.NODE_ENV || "development";
// const dbConfig = config[env as keyof typeof config];

// const sequelize = new Sequelize({
//   ...dbConfig,
//   models: [__dirname + "/../models"],
//   repositoryMode: true,
//   logging: console.log,
// });

// export default sequelize;

// import { Sequelize } from "sequelize-typescript";
// import * as dotenv from "dotenv";

// dotenv.config();

// // Validate required environment variables
// const requiredEnvVars = [
//   "DB_HOST",
//   "DB_USERNAME",
//   "DB_PASSWORD",
//   "DB_NAME",
//   "DB_DIALECT",
// ];
// requiredEnvVars.forEach((env) => {
//   if (!process.env[env]) {
//     throw new Error(`Missing required environment variable: ${env}`);
//   }
// });

// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
//   dialect: process.env.DB_DIALECT as any,
//   models: [__dirname + "/../models"],
//   logging: process.env.DB_LOGGING === "true" ? console.log : false,
//   pool: {
//     max: process.env.DB_POOL_MAX ? parseInt(process.env.DB_POOL_MAX) : 5,
//     min: process.env.DB_POOL_MIN ? parseInt(process.env.DB_POOL_MIN) : 0,
//     acquire: process.env.DB_POOL_ACQUIRE
//       ? parseInt(process.env.DB_POOL_ACQUIRE)
//       : 30000,
//     idle: process.env.DB_POOL_IDLE ? parseInt(process.env.DB_POOL_IDLE) : 10000,
//   },
// //   dialectOptions:
// //     process.env.DB_SSL === "true"
// //       ? {
// //           ssl: {
// //             require: true,
// //             rejectUnauthorized: false,
// //           },
// //         }
// //       : {},
// });

// export default sequelize;

import { Sequelize } from "sequelize";
import { User } from "../models/user.model";
import dotenv from "dotenv";
import { Task } from "../models/task.model";

// dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432, // Add this line
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
});

export default sequelize;
