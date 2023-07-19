let reset = document.getElementById("reset");
reset.addEventListener('click', resetGame, false);
let secretCode = null;
let colors = ["red", "blue", "yellow", "green", "orange", "purple"];
let selects = document.getElementsByTagName("select");
let indicators = document.getElementsByTagName("indicator");
//The background of each select tag should reflect the color option that the user chooses
for(let select of selects) {
    select.addEventListener('change', changeColor, false);
}
//change the background color of the select tag to match its value
function changeColor() {
    let color = this.value;
    this.style.setProperty("background-color", color);
    this.style.setProperty("color", "white");
    if(color === "yellow") {
        this.style.setProperty("color", "black");
    }
}

//////////////////////////////////////////////////////////////////
let submitButton = document.getElementById("submit");
//reset the game
resetGame();
function resetGame() {
    //pick a random code when resetting the game
    pickRandomCode();
    // You'll need to activate the submit button
    // You'll want to clear any rows from a previous game if they exist
    for (let i = document.getElementsByClassName("mmRow").length - 1; i >0; i--){
        document.getElementById("gameBoard").removeChild(document.getElementsByClassName("mmRow")[i]);
    }
}
//a function here that will pick a random 4-color code and
//store it as an array in the variable named secretCode.

// function checkWin(guess){

// }

function pickRandomCode() {
    //first make sure there is nothing in the secretCode array by making it an empty array
    secretCode = [];
    //push 4 random strings from the colors array into the secretCode array
    for(let i = 0; i < 4; i++) {
        secretCode.push(colors[Math.floor(6 * Math.random())]);
    }
    submitButton.addEventListener("click", submitAnswer, false);

}
//You'll need to create an event listener on the submit button for when
//the user makes a guess.
//Every time the user makes a guess, you need to append a new row in the board.
//I suggest that you make a row look something like this:
function submitAnswer(){
        let guess = [];
        let feedback = [];
        for (select of selects){
            guess.push(select.value);
        }
        feedback = checkFeedback(guess);

        document.getElementById("gameBoard").appendChild(createNewRow(guess, feedback));
        // document.getElementById("gameBoard").appendChild(checkFeedback(guess));
        // checkWin();
        let count = 0;
        for (let i = 0; i < 4; i++){
            if (guess[i] == secretCode[i]){
                count++;
            }
            if (count == 4){
    
                resetGame();

            }
        }
}


    

function createNewRow(guess, feedback){
    let mmRow = document.createElement("div");
    mmRow.className = "mmRow";
    let guessContainer = document.createElement("div");
    let feedContainer = document.createElement("div");
    guessContainer.className = "guess";
    feedContainer.className = "feedback";
    mmRow.appendChild(guessContainer);
    mmRow.appendChild(feedContainer);
    for (let i = 0; i < 4; i++){
        let element = document.createElement("div");
        element.className = guess[i] + " indicator";
        // element.value = guess[i];
        guessContainer.appendChild(element);
    }
    for (let j = 0; j < 4; j++){
        let element = document.createElement("div");
        element.className = feedback[j] + " indicator";
        feedContainer.appendChild(element);
    }

    return mmRow;
}

function checkFeedback(guess){
    let feedback = [];
    let countBlack = 0;
    let countGuess = 0;
    let countFeedback = 0;
    let countWhite = 0;

    for (let i = 0; i < 4; i++){
        if (guess[i] == secretCode[i]){
            feedback.push("black");
            countBlack++;
        }
    }
    for (let a = 0; a < colors.length; a++){
        for (let i = 0; i < guess.length; i++){
            if (colors[a] == guess[i]){
                countGuess++;
            }
         }
         for (let j = 0; j < secretCode.length; j++){
            if (secretCode[j] == colors[a]){
                countFeedback++;
            }
        }
        countWhite += Math.min(countFeedback, countGuess);
        countGuess = 0;
        countFeedback = 0;
    }

    for (let i = 0; i < countWhite - countBlack; i++){
        feedback.push("white");
    }
    return feedback;
}
/* The color class name would be the color that you want the indicator to be
such as "red", "blue", "black", "white", etc. The CSS is already set up
so that the indicator divs will look like circles*/
//////////////////////////////////////////////////////////////////////////
