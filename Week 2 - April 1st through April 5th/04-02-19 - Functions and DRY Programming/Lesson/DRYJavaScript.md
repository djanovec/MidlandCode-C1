## DRY JavaScript

Much like CSS and pretty much every programming language, it's important to make sure that your code does not unnecessarily repeat itself. This not only will help with memory usage (although in most cases of javascript it won't help a noticeable amount) but it will also immensely help with code legibility. 

In most cases this is done by extrapolating out snippets of code into reusable functions. Take the below for example:

``` javascript
if(x % 2 == 0){
    console.log("X is evenly divisible by 2")
}
else{
    console.log("X is not evenly divisible by 2")
}

if(x % 3 == 0){
    console.log("X is evenly divisible by 2")
}
else{
    console.log("X is not evenly divisible by 2")
}

if(x % 4 == 0){
    console.log("X is evenly divisible by 2")
}
else{
    console.log("X is not evenly divisible by 2")
}

if(x % 5 == 0){
    console.log("X is evenly divisible by 2")
}
else{
    console.log("X is not evenly divisible by 2")
}

if(x % 6 == 0){
    console.log("X is evenly divisible by 2")
}
else{
    console.log("X is not evenly divisible by 2")
}

if(x % 7 == 0){
    console.log("X is evenly divisible by 2")
}
else{
    console.log("X is not evenly divisible by 2")
}

```

How could we make this better? To be fair it doesn't need to be something this repetitive to extrapolate out a smaller function. Think ahead for something you might want to use and create a reusable function ahead of time. Much like the CSS rules we went over last week, doing work up front can save you a ton of code.