import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import router from "./routes/dictionaryRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { sequelize } from "./models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Request logging
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Body parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiting for submissions
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 submissions per hour
  message: "Too many submissions from this IP, please try again in an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint (before rate limiting)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Apply rate limiters
app.use("/api", apiLimiter);

// Mount API routers
app.use("/api/auth", authRouter);
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
