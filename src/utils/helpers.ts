import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../interfaces/user";

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
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string
  );

  return token;
};
