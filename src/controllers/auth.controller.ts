import { Request, Response } from "express";
import { login } from "../services/auth.service";
import { AppError } from "../lib/types";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
