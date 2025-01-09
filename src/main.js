//!VARIABLE DECLARATION
const rightAnswerContainer = document.querySelector("#right-answer-container");
let usedLetters=[]
//!FUNCTION DECLARATION
async function main() {

  const [word] = await getWord();
  console.log(word)
  generateBlankDash(word);
  //*Event Listener
  document.body.addEventListener('keydown',(e)=>{
    let regex = new RegExp(`[${word}]`)
    let key = e.key
    if(usedLetters.includes(key)){

    }
    else if(regex.test(key)){
      rightAnswerDisplay(key,document.querySelectorAll(".blank-space"))
    }
    else{

    }
  })
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
function rightAnswerDisplay(key,elements){
  elements.forEach((element) => {
    if(element.dataset.letter==key){
      element.innerText=key
    }
  })
}
//!MAIN CODE
main();
