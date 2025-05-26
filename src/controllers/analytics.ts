import { Request, Response } from "express";
import * as AnalyticsService from "../services/analytics";
import { sendError, sendSuccess } from "../utils/apiResponses";

export const getReportTime = async (req: Request, res: Response) => {
  try {
    const response = await AnalyticsService.getReportTime(req);

    res.status(200).json(sendSuccess("Task Report Time Generated Successfully", response));
  } catch (error) {
    const status =
      error instanceof Error && "code" in error ? (error as any).code : 500;
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured";
    // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json(sendError(errorMessage, status));
  }
};


export const getCompletedTaskRate =  async (req:Request, res:Response) => {
  try {
    const response = await AnalyticsService.getCompletedTaskRate(req);

    res
      .status(200)
      .json(sendSuccess("Task Completion Rate Generated Successfully", response));
  } catch (error) {
    const status =
      error instanceof Error && "code" in error ? (error as any).code : 500;
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured";
    // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json(sendError(errorMessage, status));
  }
}