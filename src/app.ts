import express from "express";

export const app = express();
app.use(express.json());

const users: { email: string; password: string }[] = [];

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.status(201).json({ created: true });
});
