import { sequelize, Word } from "../models/index.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/data.json");

async function seed() {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    const allWords = JSON.parse(raw);

    await sequelize.sync({ force: true });

    for (const entry of allWords) {
      await Word.create({
        wordID: entry.wordID,
        wordName: entry.wordName,
        wordMeaning: entry.wordMeaning,
        wordSentence: entry.wordSentence,
        dateCreated: entry.dateCreated,
      });
    }

    console.log("✅ Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
