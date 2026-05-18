import prisma from "../lib/prisma";
import { Package } from "../lib/types";

export const createPackage = async (data: Package) => {
  return await prisma.package.create({ data });
};

export const findAllPackages = async () => {
  return await prisma.package.findMany({
    include: {
      recipient: { select: { name: true, unit: true } },
      porter: { select: { name: true } },
    },
  });
};

export const findPackagesByRecipient = async (recipientId: string) => {
  return await prisma.package.findMany({
    where: { recipientId },
    include: { porter: { select: { name: true } } },
  });
};

export const findPackagesByPorter = async (porterId: string) => {
  return await prisma.package.findMany({
    where: { porterId },
    include: { recipient: { select: { name: true, unit: true } } },
  });
};

export const findPackageById = async (id: string) => {
  return await prisma.package.findUnique({ where: { id } });
};

export const updatePackageStatus = async (
  id: string,
  status: string,
  dateField: { deliveredAt?: Date; confirmedAt?: Date },
) => {
  return await prisma.package.update({
    where: { id },
    data: { status, ...dateField },
  });
};
