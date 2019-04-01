## Homework for 04-01-19

You will be creating a text based game with at least 5 steps in the adventure. 
* Start by having the player enter their name. Once they do that, save it into an object.
* Next, have them pick a class to be. Tell them the options are "Warrior" or "Thief" (Or more if you prefer). 
    * If they type warrior (or thief) case-insensitive save their class into the object. 
    * If they did not enter one of the two, prompt them again and tell them it was an invalid entry.
* From here, for every prompt, refer to them as `"{Their Name} the {their class}"`.
* Set up 5 obstacles that they must overcome and ask them what they'd like to do. For example:
    ```
    You come across a river. Would you like to "Swim" across or "Pay" for a ferry.
    ```
    Depending on what the user inputs, follow along with your story and save their choice into the object under an appropriate key.
* At the end of the steps you've set up, tell their story based off the actions they chose. 
* For added difficulty, add health/damage to the game. You can also add branching choices: If they chose to pay for a ride, they might not be able to afford something later. Or if they chose to avoid a fight, it adds new options that weren't accessible if they did choose to fight.