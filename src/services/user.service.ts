import {
  findUserByEmail,
  createUser as createUserInDB,
  deleteUserById,
  findAllUsers,
  findAllResidents,
  findUserById,
} from "../repositories/user.repository";
import { CreateUserInput, AppError } from "../lib/types";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export const createUser = async (data: CreateUserInput) => {
  if (await findUserByEmail(data.email)) {
    throw new AppError("User already exists", 409);
  }

  const password = randomBytes(6).toString("base64url");
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

export const deleteUser = async (id: string) => {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return await deleteUserById(user.id);
};

export const getAllUsers = async () => {
  return await findAllUsers();
};

export const getResidents = async () => {
  return await findAllResidents();
};
