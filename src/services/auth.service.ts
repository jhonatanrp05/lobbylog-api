import { findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { AppError } from "../lib/types";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("User with this email not found", 404);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid password", 401);
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "24h",
    },
  );
  return {
    token,
    user: { id: user.id, email: user.email, role: user.role },
  };
};
