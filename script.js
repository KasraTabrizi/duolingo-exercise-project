//DECLARE HTML CLASS, ID, TAG VARIABLES
const destinationContainer = document.getElementById("destination__container");
console.log(destinationContainer.getBoundingClientRect());
const words = document.getElementsByClassName("word");

let destinationPosDefault = destinationContainer.getBoundingClientRect();

//DECLARE CODE VARIABLES

//store coordinates of the words by order of their placement.
const destinationArray = [];

//store coordinates of the words in the origin array
const originArray = [];

const translate = [{ x: 0, y: 0 }];

function calibrateDestinationCursorPos(destinationArray) {
  //When no word is clicked on
  if (destinationArray.length === 0) {
    return destinationPosDefault.x;
  } else {
    //if word is placed in the destination, fetch coordinates of last word
    //as starting point for the next word.
    let sum = destinationPosDefault.x;
    destinationArray.forEach((element) => {
      sum += element.width + 20;
    });
    console.log(sum);
    return sum;
  }
}

function createOriginArray(word) {
  let wordPosition = word.getBoundingClientRect();
  let newWordObject = Object.assign(wordPosition);
  newWordObject.word = word.textContent;
  newWordObject.location = "origin";
  originArray.push(newWordObject);
}

function reCalculateDestination(wordPositionWidth) {
  destinationPosDefault.x = destinationPosDefault.x + wordPositionWidth + 20;
  console.log(destinationPosDefault);
}

// function moveWordToDestination(wordPosition) {}

for (let i = 0; i < words.length; i++) {
  createOriginArray(words[i]);

  words[i].addEventListener("click", () => {
    //Check de destinationStartPos
    destinationStartPos = calibrateDestinationCursorPos(destinationArray); //X
    console.log("destinationStartPos", destinationStartPos);

    //Calculate X and Y distance between destination and the word
    let yTravel =
      originArray[i].y -
      (destinationPosDefault.y +
        (destinationPosDefault.height - originArray[i].height) / 2);

    let xTravel = 0;
    if (originArray[i].x > destinationStartPos) {
      xTravel = -(originArray[i].x - destinationStartPos);
    } else {
      xTravel = destinationStartPos - originArray[i].x;
    }

    console.log("X Travel", xTravel);
    console.log("Y Travel", yTravel);

    if (originArray[i].location === "origin") {
      yTravel *= -1;
      originArray[i].location = "destination";
    } else if (originArray[i].location === "destination") {
      yTravel *= -1;
      xTravel *= -1;
      originArray[i].location = "origin";
    }

    console.log(originArray[i]);

    //Apply translate
    words[i].style.transform = `translate(${xTravel}px,${yTravel}px)`;
    //Put the word object in the destination array
    destinationArray.push(originArray[i]);

    //reCalculateDestination(originArray[i].width);
    console.log("*****************************************");
  });
}

console.log("ORIGIN ARRAY", originArray);
