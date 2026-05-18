import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const validToken = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = validToken as { id: string; email: string; role: string };
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

  next();
};
