//Getting all buttons adn creating array.
var buttons = document.getElementsByClassName('button');


//Looping through the array and adding a simple click event to make sure they're wired up correctly.
for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
        console.log(e.target.id+" button clicked.")
    })
}


//Selecting a random element out of the buttons array and returning it. You could also return just a color
//but selecting the element itself will make DOM manipulation much much easier.
function getRandomButton(){
    return buttons[Math.floor(Math.random()* buttons.length)];
}