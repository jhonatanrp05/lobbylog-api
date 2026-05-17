import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@admin.com" },
  });
  if (existingAdmin) {
    return console.log("Admin user already exists.");
  }
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  prisma.$disconnect();
}

main();
