## So Let's talk about Sass, and no I don't mean what you see in most 90s family sitcoms

### General Overview
* Simply put: Sass is a different way to program CSS
* Utilizes a more clear file structure to help with coding styles
* Allows for easy separation of styling code for parent/child elements.

### Major Notes
* All style files will be in `.scss` files as opposed to `.css` files
* `.scss` files CANNOT be understood by the browers and MUST be compiled into css using some form of task runner such as webpack or gulp/grunt
* Allows for the creation of variables and `mixins` that allow you to easily reuse code

### Example

In raw css let's assume the following code: 
``` CSS
    .parent{
        background-color: black;
    }

    .parent .child1{
        color: orange;
    }

    .parent .child2{
        color: yellow;
    }

    .parent .child1, .parent .child2{
        background-color: black;
    }

    .parent:not(.anotherClass){
        text-transform: capitalize;
    }
```
in SASS it could be shown written as: 

``` CSS
    .parent{
        background-color: black;

        &:not(.anotherClass){
            text-transform: capitalize;
        }
        .child1{
            color: orange;
        }

        .child2{
            color: yellow;
        }

        .child1, .child2{
            background-color: black;
        }
    }
```
As you can see above it uses a nesting structure to make it clearer what your code is doing without the use of a ton of extra declarations. Everything that styles the parent and its children is kept together in a nested format. 

Now obviously this is fairly straight forward, but lets say you have a ton more code that just what is being shown above. If you have a lot of style in each of the code blocks above you'll really start to see the benefit of SASS

### Declaring Variables in SASS

One of the most useful additions with the use of SASS is the ability to declare variables as well as what are referred to as `mixins` and `extend(s)`. Not only are these both incredibly useful but they are also very easy to declare.

#### Variables
* Think about an app that might have a primary color, accent color, and text color. With basic CSS you would have to actually declare the value (hex, rgb/rgba, cyk, etc.) each time you want to use that color. So with a primary color of `#4432AF` you would actually have to type that in EVERY use of that color. Not that big of a deal but what happens if you need to change the color? You would have to change it EVERYWHERE.
* Taking the above example you can simply declare a primary-color variable then use that in SASS. To declare a variable it is as simple as `$primary-color: #4432AF`. 
* To use that color anywhere in your SASS you need to do 1 (or two depending on the location of the actual variable declaration)
    1. If the variable declaration is in the same SASS file, skip to step 2. Otherwise include an `@import pathtofilewithvariable` at the top of your sass file using the variable.
    2. Replace the `#4432AF` with `$primary-color`. This would then look like `background-color: $primary-color;`
* Any time you change the value of primary-color it updates every appearance of the variable at declaration.


#### Mixins - The functions of SASS
* Let's say you have a series of CSS that you will repeat a lot but with different values such as:
    ``` CSS
        .someClass{
            margin: 10px;
            height: 10px;
            width: 10px;
        }
        .someOtherClass{
            margin: 5px;
            height: 5px;
            width: 5px;
        }
    ```
* If you want to follow DRY principles then you can use a mixin for that! You would declare it as:
    ``` SCSS
        @mixin nameOfMixin($value){
            margin: $value;
            height: $value;
            width: $value;
        }
    ```
* You could then simply call the mixin with the appropriate values and simplify the first example as:
    ``` SCSS
        .someClass{ @include nameOfMixin(10px)}
        .someOtherClass{ @include nameOfMixin(5px)}
    ```

#### Extends - We must make it DRYer!

* So what happens if you don't need to have different values but you'll be repeating parts of the same code verbatim for different selectors?
* Enter the extend! Assume you have the following code:
    ``` CSS
        .someClass{
            margin: 10px;
            height: 10px;
            width: 10px;
            background-color: orange;
        }
        .someOtherClass{
            margin: 10px;
            height: 10px;
            width: 10px;
            background-color: black;
        }
    ```
* Sure you could just refactor it as below, but that defeats the purpose of clean organization in SASS
    ``` CSS
        .someClass, .someOtherClass{
            margin: 10px;
            height: 10px;
            width: 10px;
        }
        .someClass{
            background-color: orange;
        }
        .someOtherClass{
            background-color: black;
        }
    ```
* For the above you should declare an extend and reuse it. This can easily be done as follows: 
    ``` SCSS
        %equal-size{
            margin: 10px;
            height: 10px;
            width: 10px;
        }
    ```
* Then just call it as follows: 
    ``` SCSS
        .someClass{
            @extend %equal-size;
            background-color: orange;
        }
        .someOtherClass{
            @extend %equal-size;
            background-color: black;
        }
    ```
