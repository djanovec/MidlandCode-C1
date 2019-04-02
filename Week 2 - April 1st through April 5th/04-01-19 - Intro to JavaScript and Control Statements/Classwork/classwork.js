// for (var i = 1; i <= 100; i++) {
//     if (i % 2 == 0 && i % 3 == 0) {
//         console.log(i, "FizzBuzz");
//     }
//     else if (i % 2 == 0) {
//         console.log(i, "Fizz")
//     }
//     else if (i % 3 == 0) {
//         console.log(i, "Buzz")
//     }
//     else {
//         console.log(i);
//     }
// }


// var userInput = prompt("Give me a string");

// if (userInput.length >= 4) {
//     var subString = ""
//     for (var i = 3; i < userInput.length; i++) {
//         subString = subString + userInput[i]
//     }
//     console.log(subString)
// }
// else {
//     console.log("Input too short!")
// }

// var randomNumber = Math.floor(Math.random() * 10) + 1;
// console.log(randomNumber);
// var guess = 0;
// var guessCounter = 0;
// while (guess != randomNumber) {
//     guess = prompt("Guess a number between 1 and 10 inclusive...");
//     guessCounter++;
// }

// console.log(`You guessed the number in only ${guessCounter} tries!`)

// for(var i = 1; i <= 5; i++) {
//     var toLog="";
//     for(var j = 1; j <= i; j++) {
//         toLog = toLog + "*";
//     }
//     console.log(toLog);
// }


var coin = Math.floor(Math.random() * 2)
var counter = 0;
while(coin != 0){
    coin = Math.floor(Math.random() * 2)
    counter++;
}
console.log(`It took you ${counter} retries to get heads.`)


// TRIES TAKEN

var coin;
var counter = 0;
do {
    coin = Math.floor(Math.random() * 2)
    counter++;
}while(coin != 0)
console.log(`It took you ${counter} tries to get heads.`)