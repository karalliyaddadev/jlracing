import { z } from "zod";
import { AccountType, PaymentMethod, VoucherType } from "../../../generated/prisma";

export const createAccountSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  type: z.nativeEnum(AccountType).default(AccountType.BANK),
  openingBalance: z.number().min(0).default(0),
});

export const updateAccountSchema = createAccountSchema.partial();

export const createReceiptSchema = z.object({
  purchaseId: z.number().int().positive("Purchase is required"),
  accountId: z.number().int().positive("Account is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH),
  chequeNo: z.string().trim().max(80).optional(),
  chequeBank: z.string().trim().max(120).optional(),
  chequeDate: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),
  description: z.string().trim().max(500).optional(),
});

export const updateReceiptSchema = createReceiptSchema
  .omit({ purchaseId: true })
  .partial();

export const createVoucherSchema = z.object({
  accountId: z.number().int().positive("Account is required"),
  type: z.nativeEnum(VoucherType),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().trim().max(500).optional(),
});

export const updateVoucherSchema = createVoucherSchema
  .omit({ accountId: true })
  .partial();

export const receiptQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  search: z.string().trim().optional(),
  accountId: z.coerce.number().int().positive().optional(),
});

export const invoiceQueueQuerySchema = z.object({
  search: z.string().trim().optional(),
  showAll: z
    .preprocess((v) => v === "true" || v === "1", z.boolean())
    .default(false),
  from: z.string().optional(),
  to: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).default(100),
});

export const voucherQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
  accountId: z.coerce.number().int().positive().optional(),
});

export const ledgerQuerySchema = z.object({
  accountId: z.coerce.number().int().positive("Account is required"),
  from: z.string().min(1, "From date is required"),
  to: z.string().min(1, "To date is required"),
});

export type CreateAccountDto = z.infer<typeof createAccountSchema>;
export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;
export type CreateReceiptDto = z.infer<typeof createReceiptSchema>;
export type UpdateReceiptDto = z.infer<typeof updateReceiptSchema>;
export type CreateVoucherDto = z.infer<typeof createVoucherSchema>;
export type UpdateVoucherDto = z.infer<typeof updateVoucherSchema>;
export type ReceiptQueryDto = z.infer<typeof receiptQuerySchema>;
export type InvoiceQueueQueryDto = z.infer<typeof invoiceQueueQuerySchema>;
export type VoucherQueryDto = z.infer<typeof voucherQuerySchema>;
export type LedgerQueryDto = z.infer<typeof ledgerQuerySchema>;
