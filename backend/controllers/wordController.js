import { Word } from "../models/index.js";

export async function getWords(req, res) {
  try {
    const words = await Word.findAll();
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
    const { wordID, wordName, wordMeaning, wordSentence } = req.body;
    const newWord = await Word.create({
      wordID,
      wordName,
      wordMeaning,
      wordSentence,
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
