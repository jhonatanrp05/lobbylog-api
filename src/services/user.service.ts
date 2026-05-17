import {
  findUserByEmail,
  createUser as createUserInDB,
} from "../repositories/user.repository";
import { CreateUserInput, AppError } from "../lib/types";
import bcrypt from "bcryptjs";

export const createUser = async (data: CreateUserInput) => {
  if (await findUserByEmail(data.email)) {
    throw new AppError("User already exists", 409);
  }

  const password = Math.random().toString(36).slice(-8);
  const passwordhash = await bcrypt.hash(password, 10);

  const user = await createUserInDB({
    name: data.name,
    email: data.email,
    password: passwordhash,
    role: data.role,
    unit: data.unit,
  });

  return { email: user.email, password };
};
