import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import {
  createPackageController,
  getAllPackagesController,
  getMyPackagesController,
  deliverPackageController,
  confirmPackageController,
  getMyLoggedPackagesController,
} from "../controllers/package.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllPackagesController,
);
router.get(
  "/my-logged",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  getMyLoggedPackagesController,
);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  createPackageController,
);
router.patch(
  "/:id/deliver",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  deliverPackageController,
);
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("RESIDENT"),
  getMyPackagesController,
);
router.patch(
  "/:id/confirm",
  authMiddleware,
  roleMiddleware("RESIDENT"),
  confirmPackageController,
);

export default router;
