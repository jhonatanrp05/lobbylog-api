import {
  findUserByEmail,
  createUser as createUserInDB,
  deleteUserById,
  updateUserById,
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

export const updateUser = async (id: string, data: CreateUserInput) => {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.role === "ADMIN") {
    throw new AppError("Admin users cannot be edited", 403);
  }
  if (data.email !== user.email) {
    const existing = await findUserByEmail(data.email);
    if (existing) {
      throw new AppError("A user with this email already exists", 409);
    }
  }
  return await updateUserById(id, data);
};

export const deleteUser = async (id: string) => {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.role === "ADMIN") {
    throw new AppError("Admin users cannot be deleted", 403);
  }
  return await deleteUserById(user.id);
};

export const getAllUsers = async () => {
  return await findAllUsers();
};

export const getResidents = async () => {
  return await findAllResidents();
};
