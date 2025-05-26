import { Request, Response } from "express";
import * as TaskService from '../services/task'
import { sendError, sendSuccess } from "../utils/apiResponses";

export const createTask = async (req: Request, res: Response) => {
    try {
      const response = await TaskService.createTask(req);

      res
        .status(201)
        .json(sendSuccess("Task Created Successfully", response));
    } catch (error) {
      const status =
        error instanceof Error && "code" in error ? (error as any).code : 500;
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json(sendError(errorMessage, status));
    }
}

export const getAllTasks = async (req: Request, res: Response) => {
    try {
      const response = await TaskService.getAllTasks(req);

      res
        .status(200)
        .json(sendSuccess("All Tasks Retrieved Successfully", response));
    } catch (error) {
      const status =
        error instanceof Error && "code" in error ? (error as any).code : 500;
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json(sendError(errorMessage, status));
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
      const response = await TaskService.updateTask(req);

      res
        .status(201)
        .json(sendSuccess("Task Updated Successfully", response));
    } catch (error) {
      const status =
        error instanceof Error && "code" in error ? (error as any).code : 500;
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json(sendError(errorMessage, status));
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
      const response = await TaskService.deleteTask(req);

      res
        .status(200)
        .json(sendSuccess("Task Deleted Successfully", response));
    } catch (error) {
      const status =
        error instanceof Error && "code" in error ? (error as any).code : 500;
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json(sendError(errorMessage, status));
    }
}

