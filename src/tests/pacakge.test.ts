import "dotenv/config";
import request from "supertest";
import app from "../app";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

let receptionistToken: string;
let residentToken: string;

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("test123", 10);

  await prisma.user.upsert({
    where: { email: "recep@test.com" },
    update: { password: hashedPassword },
    create: {
      name: "Test Receptionist",
      email: "recep@test.com",
      password: hashedPassword,
      role: "RECEPTIONIST",
    },
  });

  await prisma.user.upsert({
    where: { email: "resid@test.com" },
    update: { password: hashedPassword },
    create: {
      name: "Test Resident",
      email: "resid@test.com",
      password: hashedPassword,
      role: "RESIDENT",
    },
  });

  const recepLogin = await request(app).post("/auth/login").send({
    email: "recep@test.com",
    password: "test123",
  });
  receptionistToken = recepLogin.body.token;

  const residLogin = await request(app).post("/auth/login").send({
    email: "resid@test.com",
    password: "test123",
  });
  residentToken = residLogin.body.token;
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: ["recep@test.com", "resid@test.com"] } },
  });
  await prisma.$disconnect();
});

describe("Packages", () => {
  it("should return 401 when creating a package without token", async () => {
    const res = await request(app).post("/packages").send({
      description: "Test package",
      recipientId: "any-id",
    });
    expect(res.status).toBe(401);
  });

  it("should return 403 when a resident tries to create a package", async () => {
    const res = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${residentToken}`)
      .send({ description: "Test package", recipientId: "any-id" });
    expect(res.status).toBe(403);
  });
});
