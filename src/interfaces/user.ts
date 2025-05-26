import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Define user roles enum
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends UserAttributes {
  id?: number;
}

export interface AuthPayload extends JwtPayload {
  id: number;
  email: string;
  role: "user" | "admin";
}
