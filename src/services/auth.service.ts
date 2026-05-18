import { findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { AppError } from "../lib/types";
import jwt from "jsonwebtoken";

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  const isPasswordValid =
    user !== null && (await bcrypt.compare(password, user.password));
  if (!user || !isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
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
