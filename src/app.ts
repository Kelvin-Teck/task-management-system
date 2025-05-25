import express, { Request, Response } from 'express'

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Server up and running!!!");
});

export default app