import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./common/middleware/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import bikesRoutes from "./modules/bikes/bikes.routes";
import posAuthRoutes from "./modules/pos-auth/pos-auth.routes";

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

/* ──────────────────── Health check ──────────────────────── */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ──────────────────── API Routes ────────────────────────── */
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikesRoutes);
app.use("/api/pos/auth", posAuthRoutes);

/* ──────────────────── Error handling ────────────────────── */
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
