class Words {
  //the properties of the Word
  constructor(wordID, wordName, wordMeaning, wordSentence) {
    this.wordID = wordID; //unique id assigned
    this.wordName = wordName;
    this.wordMeaning = wordMeaning;
    this.wordSentence = wordSentence;
    this.dateCreated = this.dateCreated;
  }

  addDate() {
    this.dateCreated = new Date().toDateString();
  }

  generateID() {
    wordId = crypto.randomUUID();
  }

  toJSON() {
    return {
      wordID: this.wordID, //unique id assigned
      wordName: this.wordName,
      wordMeaning: this.wordMeaning,
      wordSentence: this.wordSentence,
      dateCreated: this.dateCreated,
    };
  }
}

export default Words;