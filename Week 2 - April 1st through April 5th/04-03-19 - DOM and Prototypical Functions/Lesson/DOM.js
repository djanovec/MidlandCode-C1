console.log("The DOM:", document);


// document.querySelector(CSS SELECTOR)
// Selects first node only
console.log('Query Selector:', document.querySelector('.someDiv'));



//document.querySelectorAll(CSS SELECTOR)
//Selects all elements and returns nodes as array.
//Can Use [0], [1], [2] etc for ease of accessibility.
console.log('Query Selector All:', document.querySelectorAll('.someDiv'));
console.log('Query Selector with :not', document.querySelectorAll('.someDiv:not(.anotherDiv)'))


//document.getElement(s)By return Elements

//document.getElementsByClassName
document.getElementsByClassName('someDiv');

//document.getElementsByTagName
console.log(document.getElementsByTagName('meta'));

//document.getElementsByName
console.log(document.getElementsByName('someInput'));

//document.getElementById
console.log(document.getElementById('divID1'));

//So What can we do now? Let's take a look!
//Let's take a look at the tree!


function changeColors(){
    function randomColor(){
        return Math.floor(Math.random()*256)
    }
    var divs = document.getElementsByClassName('someDiv');
    for(var i = 0; i < divs.length; i++){
        divs[i].style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    }
}