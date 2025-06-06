import express from "express";
import { getWords, addWord } from "../controllers/wordController.js";
const router = express.Router();

router.get("/words", getWords); //getWords here takes (req,res) when put ina function like this
router.post("/submit", addWord);

export default router;
