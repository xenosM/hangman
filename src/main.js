//!VARIABLE DECLARATION
const rightAnswerContainer = document.querySelector("#right-answer-container");
const wrongAnswerContainer = document.querySelector("#wrong-answer-container");
const wrongAnswerResult = document.querySelector("#wrong-answer");
const popup = document.querySelector("#popup");
const bodyParts = document.querySelectorAll(".bodypart")
console.log(bodyParts)

let usedLetters = [];
let mistakeCount =0;
let wrongAnswers = [];
//!FUNCTION DECLARATION
async function main() {
  const [word] = await getWord();
  console.log(word);
  generateBlankDash(word);
  //*Event Listener
  document.body.addEventListener("keydown", (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      let regex = new RegExp(`[${word}]`);
      let key = e.key.toLowerCase();

      if (usedLetters.includes(key)) {
        showPopup();
      } else if (regex.test(key)) {
        rightAnswerDisplay(key, document.querySelectorAll(".blank-space"));
      } else {
        wrongAnswerContainer.style.visibility = "visible";
        wrongAnswerDisplay(key);
        displayBodyPart();
      }
      if(mistakeCount>=6){
       gameOver()
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
  usedLetters.push(key);
}
function wrongAnswerDisplay(key) {
  usedLetters.push(key);
  wrongAnswers.push(key);
  wrongAnswerResult.innerText = wrongAnswers;
}
function displayBodyPart(){
  bodyParts[mistakeCount].style.display="block"
  mistakeCount++
}
function showPopup() {
  console.log("pop")
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 1200);
}
function gameOver(){
  
}
//!MAIN CODE
main();
