"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const schemas_1 = require("./schemas");
const registerUser = (data) => {
    const { error, value } = schemas_1.registerUserSchema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
    });
    return { error, value };
};
exports.registerUser = registerUser;
const loginUser = (data) => {
    const { error, value } = schemas_1.loginUserSchema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
    });
    return { error, value };
};
exports.loginUser = loginUser;
