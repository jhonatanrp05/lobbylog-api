import { login } from "../services/auth.service";
import { AppError } from "../lib/types";
import { Request, Response } from "express";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
