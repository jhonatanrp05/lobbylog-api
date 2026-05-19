import { Router } from "express";

import {
  createUserController,
  updateUserController,
  deleteUserController,
  getAllUsersController,
  getResidentsController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema, updateUserSchema, uuidParamSchema } from "../lib/schemas";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllUsersController);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createUserSchema),
  createUserController,
);
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(uuidParamSchema, "params"),
  validate(updateUserSchema),
  updateUserController,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(uuidParamSchema, "params"),
  deleteUserController,
);
router.get(
  "/residents",
  authMiddleware,
  roleMiddleware("RECEPTIONIST"),
  getResidentsController,
);

export default router;
