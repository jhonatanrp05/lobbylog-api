import { Request, Response } from "express";
import { CreateUserInput, AppError } from "../lib/types";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getResidents,
} from "../services/user.service";

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

export const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data: CreateUserInput = req.body;
  try {
    const result = await updateUser(id, data);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    await deleteUser(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const getResidentsController = async (req: Request, res: Response) => {
  try {
    const residents = await getResidents();
    res.status(200).json(residents);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};
