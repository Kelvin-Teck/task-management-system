"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.AuthGuard = exports.createRateLimiter = void 0;
const helper = __importStar(require("../utils/helpers"));
const apiResponses_1 = require("../utils/apiResponses");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Function to create and return a rate limiter middleware
const createRateLimiter = (maxRequests, windowMinutes) => {
    return (0, express_rate_limit_1.default)({
        windowMs: windowMinutes * 60 * 1000, // windowMinutes in milliseconds
        max: maxRequests, // limit each IP to maxRequests per windowMs
        message: {
            status: 429, // Too Many Requests
            message: "Too many login attempts, please try again later.",
        },
        handler: (req, res, next) => {
            res.status(429).json({
                error: "Too many login attempts. Please try again later.",
            });
        },
    });
};
exports.createRateLimiter = createRateLimiter;
const AuthGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization)
            return (0, apiResponses_1.newError)("No Authorization Header Provided", 403);
        const token = authorization.split(" ")[1]; //Bearer XXXXXXXXXXXXXXXXXXX
        if (!token)
            return (0, apiResponses_1.newError)("No Token Provided", 403); //returns error if no Token Provided
        const decoded = yield helper.verifyAccessToken(token); //Return users endoded/encrypted data
        if (!decoded)
            return (0, apiResponses_1.newError)("Token has Expired", 403); //Returns Error at Failure to decrypt
        req.user = decoded; //Store decoded data to the request handler
        next(); //move To the next middleware
    }
    catch (error) {
        //   throw error.message;
        return res
            .status(500)
            .json((0, apiResponses_1.sendError)(error.message || "an unknown error occured", 500));
    }
});
exports.AuthGuard = AuthGuard;
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
const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        var _a;
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
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
exports.checkRole = checkRole;
// Pre-defined middlewares for convenience
// export const allowAdmin = () => checkRole('admin');
// export const allowUser = checkRole('user');
// export const allowBoth = (req: Request, res: Response, next: NextFunction) => checkRole('user', 'admin');
