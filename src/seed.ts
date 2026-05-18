import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@lobbylog.com" },
  });

  if (existingAdmin) {
    console.log("Seed data already exists.");
    await prisma.$disconnect();
    return;
  }

  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@lobbylog.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const receptionistPassword = await bcrypt.hash("recep123", 10);
  const receptionist = await prisma.user.create({
    data: {
      name: "Carlos Portero",
      email: "recep@lobbylog.com",
      password: receptionistPassword,
      role: "RECEPTIONIST",
    },
  });

  const resident1Password = await bcrypt.hash("res1pass", 10);
  const resident1 = await prisma.user.create({
    data: {
      name: "María García",
      email: "maria@lobbylog.com",
      password: resident1Password,
      role: "RESIDENT",
      unit: "101",
    },
  });

  const resident2Password = await bcrypt.hash("res2pass", 10);
  const resident2 = await prisma.user.create({
    data: {
      name: "Juan Pérez",
      email: "juan@lobbylog.com",
      password: resident2Password,
      role: "RESIDENT",
      unit: "202",
    },
  });

  await prisma.package.create({
    data: {
      description: "Amazon - Auriculares Bluetooth",
      status: "PENDING",
      recipientId: resident1.id,
      porterId: receptionist.id,
    },
  });

  await prisma.package.create({
    data: {
      description: "Mercado Libre - Zapatos deportivos",
      status: "DELIVERED",
      recipientId: resident1.id,
      porterId: receptionist.id,
      deliveredAt: new Date(),
    },
  });

  await prisma.package.create({
    data: {
      description: "Rappi - Caja de supermercado",
      status: "CONFIRMED",
      recipientId: resident1.id,
      porterId: receptionist.id,
      deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      confirmedAt: new Date(),
    },
  });

  await prisma.package.create({
    data: {
      description: "Shein - Ropa variada",
      status: "PENDING",
      recipientId: resident2.id,
      porterId: receptionist.id,
    },
  });

  await prisma.package.create({
    data: {
      description: "Dian - Documento oficial",
      status: "DELIVERED",
      recipientId: resident2.id,
      porterId: receptionist.id,
      deliveredAt: new Date(),
    },
  });

  console.log("Seed completed. See README.md for demo credentials.");

  await prisma.$disconnect();
}

main();
