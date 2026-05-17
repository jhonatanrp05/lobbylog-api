import prisma from "../lib/prisma";
import { User } from "../lib/types";

export const createUser = async (data: User) => {
  return await prisma.user.create({
    data,
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const findAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, unit: true },
  });
};

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: id },
  });
};

export const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: { id: id },
  });
};
