import {
  createPackage as createPackageInDB,
  findAllPackages,
  findPackagesByRecipient,
  findPackageById,
  updatePackageStatus,
  updatePackageDetails,
  findPackagesByPorter,
  deletePackageById,
} from "../repositories/package.repository";
import { findUserById } from "../repositories/user.repository";
import { AppError, Package } from "../lib/types";

export const createPackage = async (data: Package) => {
  const recipient = await findUserById(data.recipientId);
  if (!recipient) throw new AppError("Recipient not found", 404);
  return await createPackageInDB(data);
};

export const updatePackage = async (
  id: string,
  actorId: string,
  actorRole: string,
  data: { description: string; recipientId: string; photoUrl: string | null },
) => {
  const pkg = await findPackageById(id);
  if (!pkg) throw new AppError("Package not found", 404);
  if (actorRole !== "ADMIN") {
    if (pkg.porterId !== actorId)
      throw new AppError("This package does not belong to you", 403);
    if (pkg.status !== "PENDING")
      throw new AppError("Only pending packages can be edited", 400);
  }
  const recipient = await findUserById(data.recipientId);
  if (!recipient) throw new AppError("Recipient not found", 404);
  return await updatePackageDetails(id, data);
};

export const deletePackage = async (id: string) => {
  const pkg = await findPackageById(id);
  if (!pkg) throw new AppError("Package not found", 404);
  return await deletePackageById(id);
};

export const getAllPackages = async () => {
  return await findAllPackages();
};

export const getMyPackages = async (recipientId: string) => {
  return await findPackagesByRecipient(recipientId);
};

export const getMyLoggedPackages = async (porterId: string) => {
  return await findPackagesByPorter(porterId);
};

export const deliverPackage = async (id: string) => {
  const pkg = await findPackageById(id);
  if (!pkg) throw new AppError("Package not found", 404);
  if (pkg.status !== "PENDING")
    throw new AppError("Package is not pending", 400);
  return await updatePackageStatus(id, "DELIVERED", {
    deliveredAt: new Date(),
  });
};

export const confirmPackage = async (id: string, userId: string) => {
  const pkg = await findPackageById(id);
  if (!pkg) throw new AppError("Package not found", 404);
  if (pkg.status !== "DELIVERED")
    throw new AppError("Package is not delivered yet", 400);
  if (pkg.recipientId !== userId)
    throw new AppError("This package does not belong to you", 403);
  return await updatePackageStatus(id, "CONFIRMED", {
    confirmedAt: new Date(),
  });
};
