import { Request, Response } from "express";
import * as AuthService from "../services/auth";

import { sendError, sendSuccess } from "../utils/apiResponses";

export const register = async (req: Request, res: Response) => {
  try {
    const response = await AuthService.register(req);

    res.status(200).json(sendSuccess("User Created Succesfully", response));
  } catch (error) {
    const status =
      error instanceof Error && "code" in error ? (error as any).code : 500;
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured";
    // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json(sendError(errorMessage, status));
  }
};


export const login = async (req:Request, res: Response) => {
    try {
      const response = await AuthService.login(req);

      res.status(200).json(sendSuccess("User Logged in Successfully", response));
    } catch (error) {
      const status =
        error instanceof Error && "code" in error ? (error as any).code : 500;
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json(sendError(errorMessage, status));
    }
}