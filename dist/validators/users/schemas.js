"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const user_1 = require("../../interfaces/user");
exports.registerUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name must be at most 100 characters",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Must be a valid email address",
        "string.empty": "Email is required",
    }),
    password: joi_1.default.string().min(6).max(255).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),
    role: joi_1.default.string()
        .valid(user_1.UserRole.ADMIN, user_1.UserRole.USER)
        .default(user_1.UserRole.USER)
        .messages({
        "any.only": "Role must be either 'admin' or 'user'",
    }),
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address",
    }),
    password: joi_1.default.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
});
