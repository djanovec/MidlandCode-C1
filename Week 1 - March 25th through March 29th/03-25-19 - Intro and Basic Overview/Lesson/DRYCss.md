## DRY and Best Practices in CSS

Even though CSS is a very simplistic "language" it is still important to follow the DRY or "Don't Repeat Yourself" rules for all coding. This can be done in a multitude of ways ranging from the helpful to the absurd. The goal here is re-useability. It is also important because of the cascading nature of CSS that you do everything you can to follow proper usage of basic selectors.



### DRY Rules

* If you're going to be using a specific rule multiple times make it a separate class. Usually things like `text-align: center` will be broken out into it's their classes. If you know you're going to ONLY use centered text once or twice it's not needed. Likewise if it's only one class that uses the rule don't break it out.
* If a rule (such as the aforementioned `text-align`) is going to be used multiple times by numerous different classes and/or elements, create a new class for it. This could be as simple as creating:
    ``` CSS
        .text-center{
            text-align: center;
        }
    ``` 
    And then adding that to any element that needs that rule.
* In addition, because CSS cascades, if you're using a generic selector AND then also a more specific selector and they both have the same rule such as:
    ``` CSS
        div{
            background-color: red;
        }
        .some-class{
            background-color: red;
        }
    ```
    Decide if the less specific selector ACTUALLY needs it or if it's just going to be repeated unnecessarily.
* It's also important to know what the default values for your site and in general are so you can avoid unneeded repetition.

Let's take the following CSS code for some simple styling. Assuming this is the `ONLY` CSS for the page, what should be changed:

``` CSS
    div{
        color: black;
        text-align: center;
    }
    .some-class{
        color: white;
        text-align: right;
    }
    .second-class{
        color: black;
        text-align: right;
    }
    .third-class{
        color: black;
    }
    .fourth-class{
        background-color: red;
        text-align: center;
    }
```

### Best Practices
There are a lot of best practices and you'll find more as we go along but here are the big ones
* Follow DRY practices at all times. Let's be honest, some times you won't start off DRY as you might change styling and then realize you're utilizing something in a ton of different selectors. That's ok as long as you go back and DRY it.
* Make your stylesheets (ideally) external to help with any sort of screen flickering if the sheet takes too long to load compared to the page itself.
* Make your stylesheet(s) legible and clearly layed out. If you have font styling for headers and sub-headers, keep them together. 
* Make sure your classes are named in a logical way. `.heading{}` and `.sub-heading` are clear. But `.top-heading{}` might not be. I say might not because what happens if you want to add a `.bottom-heading{}`? Is top-heading the top most heading, or is it the top most level of headings? It might be clear to you now, but will it be clear to someone else?
* Pick a case and stick to it!! If you want to go with camelCase, that's fine. Kebab case? Totally cool as well. But don't mix the two. Usually you'll go with whatever is the expectation of your employer. Just a heads up though, JavaScript (and pretty much ALL programming languages used in web development) don't allow variable names in kebab case. Not saying don't use it for CSS (I use it for CSS a ton) just be mindful of that when we switch to JS next week.
