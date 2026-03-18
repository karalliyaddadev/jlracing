import { Router } from "express";
import { authenticatePosAdmin } from "../../common/middleware/pos-auth.middleware";
import * as ctrl from "./bike-management.controller";

const router = Router();
router.use(authenticatePosAdmin);

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

export default router;
