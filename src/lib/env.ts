import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  CLIENT_URL: z.string().url().optional(),
  PORT: z.string().optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables:");
  console.error(result.error.format());
  process.exit(1);
}

export const env = result.data;
