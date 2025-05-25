// // src/models/index.ts
// import { Sequelize } from "sequelize-typescript";
// import User from "./user.model"; // Import with default import

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
import sequelize from "../config/database"; // your sequelize instance
import { initUserModel, User } from "./user.model";
import { initTaskModel, Task } from "./task.model";

// Initialize models
initUserModel(sequelize);
initTaskModel(sequelize);

// Define associations
Task.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });

// Export models and sequelize
export { sequelize, User, Task };
