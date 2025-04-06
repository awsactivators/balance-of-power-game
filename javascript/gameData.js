const gameData = {
  finalAudio: "./audio/audio1.mp3",
  chapters: {
    "1000": {
      id: "1000",
      title: "Chapter One",
      name: "Navy pilot uniform",
      audio: "./audio/audio1.mp3",
      image: "./images/ch1-3841-uniform-navy-pilot.jpg",
      cards: ["1001", "1002", "1003"]
    },
    "2000": {
      id: "2000",
      title: "Chapter Two",
      name: "Suit-man parachute",
      audio: "./audio/audio1.mp3",
      image: "./images/ch2-5916-suit-man-parachute.jpg",
      cards: ["2001", "2002", "2003"]
    },
    "3000": {
      id: "3000",
      title: "Chapter Three",
      name: "Plane on Rock",
      audio: "./audio/audio1.mp3",
      image: "./images/ch3-4682-plane-on-rock.jpg",
      cards: ["3001", "3002", "3003"]
    }
  },
  cards: {
    "1001": { id: "1001", chapter: "1000", audio: "./audio/audio1.mp3", image: "./images/ch1-clue1-7295-name-tag.jpg" },
    "1002": { id: "1002", chapter: "1000", audio: "./audio/audio1.mp3", image: "./images/ch1-clue2-1603-family-photo.jpg" },
    "1003": { id: "1003", chapter: "1000", audio: "./audio/audio1.mp3", image: "./images/ch1-clue3-8472-bible-map.jpg" },
    "2001": { id: "2001", chapter: "2000", audio: "./audio/audio1.mp3", image: "./images/ch2-clue1-2038-icbm-plans.jpg" },
    "2002": { id: "2002", chapter: "2000", audio: "./audio/audio1.mp3", image: "./images/ch2-clue2-6749-cigar-butt.jpg" },
    "2003": { id: "2003", chapter: "2000", audio: "./audio/audio1.mp3", image: "./images/ch2-clue3-9150-rosary.jpg" },
    "3001": { id: "3001", chapter: "3000", audio: "./audio/audio1.mp3", image: "./images/ch3-clue1-7314-hammer-sickle-zippo.jpg" },
    "3002": { id: "3002", chapter: "3000", audio: "./audio/audio1.mp3", image: "./images/ch3-clue2-0527-plane-tail-end.jpg" },
    "3003": { id: "3003", chapter: "3000", audio: "./audio/audio1.mp3", image: "./images/ch3-clue3-3960-flight-log.jpg" }
  }
};