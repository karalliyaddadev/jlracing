import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { authenticatePosAdmin } from "../../common/middleware/pos-auth.middleware";
import * as ctrl from "./bike-management.controller";

const router = Router();
router.use(authenticatePosAdmin);

// ── Multer config for bike images ───────────────────────────────────────────
// Use process.cwd() for reliable path resolution in both tsx and compiled modes
const backendRoot = process.cwd().endsWith("backend")
  ? process.cwd()
  : path.join(process.cwd(), "apps", "backend");
const uploadDir = path.join(backendRoot, "uploads", "bikes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("[bike-management] Created upload dir:", uploadDir);
}
console.log("[bike-management] Upload dir:", uploadDir, "exists:", fs.existsSync(uploadDir));

const MAX_IMAGE_COUNT = 6;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_IMAGE_SIZE_BYTES,
    files: MAX_IMAGE_COUNT,
  },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPEG, PNG, WebP, and AVIF images are allowed"));
  },
});

// ── Brands ─────────────────────────────────────────────────────────────────
router.get(   "/brands",                 ctrl.getBrands);
router.post(  "/brands",                 ctrl.createBrand);
router.patch( "/brands/:id",             ctrl.updateBrand);
router.delete("/brands/:id",             ctrl.deleteBrand);

// ── Models ──────────────────────────────────────────────────────────────────
router.get(   "/brands/:brandId/models", ctrl.getModels);
router.post(  "/brands/:brandId/models", ctrl.createModel);
router.get(   "/models",                 ctrl.getAllModels);
router.patch( "/models/:id",             ctrl.updateModel);
router.delete("/models/:id",             ctrl.deleteModel);

// ── Colors ──────────────────────────────────────────────────────────────────
router.get(   "/colors",                 ctrl.getColors);
router.post(  "/colors",                 ctrl.createColor);
router.patch( "/colors/:id",             ctrl.updateColor);
router.delete("/colors/:id",             ctrl.deleteColor);

// ── Vehicles ────────────────────────────────────────────────────────────────
router.get(   "/vehicles/summary",       ctrl.getVehicleSummary);
router.get(   "/vehicles/filenos",       ctrl.getFileNos);
router.patch( "/vehicles/filenos",       ctrl.renameFileNo);
router.delete("/vehicles/filenos",       ctrl.deleteFileNo);
router.get(   "/vehicles",               ctrl.getVehicles);
router.get(   "/vehicles/:id",           ctrl.getVehicle);
router.post(  "/vehicles",               ctrl.createVehicle);
router.post(  "/vehicles/bulk",          ctrl.bulkCreateVehicles);
router.patch( "/vehicles/:id",           ctrl.updateVehicle);
router.delete("/vehicles/:id",           ctrl.deleteVehicle);

// ── Vehicle Expenses ────────────────────────────────────────────────────────
router.get(   "/vehicles/:vehicleId/expenses",              ctrl.getExpenses);
router.post(  "/vehicles/:vehicleId/expenses",              ctrl.addExpense);
router.delete("/vehicles/:vehicleId/expenses/:expenseId",   ctrl.deleteExpense);

// ── Vehicle Images ──────────────────────────────────────────────────────────
router.get(   "/vehicles/:vehicleId/images",                ctrl.getVehicleImages);
router.post(  "/vehicles/:vehicleId/images",  upload.array("images", MAX_IMAGE_COUNT), ctrl.uploadVehicleImages);
router.delete("/vehicles/:vehicleId/images/:imageId",       ctrl.deleteVehicleImage);
router.patch( "/vehicles/:vehicleId/images/:imageId/primary", ctrl.setPrimaryImage);

export default router;
