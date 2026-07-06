import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../errors/app-error";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  /**
   * Zod Validation Error
   */
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  /**
   * Custom App Error
   */
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  /**
   * Database Error
   */
  const errorCode = (err as any).code || (err as any).cause?.code;
  if (errorCode === "23503") {
    return res.status(400).json({
      success: false,
      message: "Related record not found",
    });
  }

  /**
   * Unknown Error
   */
  return res.status(500).json({
    success: false,
    message: err.message ?? "Internal Server Error",
  });
};