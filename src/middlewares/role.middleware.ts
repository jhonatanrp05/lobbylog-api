import { Response, Request, NextFunction } from "express";

export const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
};
