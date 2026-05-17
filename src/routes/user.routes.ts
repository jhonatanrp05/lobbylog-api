import { createUserController } from "../controllers/user.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createUserController);

export default router;
