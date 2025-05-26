// import { DataTypes, Model, Sequelize } from "sequelize";

// // Define user roles enum
// export enum UserRole {
//   ADMIN = "admin",
//   USER = "user",
// }

// // Define User interface for TypeScript
// export interface UserAttributes {
//   id?: number;
//   name: string;
//   email: string;
//   password: string;
//   role?: UserRole;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface UserCreationAttributes extends UserAttributes {
//   id?: number;
// }

// export class User
//   extends Model<UserAttributes, UserCreationAttributes>
//   implements UserAttributes
// {
//   public id!: number;
//   public name!: string;
//   public email!: string;
//   public password!: string;
//   public role!: UserRole;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   // Define associations here if needed
//   static associate(models: any) {
//     // Example: User.hasMany(models.Task, { foreignKey: 'userId' });
//   }
// }

// // This is the function that sequelize-cli expects
// export default (sequelize: Sequelize) => {
//   User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         validate: {
//           notEmpty: {
//             msg: "Name cannot be empty",
//           },
//           len: {
//             args: [2, 100],
//             msg: "Name must be between 2 and 100 characters",
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: {
//             msg: "Must be a valid email address",
//           },
//           notEmpty: {
//             msg: "Email cannot be empty",
//           },
//         },
//       },
//       password: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//         validate: {
//           notEmpty: {
//             msg: "Password cannot be empty",
//           },
//           len: {
//             args: [6, 255],
//             msg: "Password must be at least 6 characters long",
//           },
//         },
//       },
//       role: {
//         type: DataTypes.ENUM(...Object.values(UserRole)),
//         allowNull: false,
//         defaultValue: UserRole.USER,
//         validate: {
//           isIn: {
//             args: [Object.values(UserRole)],
//             msg: "Role must be either admin or user",
//           },
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "users",
//       timestamps: true,
//     }
//   );

//   return User;
// };

// 1. Role Based Access
// 2. Email Service
// 3. DB ER Diagram
// 4. Modify the report route response
// 5. Paginate where possible.