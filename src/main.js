//!VARIABLE DECLARATION
const rightAnswerContainer = document.querySelector("#right-answer-container");
const wrongAnswerContainer = document.querySelector("#wrong-answer-container");
const wrongAnswerResult = document.querySelector("#wrong-answer");
const popup = document.querySelector("#popup");
const bodyParts = document.querySelectorAll(".bodypart");
const modalContainer = document.querySelector("#modal-container");
const gameoverModal = document.querySelector("#gameover-modal");
const winModal = document.querySelector("#win-modal");
const restartBtn = document.querySelectorAll(".restart-btn");
const answerDisplay = document.querySelector("#answer-display");
let playState = true;
let rightAnswers = [];
let wrongAnswers = [];
let mistakeCount = 0;
//!FUNCTION DECLARATION
async function main() {
  const [word] = await getWord();
  generateBlankDash(word);
  const blankSpace = document.querySelectorAll(".blank-space");

  //*Event Listener
  document.body.addEventListener("keydown", (e) => {
    if (/[a-z]/i.test(e.key) && playState) {
      let regex = new RegExp(`[${word}]`);
      let key = e.key.toLowerCase();

      if (wrongAnswers.includes(key) || rightAnswers.includes(key)) {
        showPopup();
        return;
      } else if (regex.test(key)) {
        rightAnswerDisplay(key, document.querySelectorAll(".blank-space"));
        if ([...blankSpace].map((item) => item.innerText).join("") == word) {
          gameWin();
        }
      } else {
        wrongAnswerDisplay(key);
        if (mistakeCount >= 6) {
          gameOver(word);
        }
      }
    }
  });
}

async function getWord() {
  const response = await fetch(
    "https://random-word-api.vercel.app/api?words=1"
  );
  const word = await response.json();
  return word;
}
function generateBlankDash(word) {
  rightAnswerContainer.innerHTML = word
    .split("")
    .map((letter) => `<div class="blank-space" data-letter="${letter}"></div>`)
    .join("");
}
function rightAnswerDisplay(key, elements) {
  elements.forEach((element) => {
    if (element.dataset.letter == key) {
      element.innerText = key;
    }
  });
  rightAnswers.push(key);
}
function wrongAnswerDisplay(key) {
  wrongAnswerContainer.style.visibility = "visible";
  wrongAnswerResult.innerText = wrongAnswers;
  wrongAnswers.push(key);
  displayBodyPart();
}
function displayBodyPart() {
  bodyParts[mistakeCount].style.display = "block";
  mistakeCount++;
}
function showPopup() {
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 1200);
}
function gameOver(word) {
  modalContainer.style.visibility = "visible";
  gameoverModal.style.display = "block";
  answerDisplay.innerText = `The answer was ${word}`;
  playState = false;
  restartBtn.forEach((item) => (item.onclick = restartGame));
}
function gameWin() {
  modalContainer.style.visibility = "visible";
  winModal.style.display = "block";
  playState = false;
  restartBtn.forEach((item) => (item.onclick = restartGame));
}
function restartGame() {
  location.reload();
}

//!MAIN CODE
main();
