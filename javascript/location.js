// Get the query parameter (?1000)
const query = new URLSearchParams(window.location.search);
const code = query.toString(); 

// Create audio element
const audioEl = new Audio();

// Load the correct data
if (gameData.chapters[code]) {
  const chapter = gameData.chapters[code];
  displayCard(chapter.image);
  audioEl.src = chapter.audio;
} else if (gameData.cards[code]) {
  const card = gameData.cards[code];
  displayCard(card.image);
  audioEl.src = card.audio;
} else {
  document.getElementById("outPut").innerHTML = "No match found for this code.";
}

// Helper to show image dynamically
function displayCard(imgSrc) {
  const container = document.createElement("div");
  container.className = "card";
  container.innerHTML = `
    <img src="${imgSrc}" width="200">
    <div class="audio-controls">
      <button onclick="rewind()" class="control-btns"><i class="fa-solid fa-rotate-left"></i>10</button>
      <button onclick="togglePlay()" id="play" class="control-btns play-pause"><i class="fa-solid fa-play"></i></button>
      <button onclick="togglePlay()" style="display: none;" id="pause" class="control-btns play-pause"><i class="fa-solid fa-pause"></i></button>
      <button onclick="forward()" class="control-btns"><i class="fa-solid fa-rotate-right"></i>10</button>
    </div>
  `;
  document.body.appendChild(container);
}

// Audio controls
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
