import { z } from "zod";

const STATUSES = ["available", "sold"] as const;

export const createVehicleSchema = z.object({
  brandId:         z.number().int().positive("Brand is required"),
  modelId:         z.number().int().positive("Model is required"),
  colour:          z.string().min(1, "Colour is required"),
  year:            z.number().int().min(1900).max(new Date().getFullYear() + 2).optional(),
  fileNo:          z.string().optional(),
  manufactureDate: z.string().optional(),
  registerNo:      z.string().optional(),
  chassisNo:       z.string().optional(),
  engineNo:        z.string().optional(),
  status:          z.enum(STATUSES).default("available"),
});

export const bulkCreateVehicleSchema = z.object({
  brandId:         z.number().int().positive(),
  modelId:         z.number().int().positive(),
  colour:          z.string().min(1),
  year:            z.number().int().min(1900).max(new Date().getFullYear() + 2).optional(),
  count:           z.number().int().min(1).max(500),
});

export const updateVehicleSchema = createVehicleSchema.partial().extend({
  status: z.enum(STATUSES).optional(),
});

export const vehicleQuerySchema = z.object({
  page:    z.coerce.number().int().min(1).default(1),
  limit:   z.coerce.number().int().min(1).max(5000).default(50),
  brandId: z.coerce.number().int().positive().optional(),
  modelId: z.coerce.number().int().positive().optional(),
  colour: z.string().optional(),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 2).optional(),
  fileNo: z.string().optional(),
  registerNo: z.string().optional(),
  status:  z.enum(STATUSES).optional(),
  search:  z.string().optional(),
});

export const renameFileNoSchema = z.object({
  oldFileNo: z.string().min(1, "Old file number is required"),
  newFileNo: z.string().min(1, "New file number is required"),
});

export const deleteFileNoSchema = z.object({
  fileNo: z.string().min(1, "File number is required"),
});

export type CreateVehicleDto     = z.infer<typeof createVehicleSchema>;
export type BulkCreateVehicleDto = z.infer<typeof bulkCreateVehicleSchema>;
export type UpdateVehicleDto     = z.infer<typeof updateVehicleSchema>;
export type VehicleQueryDto      = z.infer<typeof vehicleQuerySchema>;
export type RenameFileNoDto      = z.infer<typeof renameFileNoSchema>;
export type DeleteFileNoDto      = z.infer<typeof deleteFileNoSchema>;
