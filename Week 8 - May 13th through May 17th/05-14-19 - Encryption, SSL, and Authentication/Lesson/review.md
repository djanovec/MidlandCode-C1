# Review Topics

* Observables, Promises, and Callbacks
    * Differences
        * Promises Happen once and then done
            ``` javascript
            // Raw Promise
            function getRes(){
            fetch("www.someUrl.com")
            .then(res=> res.json())
            .then(json=> console.log(json))
            }
            // Async Await
            async function getRes(){
                let res = await fetch("www.someUrl.com");
                let json = await res.json();
                console.log(json);
            }
            ```
        * Observables work with data streams and propogation of change
            ``` typescript
            getRes(){
                this.http.get("www.someUrl.com").subscribe(res=> console.log(res))
            }
            ```
    * Async/Await
        ``` javascript
        async function doTheThing(){
            let newVar = await somehttpcall()
            newVar.forEach(v=> console.log(v));
            let x = 5;
            console.log(x);
        }
        ```
    * Observable piping / changing data emitted
        ``` typescript
        //Emits ALL data at all times in the form it was received
        // IF we only wanted the 'results' key of the response we'd have to say
        getRes(){
            this.http.get("www.someUrl.com").subscribe(res=> console.log(res['results']))
        }
        //If I wanted to automatically use that key during the Observable setup
        getRes(){
            this.http.get("www.someUrl.com").pipe(
                map(res=> res['results']), 
                catchError(err=> return of({error: "Something went wrong"}))
            )
            .subscribe(res=> console.log(res))
        }
        ```
    * Callbacks
        * Callback fires when the Promise finishes, 
        * Similar to subscribe in observables but the callback only happen once
        * Callbacks basically only used with Promises
    * Best Practices
        * Make sure you only use them in appropriate asynchronous programming
        * Subscribe to Observables to get ANY data from them
        * Make sure you're handling any potential errors from the Observable Stream or in the Promise chain
* Form Validation
    * Best Practices
    * Template Driven
    * Reactive Forms
* General Jr. Dev Requirements and Keeping up to Date with Web Dev topics
    * Key things to work on
    * Keeping your skills fresh
* APIs
    * Setting up an API
    * Consuming responses
    * Login/Signup Responses
    * Database Connections
* Angular General Review and Communication
    * Data Binding
    * Parent/CHild Communication
    * Service Based Communication
* Routing and AuthGuards
    * Routing in Applications
    * AuthGuards
    * Best Practices
* Directives
    * Pre-built directives
    * Custom Directives
    * When to use a directive over a component
* Database Structure
    * Database Design
    * Best Practices
* Authentication / Passport
    * When to use what
    * Best Practices
* Express and Server Setup
    * Overall Structure
    * Best Practices
* Best Practice Reviews
    * Generic Overview
    * Specific Q&A
* Work Prioritizaion / Compartmentalization
    * Order of Work
    * How to compartmentalize tons of work 
* IFTTT
* General Node and CLI Package Review
    * Different CLI Commands
    * Node Review
* Styling and Angular MD
    * SCSS
    * Table Setup
    * Angular Setup
    * Custom Themes
* General JavaScript Review
    * This
    * Then
    * Hoisting and Inheritance
    * ES6
* Unit Testing