"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const task_1 = require("../../interfaces/task"); // Adjust the import path if needed
exports.createTaskSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).max(255).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title must be at least 1 character long",
        "string.max": "Title cannot exceed 255 characters",
    }),
    description: joi_1.default.string().required().messages({
        "string.empty": "Description is required",
    }),
    status: joi_1.default.string()
        .valid(...Object.values(task_1.TaskStatus))
        .default(task_1.TaskStatus.PENDING)
        .messages({
        "any.only": `Status must be one of: ${Object.values(task_1.TaskStatus).join(", ")}`,
    }),
    userId: joi_1.default.number().integer().positive().required().messages({
        "number.base": "userId must be a number",
        "number.integer": "userId must be an integer",
        "number.positive": "userId must be a positive number",
    }),
    timeSpent: joi_1.default.number().integer().min(0).default(0).messages({
        "number.base": "timeSpent must be a number",
        "number.min": "timeSpent cannot be negative",
    }),
});
exports.updateTaskSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(255).optional(),
    description: joi_1.default.string().min(3).optional(),
    status: joi_1.default.string().valid("pending", "in_progress", "completed").optional(),
});
