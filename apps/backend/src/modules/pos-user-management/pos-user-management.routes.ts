import { Router } from "express";
import { authenticatePosAdmin } from "../../common/middleware/pos-auth.middleware";
import * as controller from "./pos-user-management.controller";

const router = Router();
router.use(authenticatePosAdmin);

router.get("/meta/provinces", controller.getProvinceDistrictMeta);
router.get("/dream-bikes", controller.getDreamBikeOptions);
router.get("/purchases", controller.getPurchases);

router.get("/", controller.getPosUsers);
router.get("/:id/purchases", controller.getPurchasesByUser);
router.get("/:id", controller.getPosUser);
router.post("/", controller.createPosUser);
router.patch("/:id", controller.updatePosUser);
router.delete("/:id", controller.deletePosUser);
router.post("/:id/purchases", controller.createPurchase);
router.post("/:id/purchases/:purchaseId/settle", controller.settlePurchase);

export default router;