"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.createTask = void 0;
const schemas_1 = require("./schemas");
const createTask = (data) => {
    const { error, value } = schemas_1.createTaskSchema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
    });
    return { error, value };
};
exports.createTask = createTask;
const updateTask = (data) => {
    const { error, value } = schemas_1.updateTaskSchema.validate(data, {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: true,
    });
    return { error, value };
};
exports.updateTask = updateTask;
