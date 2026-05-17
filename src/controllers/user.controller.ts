import { Request, Response } from "express";
import { CreateUserInput, AppError } from "../lib/types";
import { createUser } from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const data: CreateUserInput = req.body;
  try {
    const result = await createUser(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};
