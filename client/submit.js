const form = document.getElementById("submit-form");
form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const wordName = document.getElementById("wordName").value.trim();
  const wordMeaning = document.getElementById("wordMeaning").value.trim();
  const wordSentence = document.getElementById("wordSentence").value.trim();

  // ✅ Edge case: check if any field is empty
  if (!wordName || !wordMeaning || !wordSentence) {
    alert("All fields are required.");
    return;
  }

  // ✅ Edge case: limit word length
  if (wordName.length > 50) {
    alert("Word name must be under 50 characters.");
    return;
  }

  if (wordMeaning.length > 200) {
    alert("Word meaning must be under 200 characters.");
    return;
  }

  if (wordSentence.length > 300) {
    alert("Example sentence must be under 300 characters.");
    return;
  }

  // ✅ Optional: prevent numeric-only words
  if (/^\d+$/.test(wordName)) {
    alert("Word name cannot be numbers only.");
    return;
  }

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordName,
        wordMeaning,
        wordSentence,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      alert(`Failed to submit: ${error}`);
      return;
    }

    //this clears the form
    form.innerHTML = "";

    //message after user hits submit
    const message = document.createElement("p");
    message.innerHTML =
      "Successfully Submitted!<br> <small>Redirecting to home...</small>";
    form.appendChild(message);

    //return to home page after submission
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (err) {
    console.error("Error submitting word:", err.message);
    alert("Something went wrong while submitting.");
  }
}
