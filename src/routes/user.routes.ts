import {
  createUserController,
  deleteUserController,
  getAllUsersController,
} from "../controllers/user.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createUserController);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  deleteUserController,
);
router.get("/", authMiddleware, roleMiddleware("ADMIN"), getAllUsersController);

export default router;
