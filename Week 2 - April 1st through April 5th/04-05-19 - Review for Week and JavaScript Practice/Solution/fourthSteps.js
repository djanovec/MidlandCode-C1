//Getting all buttons adn creating array.
var buttons = document.getElementsByClassName('button');
var winCounter = document.getElementById('count');
var playerClickCounter = 0;
var simonsChoices = [];


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
        }, 500)
        playerClickCounter = 0;
        }
    }
    else{
        //If it's wrong, reset the counter.
        winCounter.innerText = 0;
        //If they're wrong, also reset the choices array to be empty so they can restart if they want to.
        simonsChoices = [];
        //Also reset the clickCounter
        playerClickCounter = 0;
    }
    
}

function highlightButtons(){
    //You need to be able to loop through the elements without a for loop so we use a counter for that here.
    var counter = 0;
    //Start with the first element having the active class
    simonsChoices[0].classList.add('active');
    var buttonInterval = window.setInterval(function(){
        //Removes the active class from the previously active button
        simonsChoices[counter].classList.remove('active');
        //increments the counter to the next element
        counter++;
        //If the counter is now past the length of the array or equal (remember, arrays are zero indexed)
        // Remove the interval and end the function
        if(counter >= simonsChoices.length){
            window.clearInterval(buttonInterval);
            return;
        }
        //So this extra 200ms delay is in case the same color happens two or more times in a row. Without it
        //the element will just stay lit making it hard to guess how many times to press it.
        window.setTimeout(function(){
            simonsChoices[counter].classList.add('active');
        }, 200)
    }, 1200);
}


//Selecting a random element out of the buttons array and returning it. You could also return just a color
//but selecting the element itself will make DOM manipulation much much easier.
function getRandomButton(){
    var button =  buttons[Math.floor(Math.random()* buttons.length)];
    //Pushes the current choice to the end of the array of choices. Technicall this is step three but since we
    // know it's coming we can think ahead.
    simonsChoices.push(button);
    highlightButtons();
}



//Looping through the array and adding a simple click event to make sure they're wired up correctly.
for(var i = 0; i < buttons.length; i++){
    //Rather than using a setTimeout feature for this I chose to add the active class when you click down
    //And then just remove it upon releasing the mouse button. It allows for the same functionality without
    // A timer which could cause potential problems.
    buttons[i].addEventListener('mousedown', function(e){
        e.target.classList.add('active');
    })
    buttons[i].addEventListener('mouseup', function(e){
        e.target.classList.remove('active');
        //When the mouse button is released this function is called to see if the user clicked the correct button
        checkClicked(e.target);
    })
}




