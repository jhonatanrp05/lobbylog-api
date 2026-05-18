import { Router } from "express";
import rateLimit from "express-rate-limit";

import { loginController, logoutController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../lib/schemas";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

router.post("/login", loginLimiter, validate(loginSchema), loginController);
router.post("/logout", logoutController);

export default router;
