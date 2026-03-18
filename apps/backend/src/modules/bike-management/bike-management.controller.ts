import type { Request, Response, NextFunction } from "express";
import { validate } from "../../common/utils/errors";
import { sendSuccess, sendCreated } from "../../common/utils/response";
import {
  createBrandSchema, updateBrandSchema,
  createModelSchema, updateModelSchema,
  createColorSchema, updateColorSchema,
} from "./dto/brand.dto";
import {
  createVehicleSchema,
  bulkCreateVehicleSchema,
  updateVehicleSchema,
  vehicleQuerySchema,
  renameFileNoSchema,
  deleteFileNoSchema,
} from "./dto/vehicle.dto";
import * as service from "./bike-management.service";

// ── Brands ─────────────────────────────────────────────────────────────────
export async function getBrands(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.listBrands()); } catch (err) { return next(err); }
}
export async function createBrand(req: Request, res: Response, next: NextFunction) {
  try { return sendCreated(res, await service.createBrand(validate(createBrandSchema, req.body))); } catch (err) { return next(err); }
}
export async function updateBrand(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.updateBrand(Number(req.params.id), validate(updateBrandSchema, req.body))); } catch (err) { return next(err); }
}
export async function deleteBrand(req: Request, res: Response, next: NextFunction) {
  try { await service.deleteBrand(Number(req.params.id)); return sendSuccess(res, { message: "Brand and all related data deleted" }); } catch (err) { return next(err); }
}

// ── Models ─────────────────────────────────────────────────────────────────
export async function getModels(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.listModels(Number(req.params.brandId))); } catch (err) { return next(err); }
}
export async function getAllModels(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.listAllModels()); } catch (err) { return next(err); }
}
export async function createModel(req: Request, res: Response, next: NextFunction) {
  try { return sendCreated(res, await service.createModel(Number(req.params.brandId), validate(createModelSchema, req.body))); } catch (err) { return next(err); }
}
export async function updateModel(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.updateModel(Number(req.params.id), validate(updateModelSchema, req.body))); } catch (err) { return next(err); }
}
export async function deleteModel(req: Request, res: Response, next: NextFunction) {
  try { await service.deleteModel(Number(req.params.id)); return sendSuccess(res, { message: "Model and all related vehicles deleted" }); } catch (err) { return next(err); }
}

// ── Colors ─────────────────────────────────────────────────────────────────
export async function getColors(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.listColors()); } catch (err) { return next(err); }
}
export async function createColor(req: Request, res: Response, next: NextFunction) {
  try { return sendCreated(res, await service.createColor(validate(createColorSchema, req.body))); } catch (err) { return next(err); }
}
export async function updateColor(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.updateColor(Number(req.params.id), validate(updateColorSchema, req.body))); } catch (err) { return next(err); }
}
export async function deleteColor(req: Request, res: Response, next: NextFunction) {
  try { await service.deleteColor(Number(req.params.id)); return sendSuccess(res, { message: "Color deleted" }); } catch (err) { return next(err); }
}

// ── Vehicles ───────────────────────────────────────────────────────────────
export async function getVehicleSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    return sendSuccess(res, await service.vehicleSummary(status));
  } catch (err) { return next(err); }
}
export async function getVehicles(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.listVehicles(validate(vehicleQuerySchema, req.query))); } catch (err) { return next(err); }
}
export async function getVehicle(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.getVehicle(Number(req.params.id))); } catch (err) { return next(err); }
}
export async function createVehicle(req: Request, res: Response, next: NextFunction) {
  try { return sendCreated(res, await service.createVehicle(validate(createVehicleSchema, req.body))); } catch (err) { return next(err); }
}
export async function bulkCreateVehicles(req: Request, res: Response, next: NextFunction) {
  try { return sendCreated(res, await service.bulkCreateVehicles(validate(bulkCreateVehicleSchema, req.body))); } catch (err) { return next(err); }
}
export async function updateVehicle(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.updateVehicle(Number(req.params.id), validate(updateVehicleSchema, req.body))); } catch (err) { return next(err); }
}
export async function deleteVehicle(req: Request, res: Response, next: NextFunction) {
  try { await service.deleteVehicle(Number(req.params.id)); return sendSuccess(res, { message: "Vehicle deleted" }); } catch (err) { return next(err); }
}
export async function getFileNos(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.listFileNos()); } catch (err) { return next(err); }
}
export async function renameFileNo(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.renameFileNo(validate(renameFileNoSchema, req.body))); } catch (err) { return next(err); }
}
export async function deleteFileNo(req: Request, res: Response, next: NextFunction) {
  try { return sendSuccess(res, await service.deleteFileNo(validate(deleteFileNoSchema, req.body))); } catch (err) { return next(err); }
}
