# Classwork for 4-11-19

Today we will be finishing our projects from yesterday. If you are already finished you get to present it to the class and talk about why you made the color/layout choices you did. Be prepared to talk for no more than 10 minutes. ALL groups will be presenting their pages to the class so be prepared!

Once you are complete with your project as a group, let me know and I will have more work for you. Alternatively, feel free to hop into an existing group and provide help as needed.

Once everyone is finished, this will be the next project to be done with randomly assigned groups or solo: 

## We're going to build a calculator
* Have a div that functions as the input for the calculator.
* Set up number buttons for 0-9
* Set up action buttons for +, -, *, /, power, C, CE, and =
* When a user clicks a number, add that to the screen (like a calculator!).
* When a user clicks an action button, check for the following:
    * If there's nothing in memory and they didn't press =, store the current value in memory and then clear the screen to allow them to input the next number.
    * If something is in memory, perform the previous action and display that value on the screen. When they press a new button, clear the screen to allow them to start typing a new number.
    * If '=' is pressed, show the value of the last action pressed.
    * If 'CE' is pressed, clear out the div but keep the chain of actions in memory.
    * If 'C' is pressed, clear out memory and start from scratch.