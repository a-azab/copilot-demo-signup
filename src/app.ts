import express from "express";
import { z } from "zod";

export const app = express();
app.use(express.json());

const users: { email: string; password: string }[] = [];
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/signup", (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Invalid signup request" },
    });
  }

  const { email, password } = result.data;
  users.push({ email, password });
  res.status(201).json({ created: true });
});
