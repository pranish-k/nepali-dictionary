import { Word } from "../models/index.js";

export async function getWords(req, res) {
  try {
    // Only return approved words by default
    const words = await Word.findAll({
      where: { status: "approved" },
      order: [["dateCreated", "DESC"]],
    });
    res.json(words);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Failed to fetch words" });
  }
}

export async function getWordById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const word = await Word.findOne({ where: { wordID: id } });
    if (!word) return res.status(404).json({ message: "Word not found" });
    res.json(word);
  } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ message: "Failed to fetch word" });
  }
}

export async function addWord(req, res) {
  try {
    const { wordName, wordMeaning, wordSentence, status } = req.body;
    const newWord = await Word.create({
      wordName,
      wordMeaning,
      wordSentence,
      status: status || "pending", // Default to pending for user submissions
      dateCreated: new Date(),
    });
    res.status(201).json(newWord);
  } catch (err) {
    console.error("Add error:", err);
    res.status(500).json({ message: "Failed to add word" });
  }
}

export async function updateWord(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const [updatedCount] = await Word.update(req.body, {
      where: { wordID: id },
    });
    if (!updatedCount)
      return res.status(404).json({ message: "Word not found" });
    const updated = await Word.findOne({ where: { wordID: id } });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update word" });
  }
}

export async function deleteWord(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await Word.destroy({ where: { wordID: id } });
    if (!deletedCount)
      return res.status(404).json({ message: "Word not found" });
    res.status(204).end();
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete word" });
  }
}

// Admin-only: Get all pending words
export async function getPendingWords(req, res) {
  try {
    const words = await Word.findAll({
      where: { status: "pending" },
      order: [["dateCreated", "DESC"]],
    });
    res.json(words);
  } catch (err) {
    console.error("Fetch pending words error:", err);
    res.status(500).json({ message: "Failed to fetch pending words" });
  }
}

// Admin-only: Approve a word
export async function approveWord(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const [updatedCount] = await Word.update(
      { status: "approved" },
      { where: { wordID: id } }
    );
    if (!updatedCount)
      return res.status(404).json({ message: "Word not found" });
    const updated = await Word.findOne({ where: { wordID: id } });
    res.json({ message: "Word approved", word: updated });
  } catch (err) {
    console.error("Approve error:", err);
    res.status(500).json({ message: "Failed to approve word" });
  }
}

// Admin-only: Reject a word
export async function rejectWord(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const [updatedCount] = await Word.update(
      { status: "rejected" },
      { where: { wordID: id } }
    );
    if (!updatedCount)
      return res.status(404).json({ message: "Word not found" });
    res.json({ message: "Word rejected" });
  } catch (err) {
    console.error("Reject error:", err);
    res.status(500).json({ message: "Failed to reject word" });
  }
}

// Get a random approved word
export async function getRandomWord(req, res) {
  try {
    const words = await Word.findAll({
      where: { status: "approved" },
    });
    if (words.length === 0) {
      return res.status(404).json({ message: "No words found" });
    }
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.json(randomWord);
  } catch (err) {
    console.error("Random word error:", err);
    res.status(500).json({ message: "Failed to fetch random word" });
  }
}
