const audio = document.getElementById("myAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");

// Toggle Play/Pause
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseIcon.src = "img/pause.svg"; // Change to pause icon
    } else {
        audio.pause();
        playPauseIcon.src = "img/button-play.svg"; // Change back to play icon
    }
});

// Rewind Audio by 10 Seconds
rewindBtn.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10); // Prevent going below 0
});

// Forward Audio by 10 Seconds
forwardBtn.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); // Prevent going beyond duration
});
