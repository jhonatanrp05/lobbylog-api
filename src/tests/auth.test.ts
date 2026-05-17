import request from "supertest";
import app from "../app";
import { execSync } from "child_process";

beforeAll(() => {
  execSync("pnpm seed");
});

describe("Auth", () => {
  it("should return 404 when logging in with non-existent email", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "noexiste@test.com",
      password: "123456",
    });
    expect(res.status).toBe(404);
  });

  it("should return 401 when logging in with wrong password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "admin@admin.com",
      password: "wrongpassword",
    });
    expect(res.status).toBe(401);
  });

  it("should return 200 and a token when logging in with correct credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "admin@admin.com",
      password: "admin123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
