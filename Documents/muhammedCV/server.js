import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Simulate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Initialize Express app
const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Correct static path for ES Modules
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("splash");
});

app.get("/home", (req, res) => {
  res.render("home");
});

// Start server
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});

