"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.newError = exports.sendSuccess = exports.sendError = void 0;
const sendError = (message, code) => {
    return {
        status: "ERROR",
        code,
        message,
    };
};
exports.sendError = sendError;
const sendSuccess = (message, data) => {
    return {
        status: "SUCCESS",
        code: 200,
        message,
        data,
    };
};
exports.sendSuccess = sendSuccess;
// class CustomError extends Error {
//   status: number;
//   constructor(message: string, status: number) {
//     super(message);
//     this.status = status;
//     Object.setPrototypeOf(this, new.target.prototype);
//   }
// }
// utils/CustomError.ts
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "CustomError";
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
const newError = (message, code) => {
    throw new CustomError(message, code);
    // return {
    //   error: true,
    //   message,
    //   code,
    // };
};
exports.newError = newError;
