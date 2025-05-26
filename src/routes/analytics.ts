import express from "express";
import * as AnalyticsController from "../controllers/analytics";
import { AdminGuard, AuthGuard, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router
  .get("/report-time", [AuthGuard], AnalyticsController.getReportTime)
  .get("/report", [AuthGuard], AnalyticsController.getCompletedTaskRate);

export default router;
