const audio = document.getElementById("coverAudio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");

// Play/Pause Toggle
window.togglePlay = function () {
  if (audio.paused) {
    audio.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-flex";
  } else {
    audio.pause();
    playBtn.style.display = "inline-flex";
    pauseBtn.style.display = "none";
  }
};

// Rewind 10 seconds
window.rewind = function () {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
};

// Forward 10 seconds
window.forward = function () {
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
};

// Reset button states when audio ends
audio.addEventListener("ended", () => {
  playBtn.style.display = "inline-flex";
  pauseBtn.style.display = "none";
});
