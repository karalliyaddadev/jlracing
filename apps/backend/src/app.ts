import express from "express";
import cors from "cors";
import path from "path";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./common/middleware/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import bikesRoutes from "./modules/bikes/bikes.routes";
import posAuthRoutes from "./modules/pos-auth/pos-auth.routes";
import bikeManagementRoutes from "./modules/bike-management/bike-management.routes";

const app = express();

/* ──────────────────── Global middleware ──────────────────── */
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((o) => o.trim()),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ──────────────────── Static uploads ────────────────────── */
const backendRoot = process.cwd().endsWith("backend")
  ? process.cwd()
  : path.join(process.cwd(), "apps", "backend");
const uploadsPath = path.join(backendRoot, "uploads");
console.log("[static] Serving uploads from:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));

/* ──────────────────── Health check ──────────────────────── */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ──────────────────── API Routes ────────────────────────── */
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikesRoutes);
app.use("/api/pos/auth", posAuthRoutes);
app.use("/api/pos/bike-management", bikeManagementRoutes);

/* ──────────────────── Error handling ────────────────────── */
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
