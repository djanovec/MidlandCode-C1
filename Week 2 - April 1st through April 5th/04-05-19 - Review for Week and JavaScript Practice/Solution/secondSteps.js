//Getting all buttons adn creating array.
var buttons = document.getElementsByClassName('button');
var winCounter = document.getElementById('count');
var simonsChoices = [];


function checkClicked(clickedButton){
    //Right now we only have one so we'll compare to the first element in the array only
    if(clickedButton === simonsChoices[0]){
        //this pulls the string from inside the winCounter element, turns it into a number then adds one.
        var wins = parseInt(winCounter.innerText)+ 1;
        //Updates the winCounter to show the correct number of wins
        winCounter.innerText = wins;
    }
    else{
        //If it's wrong, reset the counter.
        winCounter.innerText = 0;
    }
    //Since we're only testing it with a single random choice at the moment, we can reset the array each time.
    simonsChoices = [];
}

function highlightButtons(){
   //Since we only currently have a single element, we just need to add the active class then after 1000ms 
   //we remove it to allow for the one second flash to appear.
   simonsChoices[0].classList.add('active');
   window.setTimeout(function(){
       simonsChoices[0].classList.remove('active')
   }, 1000)
}


//Selecting a random element out of the buttons array and returning it. You could also return just a color
//but selecting the element itself will make DOM manipulation much much easier.
function getRandomButton(){
    var button =  buttons[Math.floor(Math.random()* buttons.length)];
    //Pushes the current choice to the end of the array of choices. Technicall this is step three but since we
    // know it's coming we can think ahead.
    simonsChoices.push(button);
    highlightButtons(button);
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




