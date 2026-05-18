import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema, target: "body" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      res
        .status(400)
        .json({ error: result.error.issues[0].message });
      return;
    }
    req[target] = result.data;
    next();
  };
