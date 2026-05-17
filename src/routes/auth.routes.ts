import { loginController } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/", loginController);

export default router;
