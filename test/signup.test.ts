import { describe, it, expect } from "vitest";
import { api } from "./utils";

describe("POST /signup", () => {
  it("creates an account for a valid request", async () => {
    const res = await api()
      .post("/signup")
      .send({ email: "user@example.com", password: "password123" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ created: true });
  });

  it("rejects a missing email", async () => {
    const res = await api()
      .post("/signup")
      .send({ password: "password123" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: { code: "VALIDATION_ERROR", message: "Invalid signup request" },
    });
  });

  it("rejects a malformed email", async () => {
    const res = await api()
      .post("/signup")
      .send({ email: "not-an-email", password: "password123" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: { code: "VALIDATION_ERROR", message: "Invalid signup request" },
    });
  });

  it("rejects a password shorter than 8 characters", async () => {
    const res = await api()
      .post("/signup")
      .send({ email: "user@example.com", password: "short" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: { code: "VALIDATION_ERROR", message: "Invalid signup request" },
    });
  });
});
