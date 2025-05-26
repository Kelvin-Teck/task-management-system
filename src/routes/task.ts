import express from "express";
import * as TaskController from "../controllers/task";
import { AdminGuard, AuthGuard, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router
  .get("/tasks", [AuthGuard], TaskController.getAllTasks)
 

router.post("/tasks", [AuthGuard], TaskController.createTask);

router.put("/tasks/:id", [AuthGuard], TaskController.updateTask);

router.delete("/tasks/:id", [AuthGuard], TaskController.deleteTask);

export default router;
