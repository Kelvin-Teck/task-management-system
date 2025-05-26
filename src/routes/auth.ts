import express from "express";
import * as AuthController from "../controllers/auth";
import { createRateLimiter } from "../middlewares/auth";

const router = express.Router();

router
  .post("/register", AuthController.register)
  .post("/login",[createRateLimiter(5,3)], AuthController.login);

export default router;
