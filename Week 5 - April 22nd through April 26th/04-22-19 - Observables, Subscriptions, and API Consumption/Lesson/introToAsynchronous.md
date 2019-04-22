## What is Asynchronous Programming?
* Allows for things to happen concurrently and in no particular order (sort of)
* Types of Asynchronous Values
* Things to look out for with Promises

### Promises... promises
* Promises were added as a way to handle callbacks for asynchronous functionality. 
* You can connect a series of functions together that when the promise resolves (in a lot of cases, an API call) it goes through the chain of commands (the `promise chain`) and executes the functions in order. 


* How do you declare a promise and why would you want to?
    1. Some promises are fairly straight forward in regards to declaration, take for example this form the MDN docs: 
    ``` javascript
    fetch('http://example.com/movies.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
    });
    ```
    2. The above example shows you how you can chain things together. Basically a promise chain is a series of callbacks where the return value of the previous link in the chain gets pushed back into the next.
    3. You can even handle errors in a promise chain by adding something like the following to the end: 
    ``` javascript
        .catch(error =>{
            console.error("The following error has occurred:", error.message)
        })
    ``` 
    4. Promises are great when you don't want to have your app waiting on an external site. But this can lead to problems depending on your scenario.
* Limitations on promises
    1. They're meant for a single fire and do a thing when you can. 
    2. Because of the above, if things change between the time the callback started and the callback ended, those changes aren't noticed.
    3. Likewise it will NOT keep things in sync and much like a function, it needs to be explicitly evoked each time something happens. 


## What if we want to run the same thing over and over on a change, OR we want to keep getting data from a source of some sorts?
