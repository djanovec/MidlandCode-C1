# Rock Paper Scissors

### You have two ways to approach either use the preset up html or build your own. If you are fully comfortable with HTML and CSS and feel that would be busy work use the preset HTML otherwise build it from scratch. If you use the preset HTML you'll want to add extra attributes or elements to get the functionality to work properly.
### This will be an iterative process with more functionality added at each step.

## Step One: Getting the Buttons to work:

* Select all three buttons and using any sort of selection method you prefer.
* Attach event listeners to each of them and make sure those are working. This can be   done with a simple function that just does a console log on click.

## Step Two: Have the computer randomly select one
* Build a function that that randomly selects a value [1, 2, 3]  or [rock, paper scissors]. Either one of those is (or another option) is fine but explain why you chose the one you wanted to.
* Return that value from the function

## Step Three: Make the buttons do different things
* Refactor the event listeners for the buttons to pass in a variable (or pull the value from elsewhere in the html). 
* Based off the button clicked put a message in the page as to which button you clicked. This can be a div somewhere saying: "You chose rock!" or whatever other thing you prefer.
* Take the value returned from the AI rock paper scissors function and log that onto the screen as well.

## Step Four: Finishing Touches
* Now you have a working version of Rock Paper Scissors for selecting items but you have to visually check to see who won. 
* Compare your choice to the computers choice and add a message of who won the game or if it was a tie.
* Add code to keep track of not only which game it is: this will show the current game so it will start at 1 as it's game 1 at the beginning,  but also what your current wins losses and ties are. 
* Also add a message for the player to pick again to start a new game.