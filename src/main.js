//!VARIABLE DECLARATION

//!FUNCTION DECLARATION
async function getWord(){
  const response =await fetch("https://random-word-api.vercel.app/api?words=1");
  const word = await response.json()
  return word
}

//!MAIN CODE
async function main(){
  const [word]=await getWord(); 
}
main()