import { Router } from "express";
import { authenticate, authorize } from "../../common/middleware/auth.middleware";
import * as bikesController from "./bikes.controller";

const router = Router();

/**
 * GET /api/bikes
 * Public – list all bikes with pagination and filters.
 */
router.get("/", bikesController.getAll);

/**
 * GET /api/bikes/:id
 * Public – get a single bike.
 */
router.get("/:id", bikesController.getOne);

/**
 * POST /api/bikes        [ADMIN | STAFF]
 * Create a new bike entry.
 */
router.post("/", authenticate, authorize("ADMIN", "STAFF"), bikesController.create);

/**
 * PATCH /api/bikes/:id   [ADMIN | STAFF]
 * Update bike fields.
 */
router.patch("/:id", authenticate, authorize("ADMIN", "STAFF"), bikesController.update);

/**
 * DELETE /api/bikes/:id  [ADMIN]
 * Remove a bike entry.
 */
router.delete("/:id", authenticate, authorize("ADMIN"), bikesController.remove);

export default router;
