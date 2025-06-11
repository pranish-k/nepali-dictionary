document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/words");
    const words = await res.json();
    const container = document.querySelector(".word-container");
    words.forEach((word) => {
      const card = document.createElement("div");
      card.classList.add("word-card");
      card.innerHTML = `
        <h2>${word.wordName}</h2>
        <p><strong>Meaning:</strong> ${word.wordMeaning}</p>
        <p><em>${word.wordSentence}</em></p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load words:", err);
  }
});
