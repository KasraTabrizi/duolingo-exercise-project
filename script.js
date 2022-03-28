//DECLARE HTML CLASS, ID, TAG VARIABLES
const destinationContainer = document.getElementById("destination__container");
console.log(destinationContainer.getBoundingClientRect());
const words = document.getElementsByClassName("word");

let destinationPositionDefault = destinationContainer.getBoundingClientRect();

//DECLARE CODE VARIABLES

//store coordinates of the words by order of their placement.
const destinationArray = [];

//store coordinates of the words in the origin array
const originArray = [];

function calibrateDestinationCursorPosition(destinationArray) {
  //When no word is clicked on
  if (destinationArray.length === 0) {
    return destinationPositionDefaultDefault;
  } else {
    //if word is placed in the destination, fetch coordinates of last word
    //as starting point for the next word.
    let lastAddedWord = destinationArray[destinationArray.length - 1];
    let newStartPosition = lastAddedWord.right + 20;
    return newStartPosition;
  }
}

function createOriginArray(word) {
  let wordPosition = word.getBoundingClientRect();
  let newWordObject = Object.assign(wordPosition);
  newWordObject.word = word.textContent;
  newWordObject.location = "origin";
  originArray.push(newWordObject);
}

for (let i = 0; i < words.length; i++) {
  createOriginArray(words[i]);

  words[i].addEventListener("click", () => {
    let wordPosition = words[i].getBoundingClientRect();

    let yTravel =
      wordPosition.y -
      (destinationPositionDefault.y +
        (destinationPositionDefault.height - wordPosition.height) / 2);
    // let xTravel = wordPosition.x - xEnd;
    let xTravel = 0;

    if (wordPosition.x > destinationPositionDefault.x) {
      xTravel = wordPosition.x - destinationPositionDefault.x;
    } else {
      xTravel = destinationPositionDefault.x - wordPosition.x;
    }

    console.log("X Travel", xTravel);
    console.log("Y Travel", yTravel);
    words[i].style.transform = `translate(-${xTravel}px,-${yTravel}px)`;

    reCalculateDestination(wordPosition.width);
  });
}

console.log("ORIGIN ARRAY", originArray);

function reCalculateDestination(wordPositionWidth) {
  destinationPositionDefault.x =
    destinationPositionDefault.x + wordPositionWidth + 20;
  console.log(destinationPositionDefault);
}
