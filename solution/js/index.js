// HOME PAGE: Enter chpater code

// Get references to input and error message elements on the home page
const chapterInput = document.getElementById("chapterInput");
const errorSpan = document.getElementById("chapterError");

// Function to validate the chapter code entered by the player
function validateChapter() {
  const chapterCode = chapterInput.value.trim(); 
  const chapter = gameData.chapters[chapterCode]; 

  if (chapter) {
    // If the chapter exists, store it in session and move to solve page
    sessionStorage.setItem("currentChapter", chapterCode);
    window.location.href = "solve-chapter.html";
  } else {
    // Show error if the code is invalid
    errorSpan.textContent = "Invalid chapter code. Try again.";
  }
}

// Make the validateChapter function available globally on the home page
if (chapterInput && errorSpan) {
  window.validateChapter = validateChapter;
}





// SOLVE CHAPTER PAGE

// Check if we're on the solve chapter page by detecting the first card input
const solveButton = document.getElementById("card1");
if (solveButton) {
  const chapterCode = sessionStorage.getItem("currentChapter");
  const chapter = gameData.chapters[chapterCode];
  const feedback = document.getElementById("feedback");

  if (!chapter) {
    // If no valid chapter is found, redirect to home
    window.location.href = "index.html";
  } else {
    // Update page title and load the chapter's image
    const titleEl = document.getElementById("chapterTitle");
    const chapterCodeAudio = sessionStorage.getItem("currentChapter");
    const chapterAudio = gameData.chapters[chapterCodeAudio];

    if (titleEl) {
      titleEl.textContent = `Solve: ${chapter.title} - ${chapterAudio.name}`;
    }

    const imageContainer = document.getElementById("chapterImageContainer");
    if (imageContainer) {
      const img = document.createElement("img");
      img.src = chapter.image;
      img.alt = chapter.title;
      img.className = "img-rounded";
      imageContainer.appendChild(img);
    }
  }

  // Function to validate the player's card input for solving the chapter
  window.solveChapter = function () {
    const inputCodes = [
      document.getElementById("card1").value.trim(),
      document.getElementById("card2").value.trim(),
      document.getElementById("card3").value.trim()
    ];

    // Filter cards that belong to this chapter
    const validCards = inputCodes.filter(code => {
      const card = gameData.cards[code];
      return card && card.chapter === chapterCode;
    });

    sessionStorage.setItem("lastAttempt", JSON.stringify(inputCodes));

    if (validCards.length === 0) {
      feedback.textContent = "None of the cards belong to this chapter.";
    } else if (validCards.length < 3) {
      feedback.textContent = `Only ${validCards.length} card(s) belong to this chapter. Try again.`;
    } else {
      // Check if the cards are in the correct order
      const isCorrectOrder = chapter.cards.every((code, index) => code === inputCodes[index]);
      if (isCorrectOrder) {
        sessionStorage.setItem(`solved_${chapterCode}`, "true");
        sessionStorage.setItem(`chapterAudio_${chapterCode}`, chapter.audio);
        window.location.href = "full-audio.html";
      } else {
        feedback.textContent = "All cards belong to the chapter, but the order is incorrect.";
      }
    }
  };
}





// CHAPTER RESULT PAGE

const resultContainer = document.getElementById("resultCards");
if (resultContainer) {
  const chapterCodeResult = sessionStorage.getItem("currentChapter");
  const chapterResult = gameData.chapters[chapterCodeResult];
  const resultCards = JSON.parse(sessionStorage.getItem("lastAttempt")) || [];

  // Update the result page title
  if (document.getElementById("resultTitle")) {
    document.getElementById("resultTitle").textContent = chapterResult?.title || "CHAPTER";
  }

  let correctCount = 0;

  // Display card attempts and count how many are correct
  resultCards.forEach(code => {
    const card = document.createElement("div");
    card.className = "card";

    if (gameData.cards[code] && gameData.cards[code].chapter === chapterCodeResult) {
      card.style.border = "2px solid #FF7C4C";
      correctCount++;
    }

    card.textContent = code || "----";
    resultContainer.appendChild(card);
  });

  // Show result message based on how many cards matched
  const resultText = document.getElementById("resultMessage");
  if (correctCount === 0) {
    resultText.textContent = "None of the cards belong to this chapter. Try again.";
  } else if (correctCount < 3) {
    resultText.textContent = `You got ${correctCount} clue${correctCount > 1 ? "s" : ""} right. Try again.`;
  } else {
    resultText.textContent = "All cards belong to the chapter, but the order is incorrect.";
  }
}



// FULL CHAPTER AUDIO PAGE

const audioEl = document.getElementById("chapterAudio");
const audioGrid = document.getElementById("cardGrid");

if (audioEl && audioGrid) {
  const chapterCodeAudio = sessionStorage.getItem("currentChapter");
  const chapterAudio = gameData.chapters[chapterCodeAudio];

  if (!chapterAudio) {
    window.location.href = "index.html";
  }

  // Set title and image
  const audioTitle = document.getElementById("audioTitle");
  if (audioTitle) {
    audioTitle.textContent = `Full Audio - ${chapterAudio.title}: ${chapterAudio.name}`;
  }

  const imageContainer = document.getElementById("chapterImageContainer");
  if (imageContainer) {
    const img = document.createElement("img");
    img.src = chapterAudio.image;
    img.alt = chapterAudio.title;
    img.className = "card-img";
    imageContainer.appendChild(img);
  }

  // Load chapter audio
  audioEl.src = chapterAudio.audio;

  // Display all card codes for that chapter
  chapterAudio.cards.forEach(code => {
    const card = document.createElement("div");
    const cardData = gameData.cards[code];
    const img = document.createElement("img");

    card.className = "card";

    img.src = cardData.image;
    img.alt = `Card ${code}`;
    img.className = "card-img";

    card.appendChild(img);
    audioGrid.appendChild(card);
  });

  // Play/pause, rewind, forward functionality
  window.togglePlay = function () {
    const play = document.getElementById("play");
    const pause = document.getElementById("pause");
    if (audioEl.paused) {
      play.style.display = "none";
      pause.style.display = "block";
      audioEl.play();
    } else {
      play.style.display = "block";
      pause.style.display = "none";
      audioEl.pause();
    } 
  };

  window.rewind = function () {
    audioEl.currentTime = Math.max(0, audioEl.currentTime - 10);
  };

  window.forward = function () {
    audioEl.currentTime = Math.min(audioEl.duration, audioEl.currentTime + 10);
  };

  // Logic to go back to home or proceed to final story
  window.handleContinue = function () {
    const solvedChapters = ["1000", "2000", "3000"].filter(chap =>
      sessionStorage.getItem(`solved_${chap}`) === "true"
    );

    if (solvedChapters.length === 3) {
      window.location.href = "solve-full.html";
    } else {
      window.location.href = "index.html";
    }
  };
}





// SOLVE FULL STORY PAGE

const storyInput = document.getElementById("story1");
if (storyInput) {
  const feedback = document.getElementById("storyFeedback");

  const solvedAllChapters = () =>
    ["1000", "2000", "3000"].every(ch => sessionStorage.getItem(`solved_${ch}`) === "true");

  if (!solvedAllChapters()) {
    feedback.textContent = "You must solve all 3 chapters before unlocking the full story.";
  }

  // Function to validate chapter codes for solving full story
  window.solveStory = function () {
    const codes = [
      document.getElementById("story1").value.trim(),
      document.getElementById("story2").value.trim(),
      document.getElementById("story3").value.trim()
    ];
  
    const feedback = document.getElementById("storyFeedback");
  
    if (codes.some(code => code === "")) {
      feedback.textContent = "Please enter all three chapter codes.";
      return;
    }
  
    const chaptersExist = codes.every(code => gameData.chapters[code]);
    if (!chaptersExist) {
      feedback.textContent = "One or more chapter codes are invalid.";
      return;
    }
  
    const correctOrder = ["1000", "2000", "3000"];
  
    if (codes.join() === correctOrder.join()) {
      // Store chapter codes using correct key
      sessionStorage.setItem("storySolved", "true");
      sessionStorage.setItem("storyChapters", JSON.stringify(codes));
      window.location.href = "final-success.html";
    } else if (correctOrder.every(ch => codes.includes(ch))) {
      feedback.textContent = "The chapter codes are valid but not in the correct order.";
    } else {
      feedback.textContent = "The chapter codes entered do not match the expected ones.";
    }
  };
  
}





// FINAL SUCCESS PAGE

const finalAudio = document.getElementById("finalAudio");
const finalCardsContainer = document.getElementById("finalCards");
const mysterySolved = document.getElementById("mysterySolved");

if (finalAudio && finalCardsContainer) {
  const finalChapters = JSON.parse(sessionStorage.getItem("storyChapters"));

  if (!finalChapters || finalChapters.length !== 3) {
    window.location.href = "index.html";
  }

  // Show each chapter's image and name
  finalChapters.forEach(code => {
    const chapter = gameData.chapters[code];
    if (!chapter) return;
  
    const wrapper = document.createElement("div");
    wrapper.className = "card";
  
    const img = document.createElement("img");
    img.src = chapter.image;
    img.alt = chapter.title;
    img.className = "img-rounded";
  
    const label = document.createElement("p");
    label.textContent = `${chapter.title}: ${chapter.name}`;
    label.className = "label-bold";
  
    wrapper.appendChild(img);
    wrapper.appendChild(label);
    finalCardsContainer.appendChild(wrapper);
  });  

  mysterySolved.textContent = "Mystery Solved!! Balance of Power"

  // Load the combined final audio file
  finalAudio.src = gameData.finalAudio;

  // Playback controls
  window.togglePlay = function () {
    const play = document.getElementById("play");
    const pause = document.getElementById("pause");
    if (finalAudio.paused){
      play.style.display = "none";
      pause.style.display = "block";
      finalAudio.play();
    } else {
      play.style.display = "block";
      pause.style.display = "none";
      finalAudio.pause();
    } 
  };

  window.rewind = function () {
    finalAudio.currentTime = Math.max(0, finalAudio.currentTime - 10);
  };

  window.forward = function () {
    finalAudio.currentTime = Math.min(finalAudio.duration, finalAudio.currentTime + 10);
  };

  // Restart game
  window.restartGame = function () {
    sessionStorage.clear();
    window.location.href = "index.html";
  };
}
