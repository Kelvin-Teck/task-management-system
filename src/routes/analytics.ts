import express from "express";
import * as AnalyticsController from "../controllers/analytics";
import { AuthGuard,  checkRole } from "../middlewares/auth";

const router = express.Router();

router
  .get("/report-time", [AuthGuard, checkRole('admin')], AnalyticsController.getReportTime)
  .get("/report", [AuthGuard, checkRole('admin')], AnalyticsController.getCompletedTaskRate);

export default router;
