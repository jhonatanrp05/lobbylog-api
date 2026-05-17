import { createUserController } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.post("/", createUserController);

export default router;
