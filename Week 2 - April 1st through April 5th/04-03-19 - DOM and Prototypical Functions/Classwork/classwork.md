## Timing Practice

* Create a simple website with 3 divs with no styling.
    * Use JavaScript to change the background color of one of the divs background colors using any selector you prefer.
    * After 10 seconds, change the text-color of one div to anything you prefer
    * Every 2 seconds, change the background color to a random color in a list of 5 predefined colors you chose.
``` html
    <div class="randomColor" id="backgroundChange"></div>
    <div class="randomColor"></div>
    <div class="randomColor"></div>
```

``` javascript
    var divs = document.querySelectorAll('.randomColor')
    // same for singeBackground change
    var colors = [] // array of colors any format you choose;
    document.querySelector("#backgroundChange").style.backgroundColor = "red";
    window.setTimout(function(){
        // #backgroundChange.style.color = "blue"
    }, 10000)
    window.setInterval(function(){
        // select random element of colors loop through
        // div[i].style.backgroundColor = colors[Math.floor(Math.random()* colors.length)]
    }, 2000)
```


* Create a simple site that prompts the user for a time limit.
    * Start the clock/div with a green background added by a class.
    * Display the starting time on the DOM. 
    * Count the time down every second and update the dom.
    * When the timer reaches zero, remove the class with the green background and add one with a red background.
    * The timer should also stop counting down once the timer reaches zero.
``` html
    <div class="green"></div>
    <style> .green{background-color: green;}
```
``` javascript
    // grab the element timer count will go into and save to variable var div
    // Prompt and parseInt(prompt goes in here) and store in a variable let's call it timerStart;
    // var message = `${timerStart} seconds left`
    // div.innerText = message div.innerText = "<div style="background-color: blue;"></div>"
    // setInterval for every 1000ms when counter reaches 0 stop interval;
```

## Useful Prototypical Functions
* Write code to allow for someone to supply two numbers (either as a prompt or hard-coded in for testing) and then create a two dimensional array based off the numbers supplied. Example:
``` javascript
    //If 3 and 2 were supplied, it should create
    [[1,2],[1,2], [1,2]]
    // var arr = new Array(3);
    // loop through outer array adding in inner loop sub array (1-2)
    //If 2 and 3 were supplied it should create
    [[1,2,3], [1,2,3]]
```
* Take the following format and create 10 students in an array:
    ``` javascript
    {name: "Student name", score: number from 1-100}
    ```
    Sort the students in order of highest score to lowest score and then log them to the console in that order.
* Go through all numbers 1-100. Create three arrays and add numbers to them based off the following criteria:
    * Array One should have all numbers divisible by 2
    * Array Two should have all numbers between 16 and 25 (inclusive)
    * Array Three should have all numbers divisible by 4 AND 3
* Create an array with all numbers from 1-10. Copy the array and then using a prototypical function, replace all the numbers in the new array with the number multiplied by 3. eg: `[1,2,3,4,5] --> [3,6,9,12,15]`

### Canvas
* Take an image of your choice from the internet. Draw only the top left quarter of the image on a canvas.
* Draw a black circle and a red rectangle (non overlapping) onto the canvas

### Dom Practice
* Once the page loads, create 4 divs of different styling and add them to the DOM. The styling should be built in the raw javascript and should have the following styles:
    * Div 1 - Red background with black border, 200px by 200px
    * Div 2 - Blue background, circular shape, 100px by 100px
    * Div 3 - Orange Border, white with red text that says: "Div 3" 150px by 100px
    * Div 4 - Fixed to the top, any color not taken for background and taking up the full width of the page.
* Take the following html and css snippets:
    ``` html
        <div class="class1 class3">Div 1</div>
        <div class="class2">Div 2</div>
        <div class="class2 class4">Div 3</div>
        <div class="class1 class4">Div 4</div>
        <div class="class1 class2">Div 5</div>
        <div class="class5">Div 6</div>
        <div class="class5">Div 7</div>
        <div class="class1 class5" id="div8">Div 8</div>
        <div class="class5 class4" id="div9">Div 9</div>
        <div class="class1" id="div10">Div 10</div>
    ```
    ``` css
        div{
            height: 200px;
            width: 200px;
            border: 2px solid black;
        }
    ```
    and make the following changes in order:
    1. Every div with `.class1` should have an orange border
    2. Every div with `.class3` should have red text
    3. Every div with `.class4` should have blue text
    4. Remove `.class5` from all divs with `.class5` and replace with .class6
    5. Add `.class7` to ALL divs
    6. Remove the element with `#div8`
    7. Take the div with `#div9` and move it to the top
    8. All divs with `.class2` should have a black background with white text
    9. Take the div with `#div10` and reduce the height and width to 42% of what it was (without hard-coding the number) and then change the id to `div10New`

    ``` javascript
        document.querySelectorAll('.class1').forEach(function(val){
            val.style.border = "2px solid orange";
        })
        document.querySelectorAll('.class3').forEach(function(val){
            val.style.color = "red";
        })
        document.querySelectorAll('.class4').forEach(function(val){
            val.style.color = "blue";
        })
        document.querySelectorAll('.class5').forEach(function(val){
            val.classList.remove('class5');
            val.classList.add('class6')
        })
        document.querySelectorAll('div').forEach(function(val){
            val.classList.add("class7");
        })
        document.querySelector('#div9').remove();
        var div9 = document.querySelector("#div9");
        div9.remove();
        document.querySelector('body').prepend(div9)
        document.querySelectorAll('.class2').forEach(function(val){
            val.style.backgroundColor = "black";
        })
        var div10 = document.querySelector("#div10");
        div10.id = "div10New"
        div10.style.height = div10.clientHeight * .42 + 'px'
        div10.style.width = div10.clientWidth * .42 + 'px'

    ```