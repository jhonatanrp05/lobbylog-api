import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createPackageSchema, uuidParamSchema } from "../lib/schemas";
import {
  createPackageController,
  getAllPackagesController,
  getMyPackagesController,
  deliverPackageController,
  confirmPackageController,
  getMyLoggedPackagesController,
  deletePackageController,
} from "../controllers/package.controller";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllPackagesController);
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
  validate(createPackageSchema),
  createPackageController,
);
router.patch(
  "/:id/deliver",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  validate(uuidParamSchema, "params"),
  deliverPackageController,
);
router.get("/my", authMiddleware, roleMiddleware("RESIDENT"), getMyPackagesController);
router.patch(
  "/:id/confirm",
  authMiddleware,
  roleMiddleware("RESIDENT"),
  validate(uuidParamSchema, "params"),
  confirmPackageController,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(uuidParamSchema, "params"),
  deletePackageController,
);

export default router;
