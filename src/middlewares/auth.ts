import { NextFunction, Request, Response } from "express";
import * as helper from "../utils/helpers";
import { newError, sendError, sendSuccess } from "../utils/apiResponses";

import rateLimit from "express-rate-limit";

// Function to create and return a rate limiter middleware
export const createRateLimiter = (
  maxRequests: number,
  windowMinutes: number
) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000, // windowMinutes in milliseconds
    max: maxRequests, // limit each IP to maxRequests per windowMs
    message: {
      status: 429, // Too Many Requests
      message: "Too many login attempts, please try again later.",
    },
    handler: (req: Request, res: Response, next: NextFunction) => {
      res.status(429).json({
        error: "Too many login attempts. Please try again later.",
      });
    },
  });
};

export const AuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization)
      return newError("No Authorization Header Provided", 403);

    const token = authorization.split(" ")[1]; //Bearer XXXXXXXXXXXXXXXXXXX

    if (!token) return newError("No Token Provided", 403); //returns error if no Token Provided

    const decoded = await helper.verifyAccessToken(token); //Return users endoded/encrypted data

    if (!decoded) return newError("Token has Expired", 403); //Returns Error at Failure to decrypt

    req.user = decoded; //Store decoded data to the request handler

    next(); //move To the next middleware
  } catch (error: any) {
  

    //   throw error.message;
    return res
      .status(500)
      .json(sendError(error.message || "an unknown error occured", 500));
  }
};

// export const AdminGuard = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user && typeof req.user !== "string" && req.user.role === "admin") {
//     console.log(req.user)
//     return next(); //Move To the next middleware
//   } else {
//     return newError("Access denied, Admins only", 403);
//   }
// };

// export const authorizeRoles = (...roles: string[]) => {
//   return async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const authorization = req.headers.authorization;

//       if (!authorization) {
//         return res
//           .status(403)
//           .json(newError("Authorization header missing", 403));
//       }

//       const token = authorization.split(" ")[1];
//       if (!token) {
//         return res.status(403).json(newError("Token missing", 403));
//       }

//       const decoded = await helper.verifyAccessToken(token);
//       if (!decoded) {
//         return res.status(403).json(newError("Invalid or expired token", 403));
//       }

//       req.user = decoded;

//       if (roles.length && !roles.includes(decoded.role)) {
//         return res
//           .status(403)
//           .json(newError("Access denied: insufficient permissions", 403));
//       }

//       next();
//     } catch (error: any) {
//       console.error("Authorization error:", error);
//       res
//         .status(500)
//         .json(
//           newError(
//             process.env.NODE_ENV === "development"
//               ? error.message || "Authorization failed"
//               : "Authentication error",
//             500
//           )
//         );
//     }
//   };
// };

// Flexible role checker (factory function)
export const checkRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.user?.role) {
      res.status(401).json({ message: "You are Unauthorized" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res
        .status(403)
        .json({
          message: "Access denied. Only admins can access this resource...",
        });
      return;
    }

    next();
  };
};

// Pre-defined middlewares for convenience
// export const allowAdmin = () => checkRole('admin');
// export const allowUser = checkRole('user');
// export const allowBoth = (req: Request, res: Response, next: NextFunction) => checkRole('user', 'admin');
