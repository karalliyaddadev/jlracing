import { z } from "zod";

const requiredTrimmedText = (field: string) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .max(120, `${field} is too long`);

const optionalEmailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .optional()
  .or(z.literal(""))
  .transform((value) => {
    if (!value || value === "") return undefined;
    return value;
  });

export const createPosUserSchema = z.object({
  firstName: requiredTrimmedText("First name"),
  lastName: requiredTrimmedText("Last name"),
  nic: z.string().trim().min(5, "NIC is required").max(40, "NIC is too long"),
  mobileNumber: z
    .string()
    .trim()
    .min(7, "Mobile number is required")
    .max(20, "Mobile number is too long"),
  email: optionalEmailSchema,
  province: requiredTrimmedText("Province"),
  district: requiredTrimmedText("District"),
  address: z.string().trim().min(5, "Address is required").max(1000, "Address is too long"),
  dreamBikeIds: z
    .preprocess((value) => {
      if (value == null) return [];
      return value;
    }, z.array(z.number().int().positive()).max(100))
    .optional()
    .default([]),
});

export const updatePosUserSchema = createPosUserSchema.partial();

export const posUserQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(500).default(20),
  search: z.string().trim().optional(),
});

export const createPurchaseSchema = z.object({
  purchaseType: z.enum(["BIKE", "INVENTORY"]).default("BIKE"),
  bikeVehicleId: z.number().int().positive("Bike is required").optional(),
  inventoryProductId: z.number().int().positive("Inventory product is required").optional(),
  quantity: z.number().int().min(1).default(1),
  finalSellingPrice: z.number().min(0, "Final selling price must be >= 0"),
}).superRefine((data, ctx) => {
  if (data.purchaseType === "BIKE" && !data.bikeVehicleId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bike is required", path: ["bikeVehicleId"] });
  }
  if (data.purchaseType === "INVENTORY" && !data.inventoryProductId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Inventory product is required", path: ["inventoryProductId"] });
  }
});

export const purchaseQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(500).default(50),
  search: z.string().trim().optional(),
});

export type CreatePosUserDto = z.infer<typeof createPosUserSchema>;
export type UpdatePosUserDto = z.infer<typeof updatePosUserSchema>;
export type PosUserQueryDto = z.infer<typeof posUserQuerySchema>;
export type CreatePurchaseDto = z.infer<typeof createPurchaseSchema>;
export type PurchaseQueryDto = z.infer<typeof purchaseQuerySchema>;