# You're going to build a Simon game like from the 80s 
#### I promise it will be fun

## First Steps:
* Build the simon board with CSS and HTML. You can have it look like this ![picture](simon.JPG) or you can have it look like something else. As long as it has four differently colored buttons that's fine.
* We need to attach event listeners to each of the buttons so that we can tell if people click them or not.
* Next we need to create a function to randomly selects a button to start with.

## Second Steps:
* After randomly selecting a button, add the active class to that button for 1-2 seconds then remove the class.
* Also add the class briefly when the user clicks a button so they can tell it was clicked.
* Check to see if the user clicked the correct button. And if they did, increase the count number by one.

## Third Steps:
* So now we have a single game version of simon. We need to save the previous random selections and just add a new one at the end.
* We now need to cycle through each of these items one at a time and have them flash for 1-2 seconds.

## Fourth Steps:
* Once that's done we need to make sure the user is clicking the items in the correct order.
* If all the elements were clicked in the right order, increase the count number by one and add a new random button and repeat.
* If the user clicks a wrong element in the chain then the counter will reset and the game will end.

## Fifth Steps:
* Make sure the user can't start clicking buttons until the random cycle is complete.
* Add a way for the user to start a new game and a message if they fail.


