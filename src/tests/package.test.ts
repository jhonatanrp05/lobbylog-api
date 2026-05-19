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
    update: { password: hashedPassword, deletedAt: null },
    create: {
      name: "Test Receptionist",
      email: "recep@test.com",
      password: hashedPassword,
      role: "RECEPTIONIST",
    },
  });

  await prisma.user.upsert({
    where: { email: "resid@test.com" },
    update: { password: hashedPassword, deletedAt: null },
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
      recipientId: "00000000-0000-0000-0000-000000000000",
    });
    expect(res.status).toBe(401);
  });

  it("should return 403 when a resident tries to create a package", async () => {
    const res = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${residentToken}`)
      .send({
        description: "Test package",
        recipientId: "00000000-0000-0000-0000-000000000000",
      });
    expect(res.status).toBe(403);
  });

  it("should return 400 when description is missing", async () => {
    const res = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${receptionistToken}`)
      .send({ recipientId: "00000000-0000-0000-0000-000000000000" });
    expect(res.status).toBe(400);
  });

  it("should return 400 when recipientId is not a valid UUID", async () => {
    const res = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${receptionistToken}`)
      .send({ description: "Test package", recipientId: "not-a-uuid" });
    expect(res.status).toBe(400);
  });

  it("should return 404 when creating a package for a non-existent recipient", async () => {
    const res = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${receptionistToken}`)
      .send({
        description: "Test package",
        recipientId: "00000000-0000-0000-0000-000000000000",
      });
    expect(res.status).toBe(404);
  });

  it("should return 403 when a resident tries to delete a package", async () => {
    const res = await request(app)
      .delete("/packages/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${residentToken}`);
    expect(res.status).toBe(403);
  });

  it("should return 403 when a resident tries to update a package", async () => {
    const res = await request(app)
      .patch("/packages/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${residentToken}`)
      .send({
        description: "Updated",
        recipientId: "00000000-0000-0000-0000-000000000000",
        photoUrl: null,
      });
    expect(res.status).toBe(403);
  });

  it("should return 404 when a receptionist updates a non-existent package", async () => {
    const res = await request(app)
      .patch("/packages/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${receptionistToken}`)
      .send({
        description: "Updated",
        recipientId: "00000000-0000-0000-0000-000000000000",
        photoUrl: null,
      });
    expect(res.status).toBe(404);
  });
});
