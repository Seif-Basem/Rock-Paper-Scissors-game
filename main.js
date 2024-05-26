// open and close rules
let rulesBtn = document.getElementById("rulesBtn");
let rules = document.getElementById("rules");
let closeRules = document.getElementById("closebtn");

rulesBtn.onclick = function () {
  rules.style.display = "block";
}
closeRules.onclick = function () {
  rules.style.display = "none";
}

//get result from html
let resultMSG = document.getElementById("resultMSG");
let msg = document.getElementById("msg");
let playAgain = document.getElementById("playAgain");

// Add event listeners to each element for choosing them
document.getElementById('paper').addEventListener('click', handleClick);
document.getElementById('scissors').addEventListener('click', handleClick);
document.getElementById('rock').addEventListener('click', handleClick);
// get the triangle
let triangle = document.getElementById("triangle");
// get the picked
let picked = document.getElementById("picked");
// counter for the score
let counter = 0;

function handleClick(event) {
  // Get the id of the clicked element
  let clickedElement = event.target.closest(".circle");
  // Get all elements with class 'circle'
  const elements = document.querySelectorAll('.circle');
  // mobile media width
  const mediaQuery = window.matchMedia("(max-width: 767px)");
  // Loop through all elements
  elements.forEach(element => {
      if (element !== clickedElement) {
        // Hide the elements that are not clicked
        triangle.classList.add("fade-out");
        element.classList.add("fade-out");
        picked.style.display = "block";
        setTimeout(() => {
          element.style.display = "none";
          triangle.style.display= "none";
        }, 300)
      }else {
        if (mediaQuery.matches) {
          element.style.top = "51%"
          element.style.left = "21%"
        } else {
          element.style.top = "53%"
          element.style.left = "30%"
        }
        element.style.transform = "translate(-50%, -50%)"
        element.style.boxShadow = "0px 0px 0px 0px #00000078"
        element.style.cursor = "auto"
      }
  });
  // get the data-choice attr of the clicked element
  const choice = clickedElement.getAttribute("data-choice");
  // console.log(choice);

  // for the house choosing
  function chooseRandomElement() {
    const elements = ['paper2', 'scissors2', 'rock2'];
    const randomIndex = Math.floor(Math.random() * elements.length);
    const randomElement = document.getElementById(elements[randomIndex]);
    randomElement.style.display = "block"
    const choice2 = randomElement.getAttribute("data-choice");
    // console.log(choice2);
    //result msg
    function resultMsg() {
      // Reset box shadows
      clickedElement.style.boxShadow = "0 0 0 0 #000";
      randomElement.style.boxShadow = "0 0 0 0 #000";
      if (choice === choice2) {
        // console.log("tie")
        resultMSG.style.display = "block";
        msg.innerHTML = "IT IS A TIE";
        clickedElement.style.boxShadow = "0 0 0 0 #000";
        randomElement.style.boxShadow = "0 0 0 0 #000";
      }else if (
        (choice === "rock" && choice2 === "scissors") ||
        (choice === "scissors" && choice2 === "paper") ||
        (choice === "paper" && choice2 === "rock")
        ) {
        // console.log("player won")
        resultMSG.style.display = "block";
        msg.innerHTML = "YOU WON";
        clickedElement.style.boxShadow = "0 0 0px 30px rgb(255 255 255 / 15%), 0 0 0 60px rgb(255 355 255 / 10%), 0 0 0 90px rgb(255 355 255 / 5%)"
        randomElement.style.boxShadow = "0 0 0 0 #000";
        counter = counter + 10
      }else {
        // console.log("player lose")
        resultMSG.style.display = "block";
        msg.innerHTML = "YOU LOSE";
        randomElement.style.boxShadow = "0 0 0px 30px rgb(255 255 255 / 15%), 0 0 0 60px rgb(255 355 255 / 10%), 0 0 0 90px rgb(255 355 255 / 5%)"
        clickedElement.style.boxShadow = "0 0 0 0 #000";
        //if counter is bigger that 0 u can decrease if not don't decrese
        if (counter > 0) {
          counter = counter - 1;
        }
      }
      document.getElementById("score").innerHTML = counter;
      console.log(counter);
    }
    setTimeout(() => {
      resultMsg()
    }, 600)
  }
  setTimeout(() => {
    chooseRandomElement()
  }, 500)
}

//for house choosing
document.getElementById('paper2').addEventListener('click', handleClick);
document.getElementById('scissors2').addEventListener('click', handleClick);
document.getElementById('rock2').addEventListener('click', handleClick);

// Ensure that the play again button hides the result message and resets the game
playAgain.onclick = function () {
  resultMSG.style.display = "none";
  const elements = document.querySelectorAll('.circle');
  elements.forEach(element => {
    element.style.display = "block";
    element.classList.remove("fade-out");
    element.style.top = ""; // Reset top
    element.style.left = ""; // Reset left
    element.style.transform = ""; // Reset transform
    element.style.boxShadow = ""; // Reset boxShadow
    element.style.cursor = "pointer"; // Reset cursor
  });
  triangle.style.display = "block";
  triangle.classList.remove("fade-out");
  picked.style.display = "none";

  // Hide the house choices
  document.getElementById('paper2').style.display = "none";
  document.getElementById('scissors2').style.display = "none";
  document.getElementById('rock2').style.display = "none";
}
