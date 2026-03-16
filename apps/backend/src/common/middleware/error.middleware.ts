import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { env } from "../../config/env";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {}),
    });
  }

  // Unknown / unhandled error
  const message = err instanceof Error ? err.message : "Internal server error";
  if (env.NODE_ENV !== "production") {
    console.error(err);
  }
  return res.status(500).json({ success: false, message });
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ success: false, message: "Route not found" });
}
