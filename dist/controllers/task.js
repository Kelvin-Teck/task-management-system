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
const TaskService = __importStar(require("../services/task"));
const apiResponses_1 = require("../utils/apiResponses");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield TaskService.createTask(req);
        res
            .status(201)
            .json((0, apiResponses_1.sendSuccess)("Task Created Successfully", response));
    }
    catch (error) {
        const status = error instanceof Error && "code" in error ? error.code : 500;
        const errorMessage = error instanceof Error ? error.message : "An unknown error occured";
        // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json((0, apiResponses_1.sendError)(errorMessage, status));
    }
});
exports.createTask = createTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield TaskService.getAllTasks(req);
        res
            .status(200)
            .json((0, apiResponses_1.sendSuccess)("All Tasks Retrieved Successfully", response));
    }
    catch (error) {
        const status = error instanceof Error && "code" in error ? error.code : 500;
        const errorMessage = error instanceof Error ? error.message : "An unknown error occured";
        // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json((0, apiResponses_1.sendError)(errorMessage, status));
    }
});
exports.getAllTasks = getAllTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield TaskService.updateTask(req);
        res
            .status(201)
            .json((0, apiResponses_1.sendSuccess)("Task Updated Successfully", response));
    }
    catch (error) {
        const status = error instanceof Error && "code" in error ? error.code : 500;
        const errorMessage = error instanceof Error ? error.message : "An unknown error occured";
        // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json((0, apiResponses_1.sendError)(errorMessage, status));
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield TaskService.deleteTask(req);
        res
            .status(200)
            .json((0, apiResponses_1.sendSuccess)("Task Deleted Successfully", response));
    }
    catch (error) {
        const status = error instanceof Error && "code" in error ? error.code : 500;
        const errorMessage = error instanceof Error ? error.message : "An unknown error occured";
        // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json((0, apiResponses_1.sendError)(errorMessage, status));
    }
});
exports.deleteTask = deleteTask;
