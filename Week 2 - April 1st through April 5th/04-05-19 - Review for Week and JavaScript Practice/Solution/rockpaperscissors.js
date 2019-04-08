var choices = document.querySelectorAll(".choice");
var scores = {tie: 0, win: 0, lost: 0};
choices.forEach(function (val) {
    val.addEventListener("click", function () {
        var pChoice = this.value.toUpperCase();
        var cChoice = computerChoice().toUpperCase();
        document.querySelector("#userChoice").innerText = "You chose: " + pChoice;
        document.querySelector("#computerChoice").innerText = "The computer chose: " + cChoice;
        whoWon(pChoice, cChoice);
    });
})

function computerChoice() {
    var options = ["rock", "paper", "scissors"];
    var rdm = Math.floor(Math.random() * 3);
    return options[rdm];
}

function whoWon(play, comp) {
    if (play === comp) {
        setOutcome("tie");
        return;
    }
    if ((play === "ROCK" && comp === "SCISSORS") || 
        (play === "SCISSORS" && comp === "PAPER") || 
        (play === "PAPER" && comp === "ROCK")) {
        setOutcome("win")
        return;
    }
    setOutcome("lost")
}

function setOutcome(outcome){
    scores[outcome]++;
    var outcomeContainer = document.querySelector("#outcome");
    document.querySelector("#"+outcome).innerText = scores[outcome];
    if(outcome == "tie"){
        outcomeContainer.innerText = "It's a tie!"
        return 
    }
    outcomeContainer.innerText = "You "+outcome+"!"
}
