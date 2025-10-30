import express from "express";
import rateLimit from "express-rate-limit";
import {
  getWords,
  getWordById,
  addWord,
  updateWord,
  deleteWord,
} from "../controllers/wordController.js";
import {
  wordValidationRules,
  validate,
  sanitizeInput,
} from "../middleware/validation.js";

const router = express.Router();

// Strict rate limiting for submissions
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 submissions per hour
  message: "Too many submissions from this IP, please try again in an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/words", getWords);
router.get("/words/:id", getWordById);
router.post("/words", submitLimiter, sanitizeInput, wordValidationRules, validate, addWord);
router.put("/words/:id", sanitizeInput, wordValidationRules, validate, updateWord);
router.delete("/words/:id", deleteWord);

export default router;
