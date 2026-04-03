import type { Request, Response, NextFunction } from "express";
import multer from "multer";
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

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "Each image must be 10MB or smaller",
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(413).json({
        success: false,
        message: "Maximum 6 images are allowed per upload",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Error && err.message.includes("Only JPEG, PNG, WebP, and AVIF images are allowed")) {
    return res.status(415).json({
      success: false,
      message: err.message,
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
