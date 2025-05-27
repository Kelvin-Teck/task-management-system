import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserAttributes } from "../interfaces/user";
import { newError } from "./apiResponses";

// Define a constant for the salt rounds
const saltRounds = 10;

// Function to hash the password
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Function to compare the password with the hashed password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Function to generate access token
export const generateAccessToken = (user: Partial<UserAttributes>): string => {
  const payload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
    
  return token;
};

// Custom type guard to check for JwtPayload
function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
  return typeof payload !== "string";
}

export const verifyAccessToken = async (token: string): Promise<JwtPayload> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Ensure the decoded token is a JwtPayload
    if (!isJwtPayload(decoded)) {
      throw newError("Invalid token structure", 403);
    }

    // Check for token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw newError("Token has expired", 403);
    }

    return decoded;
  } catch (err: any) {
    throw newError(err.message || "Invalid token", 403);
  }
};

// Time Formatter
export const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / (3600 * 24));

  const parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return parts.length ? parts.join(" ") : "Less than a minute";
};
