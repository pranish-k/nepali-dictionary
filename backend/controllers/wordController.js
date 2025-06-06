// Import model and file system methods
import Words from "../models/wordDefinition.js";
import { readFile, writeFile } from "fs/promises";

// For resolving absolute file paths in ES modules
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct absolute path to the JSON data file
const dataPath = path.join(__dirname, "../data/data.json");

// GET /api/words → returns all words from data.json
export async function getWords(req, res) {
  try {
    // Read file as UTF-8 string
    const data = await readFile(dataPath, "utf-8");

    // Parse JSON string into JavaScript array
    const allWords = data ? JSON.parse(data) : [];

    // Send the data as JSON response
    res.json(allWords);
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to load file");
  }
}

// POST /api/submit → placeholder handler for now
export function addWord(req, res) {
  res.send("Hello");
}
