import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getResidentsController,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema, uuidParamSchema } from "../lib/schemas";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllUsersController);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(createUserSchema),
  createUserController,
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
