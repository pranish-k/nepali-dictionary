// Import model and file system methods
import Words from "../models/wordDefinition.js";
import { readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";

// For resolving absolute file paths in ES modules
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct absolute path to the JSON data file
const dataPath = path.join(__dirname, "../data/data.json");

/*
-------------------------------------
This function gets words from the json
file and sends it to routes
--------------------------------------
*/

// GET /api/words → returns all words from data.json
export async function getWords(req, res) {
  try {
    // Read file as UTF-8 string
    const data = await readFile(dataPath, "utf-8");

    // Parse JSON string into JavaScript array
    let allWords;
    try {
      allWords = data ? JSON.parse(data) : [];
      if (!Array.isArray(allWords)) throw new Error("Invalid data format");
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      return res.status(500).json("Corrupted data format in file");
    }

    // Send the data as JSON response
    res.json(allWords);
  } catch (error) {
    console.error("File read error:", error.message);
    res.status(500).json("Failed to load file");
  }
}

/*
-------------------------------------
This function will collect words from the submittion and add it to JSON database 
--------------------------------------
*/

export async function addWord(req, res) {
  try {
    //read the file and load it into an array allWords
    const data = await readFile(dataPath, "utf-8");
    let allWords;
    try {
      allWords = data ? JSON.parse(data) : [];
      if (!Array.isArray(allWords)) throw new Error("Invalid data format");
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      return res.status(500).json("Corrupted data format in file");
    }

    //take the input from the forms and put them into the object
    const { wordName, wordMeaning, wordSentence } = req.body;

    // Check for missing fields
    if (!wordName || !wordMeaning || !wordSentence) {
      return res.status(400).json("Missing required fields");
    }

    const wordID = randomUUID(); // generates unique id
    const dateCreated = new Date().toISOString().slice(0, 10);

    const newWord = new Words(
      wordID,
      wordName,
      wordMeaning,
      wordSentence,
      dateCreated
    );

    //push the new word into the array allWords
    allWords.push(newWord.toJSON());

    //write the new updated array back to file
    await writeFile(dataPath, JSON.stringify(allWords, null, 2));

    //send success response
    res.status(201).json({ message: "Word added successfully", word: newWord });
  } catch (error) {
    console.error("Add word error:", error.message);
    res.status(500).json("Failed to add word");
  }
}
