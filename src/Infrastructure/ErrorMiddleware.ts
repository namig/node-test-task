import { NextFunction, Request, Response } from "express";
import { HttpError } from "./Error/HttpError";

export const ErrorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
  res.status(status).json({ message });
};