"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteTask = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const validator = __importStar(require("../validators/tasks"));
const apiResponses_1 = require("../utils/apiResponses");
const TaskRepository = __importStar(require("../repositories/task"));
const createTask = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = typeof req.user === "object" ? req.user.id : null;
    const { title, description, status } = req.body; //get user input
    // validate input
    const { error, value } = validator.createTask({
        title,
        description,
        userId,
        status
    });
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return (0, apiResponses_1.newError)(errorMessages[0], 403);
    }
    // check if task exists before
    const task = yield TaskRepository.findTaskByTitle(value.title);
    if (task) {
        return (0, apiResponses_1.newError)(`Sorry this task already exist, status: ${task.status.toLocaleUpperCase()}`, 403);
    }
    //   add new task to database
    const newTask = {
        title: value.title,
        description: value.description,
        userId: value.userId,
        status: value.status
    };
    yield TaskRepository.createTask(newTask);
});
exports.createTask = createTask;
const getAllTasks = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, status, page } = req.query;
    const allTasks = yield TaskRepository.getAllTasks({ title, status, page });
    if (allTasks.tasks.length == 0) {
        return (0, apiResponses_1.newError)("No Task(s)", 404);
    }
    return allTasks;
});
exports.getAllTasks = getAllTasks;
const updateTask = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { error, value } = validator.updateTask({
        title,
        description,
        status,
    });
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return (0, apiResponses_1.newError)(errorMessages[0], 403);
    }
    const task = yield TaskRepository.getTaskById(id);
    if (!task) {
        return (0, apiResponses_1.newError)("Sorry this Task does not exist", 404);
    }
    // update task
    const updateData = {
        title: value.title,
        description: value.description,
        status: value.status,
    };
    yield TaskRepository.updateTask(id, updateData);
});
exports.updateTask = updateTask;
const deleteTask = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield TaskRepository.getTaskById(id);
    if (!task) {
        return (0, apiResponses_1.newError)("Sorry this Task does not exist", 404);
    }
    yield TaskRepository.deleteTask(id);
});
exports.deleteTask = deleteTask;
