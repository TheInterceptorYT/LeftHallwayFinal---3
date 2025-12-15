// ---------------- SEQUENCE PUZZLE ---------------- //
const correctSequence = ["cupcake", "pizza", "partyhat", "paperplate"];
let playerSequence = [];
let tableItems = [null, null, null, null, null];

function placeItem(itemId) {
  const tableRow = document.getElementById("tableRow");

  for (let i = 0; i < tableItems.length; i++) {
    if (!tableItems[i]) {
      tableItems[i] = itemId;

      const img = document.createElement("img");
      img.src = `images/${itemId}.png`;
      img.classList.add("contain-image");
      tableRow.children[i].appendChild(img);
      break;
    }
  }

  playerSequence.push(itemId);

  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== correctSequence[i]) {
      playerSequence = [];
      return;
    }
  }

  if (playerSequence.length === correctSequence.length) {
    moveKeyToNotepad();
    playerSequence = [];
  }
}

// Move key to where notepad originally was
function moveKeyToNotepad() {
  const notepad = document.getElementById("notepad");
  if (notepad) {
    const img = document.createElement("img");
    img.src = "images/key1.png";
    img.classList.add("contain-image");
    const parentBox = notepad.parentElement;
    parentBox.innerHTML = "";
    parentBox.appendChild(img);
    notepad.remove();
  }
}

// ---------------- MODALS ---------------- //
function openNotepad() {
  const notepad = document.getElementById("notepad");
  if (!notepad) return;

  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = "images/stickynote.png";
  modal.style.display = "flex";

  setTimeout(() => {
    if (modalImage.src.includes("stickynote.png")) {
      notepad.remove();
    }
  }, 500);
}

function showModal(imageElement) {
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageElement.src;
  modal.style.display = "flex";
}

function hideModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) hideModal();
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") hideModal();
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myModal").style.display = "none";
});

// ---------------- INVENTORY ---------------- //
function toggleBottomRow() {
  document.getElementById("bottomRow").classList.toggle("hidden");
}

// ---------------- ROOM NAVIGATION ---------------- //
function goUp() {
  window.location.href =
    "https://theinterceptoryt.github.io/ChooseHallwayFinal---3/";
}

function goRight() {
  window.location.href =
    "https://eternalascenttyler.github.io/FnafReturnOfTheSoulsOffice3/";
}

// ---------------- AUDIO UNLOCK ---------------- //
let audioUnlocked = false;
function unlockAudio() {
  const jumpscareAudio = document.getElementById("jumpscareAudio");
  jumpscareAudio
    .play()
    .then(() => {
      jumpscareAudio.pause();
      jumpscareAudio.currentTime = 0;
    })
    .catch(() => {});
  audioUnlocked = true;
  document.removeEventListener("click", unlockAudio);
}
document.addEventListener("click", unlockAudio);

// ------------------ BALLORA RANDOM SPAWN ------------------ //
const balloraChance = 0.3; // 30% chance to spawn
const balloraDuration = 10; // 10 seconds
let balloraTimer;

function maybeSpawnBallora() {
  if (Math.random() < balloraChance) {
    spawnBallora();
  }
}

function spawnBallora() {
  const ballora = document.createElement("img");
  ballora.id = "ballora";
  ballora.src = "images/ballora.png";
  ballora.style.position = "fixed";
  ballora.style.top = "70%"; // adjust vertical position
  ballora.style.left = "50%";
  ballora.style.transform = "translate(-30%, -50%)";
  ballora.style.zIndex = "15";
  ballora.style.maxWidth = "1000px"; // adjust size
  ballora.style.maxHeight = "1000px";
  document.body.appendChild(ballora);

  // Timer display
  const timerDiv = document.createElement("div");
  timerDiv.id = "balloraTimer";
  timerDiv.style.position = "fixed";
  timerDiv.style.top = "10px";
  timerDiv.style.left = "10px";
  timerDiv.style.zIndex = "20";
  timerDiv.style.padding = "10px 20px";
  timerDiv.style.color = "#fff";
  timerDiv.style.fontSize = "100px"; // big timer
  timerDiv.style.fontWeight = "bold";
  timerDiv.style.backgroundColor = "transparent"; // no background
  timerDiv.innerText = balloraDuration;
  document.body.appendChild(timerDiv);

  let timeLeft = 5;
  balloraTimer = setInterval(() => {
    timeLeft--;
    timerDiv.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(balloraTimer);
      triggerBalloraJump();
    }
  }, 1000);
}

// ---------------- TRIGGER BALLORA JUMPSCARE + GAME OVER ---------------- //
function triggerBalloraJump() {
  const ballora = document.getElementById("ballora");
  if (ballora) ballora.src = "gifs/ballorajump.gif";

  const jumpscareOverlay = document.getElementById("jumpscareOverlay");
  const jumpscareAudio = document.getElementById("jumpscareAudio");

  jumpscareOverlay.style.display = "flex";

  if (audioUnlocked) {
    jumpscareAudio.currentTime = 0;
    jumpscareAudio.play();
  }

  setTimeout(() => {
    jumpscareOverlay.style.display = "none";
    document.getElementById("gameOverScreen").style.display = "flex";
  }, 2000);
}

// ---------------- RESTART ---------------- //
document.getElementById("restartBtn")?.addEventListener("click", () => {
  location.reload();
});

// ---------------- INIT ---------------- //
window.addEventListener("DOMContentLoaded", () => {
  maybeSpawnBallora();
});
