// types/express.d.ts
import { JwtPayload } from "jsonwebtoken";
import { AuthPayload } from "../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
