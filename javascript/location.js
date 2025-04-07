// Get the query parameter (?1000)
const searchString = window.location.search;
const code = searchString.startsWith("?") ? searchString.substring(1) : searchString; 


// Create audio element
const audioEl = new Audio();

function displayCard(imgSrc, title) {
  // Clear the page
  document.body.innerHTML = '';

  // Create wrapper for h1 and card
  const wrapper = document.createElement("div");
  wrapper.className = "card-wrapper";

  // Create and set h1
  const h1 = document.createElement("h1");
  h1.innerText = title;
  h1.id = "card-name";

  // Create card container
  const container = document.createElement("div");
  container.className = "card-container";
  container.innerHTML = `
    <img src="${imgSrc}" alt="${title}" class="card-image" />
    <div class="audio-controls">
      <button onclick="rewind()" class="control-btns"><i class="fa-solid fa-rotate-left"></i>10</button>
      <button onclick="togglePlay()" id="play" class="control-btns play-pause"><i class="fa-solid fa-play"></i></button>
      <button onclick="togglePlay()" style="display: none;" id="pause" class="control-btns play-pause"><i class="fa-solid fa-pause"></i></button>
      <button onclick="forward()" class="control-btns"><i class="fa-solid fa-rotate-right"></i>10</button>
    </div>
  `;

	// Scan Another Card button
  const scanAgainBtn = document.createElement("button");
  scanAgainBtn.className = "btn rescan-btn";
  scanAgainBtn.innerText = "Scan Another Card";
  scanAgainBtn.onclick = function () {
		document.body.innerHTML = ''; 
	
		// scanner div
		const scannerDiv = document.createElement("div");
		scannerDiv.id = "scanner";
		document.body.appendChild(scannerDiv);

		// Close button
		const closeBtn = document.createElement("button");
		closeBtn.id = "closeAnotherScanner";
		closeBtn.innerText = "Close";
		closeBtn.onclick = () => {
			window.location.href = "home.html"; 
		};
		document.body.appendChild(closeBtn);
	
		// load the html5-qrcode script 
		if (typeof Html5Qrcode === "undefined") {
			const script = document.createElement("script");
			script.src = "https://unpkg.com/html5-qrcode"; 
			script.onload = () => showScanner(); 
			document.body.appendChild(script);
		} else {
			showScanner(); 
		}
	};

	const homeBtn = document.createElement("button");
	homeBtn.className = "btn home-btn";
	homeBtn.innerText = "Home";
	homeBtn.onclick = function () {
		window.location.href = "home.html"; 
	};
	

	wrapper.appendChild(h1);
  wrapper.appendChild(container);
	wrapper.appendChild(scanAgainBtn);
	wrapper.appendChild(homeBtn);
  document.body.appendChild(wrapper);
}




// Logic
if (gameData.chapters[code]) {
  const chapter = gameData.chapters[code];
  audioEl.src = chapter.clueAudio;
  displayCard(chapter.image, chapter.name);
} else if (gameData.cards[code]) {
  const card = gameData.cards[code];
  audioEl.src = card.audio;
  displayCard(card.image, card.name);
} else {
  document.body.innerHTML = "<h2>No match found for this QR code.</h2>";
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
