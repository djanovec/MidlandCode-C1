## Homework for 04-02-19

The homework for today will consist of several different functions / practice examples to improve your JavaScript abilities.

* Write a function to see if a pizza can be split evenly amongst a group of people. The function should take two arguments: the number of people present, and the number of slices of the pizza. 
    * If it can be split evenly log the result
    * If it cannot, say it cannot be split evenly and ALSO list how many people will go without an extra slice.
* Write a function to see if a triangle is a right triangle based off whether or not square of the longest side is equal to the sum of the squares of the other sides.
* Write a function to check to see if a warrior can beat all of the monsters in a dungeon. Supply the function with the amount of damage each of the monsters do (in array format) and then the number of health the warrior has.
    * If the warrior doesn't have enough health to take all of the attacks they are unable to survive
    * If they are able to take all of the attacks, they are able to survive.
``` javascript
    //Example of monster damage:
    [1,3,2,8,5]
    // Warrior health:
    10
    // Since 1+3+2+8+5 = 19 and 10-19 < 0 they could not survive
```
* Write a function that takes points in a grid in x,y format. Calculate if the points form a rectangle. The arguments should be supplied as arrays:
``` javascript
    [x1,y1], [x2,y2], [x3,y3], [x4,y4]
```