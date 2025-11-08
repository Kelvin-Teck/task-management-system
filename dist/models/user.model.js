"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
// models/user.model.ts
const sequelize_1 = require("sequelize");
const user_1 = require("../interfaces/user");
// Define the User model
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Task, {
            foreignKey: "userId",
            as: "tasks",
        });
    }
}
exports.User = User;
// Export the init function
const initUserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Name cannot be empty" },
                len: {
                    args: [2, 100],
                    msg: "Name must be between 2 and 100 characters",
                },
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: "Must be a valid email address" },
                notEmpty: { msg: "Email cannot be empty" },
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Password cannot be empty" },
                len: {
                    args: [6, 255],
                    msg: "Password must be at least 6 characters long",
                },
            },
        },
        role: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(user_1.UserRole)),
            allowNull: false,
            defaultValue: user_1.UserRole.USER,
            validate: {
                isIn: {
                    args: [Object.values(user_1.UserRole)],
                    msg: "Role must be either admin or user",
                },
            },
        },
    }, {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["email"],
            },
            {
                fields: ["role"],
            },
        ],
    });
    return User;
};
exports.initUserModel = initUserModel;
