import express, { Request, Response } from "express";
import authRoutes from "./routes/auth";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server up and running!!!");
});

app.use("/auth", authRoutes);

export default app;
