const gameContainer = document.getElementById("game");
let noClicking = false;
let cardsFlipped = 0;  
let card1 = null;
let card2 = null; 

const COLORS = [
  "Crimson",
  "Aqua",
  "LimeGreen",
  "Gold",
  "Plum",
  "Crimson",
  "Aqua",
  "LimeGreen",
  "Gold",
  "Plum",
  "DeepPink",
  "DeepPink"
];


function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);


  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div"); 
      newDiv.classList.add(color);
       newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }



function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if(!card1 || !card2) {
    //if both cards dont have values
  currentCard.classList.add("flipped");
  card1 = card1 || currentCard;
  //  card one has a value (returns true) then let it have that value (ie leave as is) 
  //if it does have a value then assign the currentCard to the value of card1 
  card2 = currentCard ===  card1 ? null : currentCard;


    console.log("you just clicked", event.target);
}
if(card1 && card2) {
  noClicking = true; 
  let cardClass1 = card1.className;
  let cardClass2 = card2.className;

  if(cardClass1 === cardClass2) {
    cardsFlipped += 2;
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    card1 = null;
    card2 = null;
    noClicking = false;
  } else {
    setTimeout(function() {
    card1.style.backgroundColor = "black";
    card2.style.backgroundColor = "black";
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1 = null;
    card2 = null; 
    noClicking = false; 
  }, 1000);
  
  }
}
  


if(cardsFlipped === COLORS.length)
alert('Game Over!');
}
// when the DOM loads
createDivsForColors(shuffledColors);

//this was an extremely hard and time consuming for me. I do understand the logic and how we get to each element which was tough as a whole. When I tried to do this initially, I tried to seperate functions but would have done much better if I had nested more functions instead. I was also have a difficult time because I did not name my variables globally null at the beginning. This allows me to basically say okay we are now clicking that div and Card1 and Card 2 are being defined.

//Then by using that definintion adding a class. Afterwhich, we then set both cards up against eachother and say if they are equal we are removing the eventListener and returning card1 and card2 to undefined i.e. null. After taking we are saying noClicking is false that way we run the function again.

//if however, the card classes do not equal eachother, then we are setting a cuntion timeout. This function says that card1 and card2 the backgrounds will return to black, we are removing the class flipped, card1 and card2 will return to undefined, and setting noClicking to false which then starts the function again. It pauses fofr a timeout for 1 sec when cards are not a match. Finally when the total number of cards flipped = the total number of colors the game is over. 