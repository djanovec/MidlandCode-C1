// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
//Immediately invoked function expression
// "use strict";


// (function(wdw){
//         var first = "Mike";
//         var last = "Truax";
//         if(!wdw.miketruax){
//             wdw.miketruax = {
//                 getName: function(){
//                     console.log(first+' '+last);
//                 },
//                 setFirstName: function(name){
//                     first = name;
//                 }, 
//                 setLastName: function(name){
//                     last = name;
//                 }
//             }
//         }
// })(window)

var you = prompt("Name please");
var youBackwards = you.split('').reverse().join('');

function helloWorld(){
    console.log(`Hello ${you}. Did you know your name backwards is ${youBackwards}`);
}

helloWorld();

(function(){
    var alsoYou = prompt("Name again please");
    var alsoYouBackwards = you.split('').reverse().join('');
    console.log(`Hello ${alsoYou}. Did you know your name backwards is ${alsoYouBackwards}`);
})()

console.log('--- END OF JS ----')
console.log("Outside IIFE: ");
console.log(you, youBackwards)
console.log("Inside IIFE: ");
console.log(alsoYou, alsoYouBackwards)


