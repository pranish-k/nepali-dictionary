document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("submit-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const wordName = document.getElementById("wordName").value.trim();
    const wordMeaning = document.getElementById("wordMeaning").value.trim();
    const wordSentence = document.getElementById("wordSentence").value.trim();

    try {
      const res = await fetch("/api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wordName, wordMeaning, wordSentence }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      // optional: redirect back to home or clear form
      window.location.href = "/";
    } catch (err) {
      console.error("Failed to submit word:", err);
      alert("Error adding word. Check the console.");
    }
  });
});
