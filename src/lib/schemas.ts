import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format"),
  role: z.enum(["RECEPTIONIST", "RESIDENT"], {
    error: "Role must be RECEPTIONIST or RESIDENT",
  }),
  unit: z.string().optional(),
});

export const createPackageSchema = z.object({
  description: z.string().min(1, "Description is required").max(200),
  recipientId: z.string().uuid("Invalid recipient ID"),
  photoUrl: z.string().url("Invalid photo URL").optional(),
});

export const uuidParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});
