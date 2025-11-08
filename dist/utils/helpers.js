"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuration = exports.verifyAccessToken = exports.generateAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiResponses_1 = require("./apiResponses");
// Define a constant for the salt rounds
const saltRounds = 10;
// Function to hash the password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw new Error("Error hashing password");
    }
});
exports.hashPassword = hashPassword;
// Function to compare the password with the hashed password
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield bcrypt_1.default.compare(password, hashedPassword);
        return match;
    }
    catch (error) {
        throw new Error("Error comparing passwords");
    }
});
exports.comparePassword = comparePassword;
// Function to generate access token
const generateAccessToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
// Custom type guard to check for JwtPayload
function isJwtPayload(payload) {
    return typeof payload !== "string";
}
const verifyAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Ensure the decoded token is a JwtPayload
        if (!isJwtPayload(decoded)) {
            throw (0, apiResponses_1.newError)("Invalid token structure", 403);
        }
        // Check for token expiration
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
            throw (0, apiResponses_1.newError)("Token has expired", 403);
        }
        return decoded;
    }
    catch (err) {
        throw (0, apiResponses_1.newError)(err.message || "Invalid token", 403);
    }
});
exports.verifyAccessToken = verifyAccessToken;
// Time Formatter
const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / (3600 * 24));
    const parts = [];
    if (days)
        parts.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours)
        parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    if (minutes)
        parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
    return parts.length ? parts.join(" ") : "Less than a minute";
};
exports.formatDuration = formatDuration;
