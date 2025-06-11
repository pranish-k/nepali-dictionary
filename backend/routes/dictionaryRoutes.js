import express from "express";
import {
  getWords,
  getWordById,
  addWord,
  updateWord,
  deleteWord,
} from "../controllers/wordController.js";

const router = express.Router();

router.get("/words", getWords);
router.get("/words/:id", getWordById);
router.post("/words", addWord);
router.put("/words/:id", updateWord);
router.delete("/words/:id", deleteWord);

export default router;
