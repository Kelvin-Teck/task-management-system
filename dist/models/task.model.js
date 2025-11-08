"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTaskModel = exports.Task = void 0;
// models/task.model.ts
const sequelize_1 = require("sequelize");
const task_1 = require("../interfaces/task");
class Task extends sequelize_1.Model {
    static associate(models) {
        Task.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    }
}
exports.Task = Task;
// Export init function separately
const initTaskModel = (sequelize) => {
    Task.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: { msg: "Title cannot be empty" },
                len: {
                    args: [1, 255],
                    msg: "Title must be between 1 and 255 characters",
                },
            },
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Description cannot be empty" },
            },
        },
        status: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(task_1.TaskStatus)),
            allowNull: false,
            defaultValue: task_1.TaskStatus.PENDING,
            validate: {
                isIn: {
                    args: [Object.values(task_1.TaskStatus)],
                    msg: "Status must be pending, in-progress, or completed",
                },
            },
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        timeSpent: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: { args: [0], msg: "Time spent cannot be negative" },
            },
            comment: "Time spent on task in minutes",
        },
    }, {
        sequelize,
        modelName: "task",
        tableName: "tasks",
        timestamps: true,
        indexes: [
            { fields: ["userId"] },
            { fields: ["status"] },
            { fields: ["createdAt"] },
            { fields: ["userId", "status"] },
        ],
    });
    return Task;
};
exports.initTaskModel = initTaskModel;
