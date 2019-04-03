## Homework for 04-02-19

The homework for today will consist of several different functions / practice examples to improve your JavaScript abilities.

* Write a function to see if a pizza can be split evenly amongst a group of people. The function should take two arguments: the number of people present, and the number of slices of the pizza. 
    * If it can be split evenly log the result
    * If it cannot, say it cannot be split evenly and ALSO list how many people will go without an extra slice.

``` javascript
    function isSplittable(numPeople, numSlices){
        if(numSlices % numPeople == 0){
            return "This can be split evenly"
        }
        else{
            return `This cannot be split evenly, ${numPeople - (numSlices % numPeople)} will go without an extra slice.`
        }
    }
```
* Write a function to see if a triangle is a right triangle based off whether or not square of the longest side is equal to the sum of the squares of the other sides.
``` javascript
    function isRightTriangle(a,b,c){
        return Math.pow(a,2)+Math.pow(b,2) === Math.pow(c,2)
    }

```
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
``` javascript
    function canSurvive(damageAmounts, health){
        var totalDamage = 0;
        for(var i=0; i<damageAmounts.length; i++){
            totalDamage += damageAmounts[i];
        }
        return totalDamage < health;
    }
```
* Write a function that takes points in a grid in x,y format. Calculate if the points form a rectangle. The arguments should be supplied as objects:
``` javascript
    var point1 = {x:1, y:2} // and so on for others
```
``` javascript
    function isRectangle(point1, point2, point3, point4){
        var centerX,centerY;
        var hp1,hp2,hp3,hp4;

        centerX=(point1.x+point2.x+point3.x+point4.x)/4;
        centerY=(point1.y+point2.y+point3.y+point4.y)/4;

        hp1=Math.pow((centerX-point1.x), 2)+Math.pow((centerY-point1.y), 2);
        hp2=Math.pow((centerX-point2.x), 2)+Math.pow((centerY-point2.y), 2);
        hp3=Math.pow((centerX-point3.x), 2)+Math.pow((centerY-point3.y), 2);
        hp4=Math.pow((centerX-point4.x), 2)+Math.pow((centerY-point4.y), 2);
        return hp1==hp2 && hp1==hp3 && hp1==hp4;
    }
```