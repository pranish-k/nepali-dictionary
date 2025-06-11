import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"),
  logging: false,
});

const Word = sequelize.define(
  "Word",
  {
    wordID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    wordName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wordMeaning: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    wordSentence: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "words",
    timestamps: false,
  }
);

export { sequelize, Word };
