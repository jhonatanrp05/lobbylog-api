import prisma from "../lib/prisma";
import { User } from "../lib/types";

export const createUser = async (data: User) => {
  return await prisma.user.create({
    data,
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email, deletedAt: null },
  });
};

export const findAllUsers = async () => {
  return await prisma.user.findMany({
    where: { deletedAt: null },
    select: { id: true, name: true, email: true, role: true, unit: true },
  });
};

export const findUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: { id, deletedAt: null },
  });
};

export const deleteUserById = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const findAllResidents = async () => {
  return await prisma.user.findMany({
    where: { role: "RESIDENT", deletedAt: null },
    select: { id: true, name: true, unit: true },
  });
};
