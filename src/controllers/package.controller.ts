// src/controllers/package.controller.ts
import { Request, Response } from "express";
import { AppError, Package } from "../lib/types";
import {
  createPackage,
  getAllPackages,
  getMyPackages,
  deliverPackage,
  confirmPackage,
} from "../services/package.service";

export const createPackageController = async (req: Request, res: Response) => {
  try {
    const { description, photoUrl, recipientId } = req.body;
    const porterId = req.user!.id;
    const result = await createPackage({
      description,
      photoUrl,
      recipientId,
      porterId,
    });
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

export const getAllPackagesController = async (req: Request, res: Response) => {
  try {
    const packages = await getAllPackages();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const getMyPackagesController = async (req: Request, res: Response) => {
  try {
    const recipientId = req.user!.id;
    const packages = await getMyPackages(recipientId);
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const deliverPackageController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await deliverPackage(id);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

export const confirmPackageController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user!.id;
    const result = await confirmPackage(id, userId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};
