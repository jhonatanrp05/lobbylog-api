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
