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
exports.getCompletedTaskRate = exports.getReportTime = void 0;
const TaskRepository = __importStar(require("../repositories/task"));
const UserRepository = __importStar(require("../repositories/user"));
const helper = __importStar(require("../utils/helpers"));
const apiResponses_1 = require("../utils/apiResponses");
const getReportTime = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // get all completed tasks
    const allCompletedTasks = yield TaskRepository.getAllCompletedTasks();
    console.log({ allCompletedTasks });
    if (allCompletedTasks.length == 0) {
        return (0, apiResponses_1.newError)("No Completed Task Found", 404);
    }
    const timedTasks = [];
    for (const task of allCompletedTasks) {
        const rawTask = task.toJSON();
        const diffInMs = new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
        const diffInHours = (diffInMs / (1000 * 60 * 60)).toFixed(2);
        const taskWithTime = Object.assign(Object.assign({}, rawTask), { timeSpent: {
                hours: parseFloat(diffInHours),
                humanReadable: helper.formatDuration(diffInMs),
            } });
        timedTasks.push(taskWithTime);
    }
    const sortedTasks = timedTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return sortedTasks;
});
exports.getReportTime = getReportTime;
const getCompletedTaskRate = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = typeof req.user === "object" ? req.user.id : null;
    const user = yield UserRepository.getUserById(userId);
    // get all Task of user
    const userTasks = yield TaskRepository.getAllTasksByUser(userId);
    if (userTasks.length == 0) {
        return (0, apiResponses_1.newError)("You do have not any Task", 404);
    }
    // get all completed task by user
    const completedTasks = yield TaskRepository.getAllCompletedTasksByUser(userId);
    if (completedTasks.length == 0) {
        return (0, apiResponses_1.newError)("You have so far not completed any Task", 404);
    }
    const completedTaskRate = (completedTasks.length / userTasks.length) * 100;
    const formattedResponse = {
        name: user === null || user === void 0 ? void 0 : user.name,
        taskRate: parseFloat(completedTaskRate.toFixed(2)),
    };
    return formattedResponse;
});
exports.getCompletedTaskRate = getCompletedTaskRate;
