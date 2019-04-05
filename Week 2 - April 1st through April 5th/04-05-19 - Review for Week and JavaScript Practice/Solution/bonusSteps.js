//Getting all buttons adn creating array.
var buttons = document.getElementsByClassName('button');
var winCounter = document.getElementById('count');
var playerClickCounter = 0;
var delay = 0;
// Adding sound effects
var sounds = {
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
  };

//This will tell is if the game is ready for the player to click or not. There are multiple ways to do this
//but this is the most straightforward.
var canClick = false;
var simonsChoices = [];


function playSound(element){
    sounds[element.id].currentTime = 0;
    sounds[element.id].play();
}

function checkClicked(clickedButton){
    //We replace the 0 with the playerClickCounter variable which we can increment or reset as needed.
    if(clickedButton === simonsChoices[playerClickCounter]){
        playerClickCounter++;
        
        //If you clicked as many buttons as are in the list of simons choices then increase the win counter
        //then add a new element to simonsChoices and start again;
        if(playerClickCounter >= simonsChoices.length){
            //this pulls the string from inside the winCounter element, turns it into a number then adds one.
            var wins = parseInt(winCounter.innerText)+ 1;
        
        //Updates the winCounter to show the correct number of wins
        winCounter.innerText = wins;
        
        //This will start the cycle over again. By putting it in a timeout it allows the last item clicked
        //by the user to remove the active class before highlighting any elements in the new cycle.
        window.setTimeout(function(){
            getRandomButton();
        }, 300)
        playerClickCounter = 0;
        }
    }
    else{
        canClick = false;
        //Unhides loss message;
        document.getElementById('footer').style.display = 'block';
    }
    
}

function highlightButtons(){
    //You need to be able to loop through the elements without a for loop so we use a counter for that here.
    var counter = 0;
    //Start with the first element having the active class
    simonsChoices[0].classList.add('active');
    playSound(simonsChoices[0]);
    var buttonInterval = window.setInterval(function(){
        //Removes the active class from the previously active button
        simonsChoices[counter].classList.remove('active');
        //increments the counter to the next element
        counter++;
        //If the counter is now past the length of the array or equal (remember, arrays are zero indexed)
        // Remove the interval and end the function
        if(counter >= simonsChoices.length){
            window.clearInterval(buttonInterval);
            canClick = true;
            return;
        }
        //So this extra 200ms delay is in case the same color happens two or more times in a row. Without it
        //the element will just stay lit making it hard to guess how many times to press it.
        window.setTimeout(function(){
            playSound(simonsChoices[counter]);
            simonsChoices[counter].classList.add('active');
        }, 200)
    }, delay);
}


//Selecting a random element out of the buttons array and returning it. You could also return just a color
//but selecting the element itself will make DOM manipulation much much easier.
function getRandomButton(){
    canClick = false;
    var button =  buttons[Math.floor(Math.random()* buttons.length)];
    //Pushes the current choice to the end of the array of choices. Technicall this is step three but since we
    // know it's coming we can think ahead.
    simonsChoices.push(button);
    highlightButtons();
}

function startGame(del){
    delay = del;
    //Hides the Game Over message so you cant keep restarting the game.
    document.getElementById('footer').style.display = 'none';
    //resets variables used
    simonsChoices = [];
    playerClickCounter = 0;
    winCounter.innerText = 0;
    getRandomButton();
}

//Adds start game function on click of new game button.
(function(elements){
    document.getElementById('footer').removeChild(document.getElementById('newGame'));
    for(var i=0; i < elements.length; i++){
        var el = document.createElement('button');
        el.id = 'new'+elements[i][0];
        el.innerText = 'New '+elements[i][0]+ ' Game';
        el.value = elements[i][1];
        el.addEventListener('click', function(e){
            startGame(e.target.value);
        })
        document.getElementById('footer').appendChild(el);
    }
})([['Easy', 1000], ['Medium', 700],['Hard', 400]]);

//Looping through the array and adding a simple click event to make sure they're wired up correctly.
for(var i = 0; i < buttons.length; i++){
    //Rather than using a setTimeout feature for this I chose to add the active class when you click down
    //And then just remove it upon releasing the mouse button. It allows for the same functionality without
    // A timer which could cause potential problems.
    buttons[i].addEventListener('mousedown', function(e){
        //if the game isn't ready for the player to click don't do anything when they click
        if(canClick){
    playSound(e.target);
        e.target.classList.add('active');
        }
    })
    buttons[i].addEventListener('mouseup', function(e){
        //if the game isn't ready for the player to click don't do anything when they click
        if(canClick){
        e.target.classList.remove('active');
        //When the mouse button is released this function is called to see if the user clicked the correct button
        checkClicked(e.target);
        }
    })
}




