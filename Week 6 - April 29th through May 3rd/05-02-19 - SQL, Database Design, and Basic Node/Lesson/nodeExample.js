let reverse = require('./secondNode').reverse

let x = "This is a sentence.";
let y = reverse(x);

console.log(x, y);

//Actually Saying

// let obj = {
//     reverse: function reverse(str){
//         return str.split('').reverse().join('');
//     }
// }

// let reverse = obj.reverse