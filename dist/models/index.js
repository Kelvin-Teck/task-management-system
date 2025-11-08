"use strict";
// // src/models/index.ts
// import { Sequelize } from "sequelize-typescript";
// import User from "./user.model"; // Import with default import
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.User = exports.sequelize = void 0;
// const sequelize = new Sequelize({
//   // Your database configuration
//   database: process.env.DB_NAME,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT as any,
//   models: [__dirname + "/*.model.ts"], // Auto-load all models
//   modelMatch: (filename, member) => {
//     return (
//       filename.substring(0, filename.indexOf(".model")) === member.toLowerCase()
//     );
//   },
// });
// export { sequelize, User };
// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//   },
// };
// models/index.ts
const database_1 = __importDefault(require("../config/database")); // your sequelize instance
exports.sequelize = database_1.default;
const user_model_1 = require("./user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
const task_model_1 = require("./task.model");
Object.defineProperty(exports, "Task", { enumerable: true, get: function () { return task_model_1.Task; } });
// Initialize models
(0, user_model_1.initUserModel)(database_1.default);
(0, task_model_1.initTaskModel)(database_1.default);
// Define associations
task_model_1.Task.belongsTo(user_model_1.User, { foreignKey: "userId", as: "user" });
user_model_1.User.hasMany(task_model_1.Task, { foreignKey: "userId", as: "tasks" });
