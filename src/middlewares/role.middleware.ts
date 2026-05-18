import { Response, Request, NextFunction } from "express";

export const roleMiddleware = (requiredRole: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const allowed = Array.isArray(requiredRole)
      ? requiredRole.includes(req.user.role)
      : req.user.role === requiredRole;
    if (!allowed) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
};
