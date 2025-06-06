import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/dictionaryRoutes.js"; // Add `.js` if using ES modules

// Define Express app and port
const app = express();
const port = 3000;

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON in request bodies
app.use(express.json());

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, "../client")));

// API routes (e.g. /api/words)
app.use("/api", router);

// Fallback to index.html for unknown routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

app.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "submit.html"));
});


// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
