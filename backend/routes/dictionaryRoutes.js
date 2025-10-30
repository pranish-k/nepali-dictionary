import express from "express";
import rateLimit from "express-rate-limit";
import {
  getWords,
  getWordById,
  addWord,
  updateWord,
  deleteWord,
  getPendingWords,
  approveWord,
  rejectWord,
  getRandomWord,
} from "../controllers/wordController.js";
import {
  wordValidationRules,
  validate,
  sanitizeInput,
} from "../middleware/validation.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Strict rate limiting for submissions
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 submissions per hour
  message: "Too many submissions from this IP, please try again in an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.get("/words", getWords);
router.get("/words/random", getRandomWord);
router.get("/words/:id", getWordById);
router.post("/words", submitLimiter, sanitizeInput, wordValidationRules, validate, addWord);

// Admin-only routes (protected)
router.get("/words/pending/all", authenticateToken, requireAdmin, getPendingWords);
router.post("/words/:id/approve", authenticateToken, requireAdmin, approveWord);
router.post("/words/:id/reject", authenticateToken, requireAdmin, rejectWord);
router.put("/words/:id", authenticateToken, requireAdmin, sanitizeInput, wordValidationRules, validate, updateWord);
router.delete("/words/:id", authenticateToken, requireAdmin, deleteWord);

export default router;
