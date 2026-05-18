import request from "supertest";
import app from "../app";
import { execSync } from "child_process";

beforeAll(() => {
  execSync("pnpm seed");
});

describe("Auth", () => {
  it("should return 401 when logging in with non-existent email", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "noexiste@test.com",
      password: "123456",
    });
    expect(res.status).toBe(401);
  });

  it("should return 401 when logging in with wrong password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "admin@lobbylog.com",
      password: "wrongpassword",
    });
    expect(res.status).toBe(401);
  });

  it("should return 200 and a token when logging in with correct credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "admin@lobbylog.com",
      password: "admin123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).toHaveProperty("role");
  });

  it("should return 400 when email is missing", async () => {
    const res = await request(app).post("/auth/login").send({
      password: "admin123",
    });
    expect(res.status).toBe(400);
  });

  it("should return 400 when email format is invalid", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "not-an-email",
      password: "admin123",
    });
    expect(res.status).toBe(400);
  });
});
