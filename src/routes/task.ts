import express from "express";
import * as TaskController from "../controllers/task";
import {  AuthGuard, checkRole } from "../middlewares/auth";

const router = express.Router();

router.get("/", [AuthGuard, checkRole('admin', 'user')], TaskController.getAllTasks);

router.post("/tasks", [AuthGuard, checkRole('admin', 'user')], TaskController.createTask);

router.put("/tasks/:id", [AuthGuard, checkRole('admin', 'user')], TaskController.updateTask);

router.delete("/tasks/:id", [AuthGuard, checkRole('admin', 'user')], TaskController.deleteTask);

export default router;
