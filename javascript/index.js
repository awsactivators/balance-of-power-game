// HOME PAGE: Enter chpater code

// Get references to input and error message elements on the home page
const chapterInput = document.getElementById("chapterInput");
const errorSpan = document.getElementById("chapterError");

// Function to validate the chapter code entered by the player
function validateChapter() {
  const chapterCode = chapterInput.value.trim();
  const chapter = gameData.chapters[chapterCode];

  // If the input is empty
  if (chapterCode === "") {
    errorSpan.textContent = "Kindly input a code.";
    return;
  }

  if (chapter) {
    // If Chapter 3 is selected, check if Chapters 1 and 2 are solved
    if (chapterCode === "3000") {
      const solved1 = sessionStorage.getItem("solved_1000") === "true";
      const solved2 = sessionStorage.getItem("solved_2000") === "true";

      if (!solved1 || !solved2) {
        errorSpan.textContent = "You must solve Chapter 1 and Chapter 2 first.";
        return;
      }
    }

    // If valid and passed, store in session and proceed
    sessionStorage.setItem("currentChapter", chapterCode);
    window.location.href = "solve-chapter.html";
  } else {
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
    window.location.href = "solution.html";
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
  
    // Save to sessionStorage for result page
    sessionStorage.setItem("lastAttempt", JSON.stringify(inputCodes));
  
    // Check for empty inputs
    if (inputCodes.some(code => code === "")) {
      feedback.textContent = "Please provide all three card codes.";
      return;
    }
  
    // Validate codes against gameData.cards
    const validInputCards = inputCodes.map(code => gameData.cards[code] || null);
    const totalValid = validInputCards.filter(Boolean).length;
  
    if (totalValid === 0) {
      feedback.textContent = "None of the codes are valid card codes.";
      return;
    } else if (totalValid < 3) {
      feedback.textContent = "Some of the codes are not valid card codes.";
      return;
    }
  
    // Check how many belong to the current chapter
    const validForChapter = validInputCards.filter(card => card.chapter === chapterCode);
  
    if (validForChapter.length < 3) {
      if (validForChapter.length === 0) {
        feedback.textContent = "None of the cards belong to this chapter.";
      } else {
        feedback.textContent = "Some of the cards do not belong to this chapter.";
      }
      return;
    }
  
    // Check for duplicates
    const uniqueCodes = new Set(inputCodes);
    if (uniqueCodes.size < inputCodes.length) {
      feedback.textContent = "Duplicate code entered. Each card code must be unique.";
      return;
    }
  
    // Check if order is correct
    const isCorrectOrder = chapter.cards.every((code, index) => code === inputCodes[index]);
  
    if (isCorrectOrder) {
      sessionStorage.setItem(`solved_${chapterCode}`, "true");
      sessionStorage.setItem(`chapterAudio_${chapterCode}`, chapter.audio);
      window.location.href = "chapter-audio.html";
    } else {
      feedback.textContent = "All cards belong to this chapter, but not in the correct order.";
    }
  };
}



// FULL CHAPTER AUDIO PAGE

const audioEl = document.getElementById("chapterAudio");
const audioGrid = document.getElementById("cardGrid");

if (audioEl && audioGrid) {
  const chapterCodeAudio = sessionStorage.getItem("currentChapter");
  const chapterAudio = gameData.chapters[chapterCodeAudio];

  if (!chapterAudio) {
    window.location.href = "solution.html";
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

  // Logic for audio progress bar!

  // Logic to go back to home or proceed to final story
  window.handleContinue = function () {
    const solvedChapters = ["1000", "2000", "3000"].filter(chap =>
      sessionStorage.getItem(`solved_${chap}`) === "true"
    );

    if (solvedChapters.length === 3) {
      window.location.href = "solve-story.html";
    } else {
      window.location.href = "home.html";
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

    // Disable all input fields
    document.getElementById("story1").disabled = true;
    document.getElementById("story2").disabled = true;
    document.getElementById("story3").disabled = true;

    // Disable solve button
    const solveBtn = document.getElementById("solve-story");
    const solveChapterBtn = document.getElementById("solve-chp-btn");
    if (solveBtn) {
      solveBtn.disabled = true;
      solveBtn.style.cursor = "not-allowed";
      solveBtn.style.opacity = "0.5";
      solveChapterBtn.style.display = "block";
    } 
  }

  // Function to validate chapter codes for solving full story
  window.solveStory = function () {
    const codes = [
      document.getElementById("story1").value.trim(),
      document.getElementById("story2").value.trim(),
      document.getElementById("story3").value.trim()
    ];
  
    const feedback = document.getElementById("storyFeedback");
  
    // Check for empty input
    if (codes.some(code => code === "")) {
      feedback.textContent = "Please enter all three chapter codes.";
      return;
    }
  
    // Validate if chapter exist
    const validChapters = codes.map(code => gameData.chapters[code] || null);
    const totalValid = validChapters.filter(Boolean).length;
  
    if (totalValid === 0) {
      feedback.textContent = "None of the codes are valid chapter codes.";
      return;
    } else if (totalValid < 3) {
      feedback.textContent = "Some of the codes are not valid chapter codes.";
      return;
    }
  
    // Check for duplicates
    const uniqueCodes = new Set(codes);
    if (uniqueCodes.size < codes.length) {
      feedback.textContent = "Duplicate code entered. Each chapter code must be unique.";
      return;
    }
  
    // Check for correct chapter set
    const requiredOrder = ["1000", "2000", "3000"];
    const allChaptersIncluded = requiredOrder.every(ch => codes.includes(ch));
  
    if (codes.join() === requiredOrder.join()) {
      // Correct order, save and redirect
      sessionStorage.setItem("storySolved", "true");
      sessionStorage.setItem("storyChapters", JSON.stringify(codes));
      window.location.href = "story-audio.html";
    } else if (allChaptersIncluded) {
      feedback.textContent = "The chapter codes are valid but not in the correct order.";
    } else {
      feedback.textContent = "The chapter codes entered do not match the required chapters.";
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
    window.location.href = "solution.html";
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

  mysterySolved.textContent = "Balance of Power"

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
  // Logic for audio progress bar

  // Restart game
  window.restartGame = function () {
    sessionStorage.clear();
    window.location.href = "home.html";
  };
}
