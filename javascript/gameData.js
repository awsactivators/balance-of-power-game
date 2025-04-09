const gameData = {
  finalAudio: "./audio/complete-story/Prologue-Complete.mp3",
  chapters: {
    "3841": {
      id: "3841",
      title: "Chapter One",
      name: "Jumpsuit",
      clueAudio: "./audio/clue-cards/ACT1-Chapter-Card-Ricks-Jumpsuit.mp3",
      audio: "./audio/complete-story/Act1-Complete.mp3",
      image: "./images/ch1-3841-uniform-navy-pilot.jpg",
      cards: ["7295", "1603", "8472"]
    },
    "5916": {
      id: "5916",
      title: "Chapter Two",
      name: "Man in Tree",
      clueAudio: "./audio/clue-cards/ACT2-Chapter-Card-Man-in-Tree.mp3",
      audio: "./audio/complete-story/Act2-Complete.mp3",
      image: "./images/ch2-5916-suit-man-parachute.jpg",
      cards: ["6749", "2038", "9150"]
    },
    "4682": {
      id: "4682",
      title: "Chapter Three",
      name: "The Plane",
      clueAudio: "./audio/clue-cards/ACT3-Chapter-Card-The-Plane.mp3",
      audio: "./audio/complete-story/Act3-Complete.mp3",
      image: "./images/ch3-4682-plane-on-rock.jpg",
      cards: ["7314", "0527", "3960"]
    }
  },
  cards: {
    "7295": { id: "7295", chapter: "3841", name: "Name Tag", audio: "./audio/clue-cards/ACT1-Clue-Card-Nametag.mp3", image: "./images/ch1-clue1-7295-name-tag.jpg" },
    "1603": { id: "1603", chapter: "3841", name: "Family Photograpgh", audio: "./audio/clue-cards/ACT1-Clue-Card-Photograph-of-Family.mp3", image: "./images/ch1-clue2-1603-family-photo.jpg" },
    "8472": { id: "8472", chapter: "3841", name: "Bible", audio: "./audio/clue-cards/ACT1-Clue-Card-Bible.mp3", image: "./images/ch1-clue3-8472-bible-map.jpg" },
    "6749": { id: "6749", chapter: "5916", name: "A Cigar Butt", audio: "./audio/clue-cards/ACT2-Clue-Card-A-Cigar-Butt.mp3", image: "./images/ch2-clue2-6749-cigar-butt.jpg" },
    "2038": { id: "2038", chapter: "5916", name: "ICBM Plans", audio: "./audio/clue-cards/ACT2-Clue-Card-ICBM-Plans.mp3", image: "./images/ch2-clue1-2038-icbm-plans.jpg" },
    "9150": { id: "9150", chapter: "5916", name: "Rosary", audio: "./audio/clue-cards/ACT2-Clue-Card-Rosary.mp3", image: "./images/ch2-clue3-9150-rosary.jpg" },
    "7314": { id: "7314", chapter: "4682", name: "Zippo Lighter", audio: "./audio/clue-cards/ACT3-Clue-Card-Zippo-Lighter.mp3", image: "./images/ch3-clue1-7314-hammer-sickle-zippo.png" },
    "0527": { id: "0527", chapter: "4682", name: "Plane Tail Section", audio: "./audio/clue-cards/ACT3-Clue-Card-Tail-Section-of-Plane.mp3", image: "./images/ch3-clue2-0527-plane-tail-end.jpg" },
    "3960": { id: "3960", chapter: "4682", name: "Flight Log", audio: "./audio/clue-cards/ACT3-Clue-Card-Flight-Log.mp3", image: "./images/ch3-clue3-3960-flight-log.jpg" }
  }
};