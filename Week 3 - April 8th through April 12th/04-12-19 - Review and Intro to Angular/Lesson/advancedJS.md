## More Advanced JS

We will be covering a lot of more advanced topics once we hit Angular including a lot of work with ES6 and classes but in the mean time here are some more advanced topics:

### ES6 / Advanced Topics

* let vs var vs const. Let allows you more block scope
* Variable hoisting - All declarations are moved to the top of the current scope. This can (but won't always) cause problems. Only declarations, NOT initialization will be hoisted.
* Arrow functions. This allows you to create an anonymous function on the fly easier. Take the following examples:
``` javascript
    function(e){
        console.log(e.target);
    }
    //Is identical to
    e=>{console.log(e.target);}

    //With multiple paramters
    function(a,b,c){
        //THINGS
    }
    (a,b,c)=>{//THINGS}

    //With only one parameter where the function returns on the only line
    function(a){
        return a*5;
    }

    a => a*5
```
* Spread syntax:
    ``` javascript 
    var parts = ['shoulders', 'knees']; 
    var lyrics = ['head', ...parts, 'and', 'toes']; 

    var arr = [1, 2, 3];
    var arr2 = [...arr]; // like arr.slice()

    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    arr1 = [...arr1, ...arr2];

    function myFunction(v, w, x, y, z) { }
    var args = [0, 1];
    myFunction(-1, ...args, 2, ...[3]);
    ```


### Classes

``` javascript
//Classes are always capitalized
class Rectangle{
    //Requires a constructor function.
    //You can have default values (for all functions)
    constructor(height = 1, width = 1){
        this.height = height;
        this.width = width;
    }
    getArea(){
        console.log(`The area is ${this.height * this.width}`)
    }
}

//Declare it with the new keyword
var myRectangle = new Rectangle();
var myOtherRectangle = new Rectangle(10,5);


//Classes that extend other classes...

class Square extends Rectangle{
    constructor(side){
        super(side, side);
    }
    getArea(){
        super.getArea();
    }
}

var mySquare = new Square(5);

```

