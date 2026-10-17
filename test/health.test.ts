import { describe, it, expect } from "vitest";
import { api } from "./utils";

describe("GET /health", () => {
  it("returns ok", async () => {
    const res = await api().get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
