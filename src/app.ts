import express, { Request, Response } from "express";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task"
import analyticsRoutes from './routes/analytics'

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server up and running!!!");
});

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use('/analytics', analyticsRoutes)
export default app;
