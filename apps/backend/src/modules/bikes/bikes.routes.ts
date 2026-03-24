import { Router } from "express";
import * as bikesController from "./bikes.controller";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/auth.middleware";

const router = Router();

router.get("/", bikesController.listBikes);
router.get("/:id", bikesController.getBike);
router.post("/", authenticate, authorize("ADMIN", "STAFF"), bikesController.createBike);
router.patch("/:id", authenticate, authorize("ADMIN", "STAFF"), bikesController.updateBike);
router.delete("/:id", authenticate, authorize("ADMIN"), bikesController.deleteBike);

export default router;