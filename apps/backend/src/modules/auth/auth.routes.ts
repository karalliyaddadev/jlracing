import { Router } from "express";
import { authenticate } from "../../common/middleware/auth.middleware";
import * as authController from "./auth.controller";

const router = Router();

/**
 * POST /api/auth/register
 * Creates a new user account and returns tokens.
 */
router.post("/register", authController.register);

/**
 * POST /api/auth/login
 * Authenticates user and returns tokens.
 */
router.post("/login", authController.login);

/**
 * POST /api/auth/refresh
 * Exchanges a refresh token for a new access token.
 */
router.post("/refresh", authController.refresh);

/**
 * POST /api/auth/logout   [protected]
 * Revokes the stored refresh token.
 */
router.post("/logout", authenticate, authController.logout);

/**
 * GET /api/auth/me   [protected]
 * Returns the authenticated user's profile.
 */
router.get("/me", authenticate, authController.me);

export default router;
