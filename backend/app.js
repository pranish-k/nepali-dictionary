import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/dictionaryRoutes.js";
import { sequelize } from "./models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Mount API router
app.use("/api", router);

// Verify DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection error:", err));

// Sync models → tables in dev
if (process.env.NODE_ENV !== "production") {
  sequelize.sync();
}

// Serve front-end pages
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/index.html"))
);
app.get("/submit", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/submit.html"))
);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
