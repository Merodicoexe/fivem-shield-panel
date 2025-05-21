import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB init
let db: any;
(async () => {
  db = await open({
    filename: "./auth.db",
    driver: sqlite3.Database
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
})();

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const existing = await db.get("SELECT * FROM users WHERE email = ?", email);
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const result = await db.run("INSERT INTO users (email, password) VALUES (?, ?)", email, password);
    const user = { id: result.lastID, email };
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  try {
    const user = await db.get("SELECT id, email FROM users WHERE email = ? AND password = ?", email, password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Auth API running on http://localhost:${PORT}`);
});
