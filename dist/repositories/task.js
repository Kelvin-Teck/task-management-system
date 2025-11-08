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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTaskByTitle = exports.getAllTasksByUser = exports.getAllCompletedTasksByUser = exports.getAllCompletedTasks = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const createTask = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Task.create(data);
    return;
});
exports.createTask = createTask;
const getAllTasks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, status, page, limit = 10 } = filters;
    const currentPage = parseInt(page) || 1;
    const query = {};
    // Dynamically build the query object based on provided filters
    if (title) {
        query.title = { [sequelize_1.Op.iLike]: `%${title}%` }; // Assuming 'title' is a field in the Task model
    }
    if (status) {
        query.status = status; // Assuming 'status' is a field in the Task model
    }
    const offset = (currentPage - 1) * limit;
    const allTasks = yield models_1.Task.findAll({
        where: query,
        order: [["createdAt", "DESC"]],
        limit,
        offset,
    });
    const total = allTasks.length;
    return {
        tasks: allTasks,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getAllTasks = getAllTasks;
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield models_1.Task.findByPk(id);
    return task;
});
exports.getTaskById = getTaskById;
const updateTask = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Task.update(data, { where: { id } });
    return;
});
exports.updateTask = updateTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Task.destroy({ where: { id } });
    return;
});
exports.deleteTask = deleteTask;
const getAllCompletedTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const completedTasks = yield models_1.Task.findAll({
        where: { status: "completed" },
        order: [["createdAt", "DESC"]],
    });
    return completedTasks;
});
exports.getAllCompletedTasks = getAllCompletedTasks;
const getAllCompletedTasksByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const completedTasks = yield models_1.Task.findAll({
        where: { userId, status: "completed" },
    });
    return completedTasks;
});
exports.getAllCompletedTasksByUser = getAllCompletedTasksByUser;
const getAllTasksByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const completedTasks = yield models_1.Task.findAll({
        where: { userId },
    });
    return completedTasks;
});
exports.getAllTasksByUser = getAllTasksByUser;
const findTaskByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield models_1.Task.findOne({ where: { title } });
    return task;
});
exports.findTaskByTitle = findTaskByTitle;
