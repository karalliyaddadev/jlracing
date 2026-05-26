import { Router } from "express";
import { authenticatePosAdmin } from "../../common/middleware/pos-auth.middleware";
import * as controller from "./accounts.controller";

const router = Router();
router.use(authenticatePosAdmin);

// Chart of Accounts
router.get("/chart", controller.getAccounts);
router.post("/chart", controller.createAccount);
router.patch("/chart/:id", controller.updateAccount);
router.post("/chart/:id/toggle", controller.toggleAccount);

// Receipts — invoice queue must come before /:id to avoid route conflict
router.get("/receipts/invoices", controller.getPurchasesForReceipt);
router.get("/receipts", controller.getReceipts);
router.get("/receipts/:id", controller.getReceipt);
router.post("/receipts", controller.createReceipt);
router.patch("/receipts/:id", controller.updateReceipt);
router.post("/receipts/:id/void", controller.voidReceipt);
router.post("/receipts/:id/bounce", controller.bounceReceipt);
router.post("/receipts/:id/clear", controller.clearCheque);

// Vouchers
router.get("/vouchers", controller.getVouchers);
router.get("/vouchers/:id", controller.getVoucher);
router.post("/vouchers", controller.createVoucher);
router.patch("/vouchers/:id", controller.updateVoucher);
router.post("/vouchers/:id/void", controller.voidVoucher);

// General Ledger
router.get("/ledger", controller.getLedger);

export default router;
