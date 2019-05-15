# Review Topics

# Observables, Promises, and Callbacks
## Differences
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
## Async/Await
``` javascript
async function doTheThing(){
    let newVar = await somehttpcall()
    newVar.forEach(v=> console.log(v));
    let x = 5;
    console.log(x);
}
```
## Observable piping / changing data emitted
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
## Callbacks
* Callback fires when the Promise finishes, 
* Similar to subscribe in observables but the callback only happen once
* Callbacks basically only used with Promises
## Best Practices
* Make sure you only use Observables/Promises in appropriate asynchronous programming
* Subscribe to Observables to get ANY data from them
* Make sure you're handling any potential errors from the Observable Stream or in the Promise chain



# Form Validation
## Reactive Forms
* Must import `ReactiveFormsModule` into your `app.module.ts` file.
``` typescript
//Signup Component Controller
import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
selector: 'signup',
templateUrl: "./signup.component.html",
styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
signupForm: FormGroup;
constructor(private userService: UserService, private formBuilder: FormBuilder) { }

get username(){
    return this.signupForm.get('username')
}

get email(){
    return this.signupForm.get('email')
}
get password(){
    return this.signupForm.get('password')
}

get confirmPassword(){
    return this.signupForm.get('confirmPassword')
}

signup(e) {
    e.preventDefault();
    if(this.signupForm.valid){
    this.userService.signup(this.username.value, this.password.value, this.email.value);
    }
}

ngOnInit() {
    this.signupForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
    password: ['', Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(8)])],
    confirmPassword: ['' ]
    });

}}
```
``` html
<form class="signup-form" role="form" (ngSubmit)="signup($event)" [formGroup]="signupForm">
    <input formControlName="username" type="text" class="" placeholder="Username">
    <div *ngIf="username.errors && (username.dirty || username.touched)">
        Username must be between 3 and 16 characters
    </div>
    <input  formControlName="email" type="email" class="" placeholder="Email">
    <div *ngIf="email.errors && (email.dirty || email.touched)">
        Valid email is required
    </div>
    <input formControlName="password" type="password" class=""  placeholder="Password">
    <div *ngIf="password.errors && (password.dirty || password.touched)">
        Password must be between 8 and 128 characters.
    </div>
    <button type="submit">Submit</button>
</form>
```
## Template Driven
``` typescript
    // Let's say we have an object interface that includes username, email, password named User
    user: User;
    signupUser(){
        this.userService.signup(this.user.username, this.user.email, this.user.password);
    }
```
``` html
<form class="signup-form" role="form" name="form" (ngSubmit)="signUpForm.form.valid && signupUser()" #signUpForm="ngForm">
    <input required minLength="3" maxLength="13" name="username" [(ngModel)]="user.username" #username="ngModel" type="text" class="" placeholder="Username">
    <div *ngIf="username.errors && (username.dirty || username.touched)">
        Username must be between 3 and 16 characters
    </div>
    <input required email name="email" [(ngModel)]="user.email" #email="ngModel" type="email" class="" placeholder="Email">
    <div *ngIf="email.errors && (email.dirty || email.touched)">
        Valid email is required
    </div>
    <input required minLength="8" maxLength="128" name="password" [(ngModel)]="user.password" #password="ngModel" type="password" class=""  placeholder="Password">
    <div *ngIf="password.errors && (password.dirty || password.touched)">
        Password must be between 8 and 128 characters.
    </div>
    <button type="submit">Submit</button>
</form>
```
## Best Practices
* Give error messaged to the user
* Validate all possible requirements
* Keep the form from submitting (and ideally disable the button) until the form is valid



# Directives
## Pre-built directives
* ngFor
* ngIf
* ng-container
* ngModel
* And many more!
## Custom Directives
* Each Directive houses it's own information for the element it binds to 
* General Setup
``` typescript
    @Directive({
        selector: '.aClass' // bind to any element with a class 'aClass'
            // "my-directive" would be replaced where the <my-directive></my-directive> tag is
            // ".someClass" would be used anywhere that class is.
            // "[attrName]" where an attribute by that name is on an element
            // You can also use the :not() format
    })
    export class NewDirective{

        //Functionality of your directive
    }
``` 
* Binding to events / listen for Events
    ``` typescript
    //Inside the class
    //            v event v    v callback v
    @HostListener('mouseover') onMouseOver(){
        console.log('welcome to the element!');
    }
    ```
* To update the element(s) data
    ``` typescript
    @HostBinding('attribute you want to bind to') private varName: typeOfNeededVar;
    ```
* Example Directive
    ``` typescript
        import { Directive, Input, OnInit, HostBinding } from '@angular/core';

        @Directive({
        selector: '[birthday]'
        })

        export class MissedBirthdayDirective implements OnInit{
            @Input() birthday: string;
            myBirthday: Date = new Date('1980-01-01')
            constructor() { }
            @HostBinding('class.missed') private missed: boolean;
            @HostBinding('class.is-older') private isOlder: boolean;

            checkDate(){
                let now = new Date(Date.now());
                let userBday = new Date(this.birthday)
                this.isOlder =  userBday < this.myBirthday;
                this.missed = (userBday.getMonth() < now.getMonth() || 
                (now.getMonth() === userBday.getMonth() && userBday.getDate() < now.getDate()))
            }
            ngOnInit(){
                this.checkDate();
            }
        }
    ```
    ``` html
    <div [birthday]="'2000-07-02'"></div>
    ```
## When to use a directive over component functionality
* Smaller processes
* Reusable across multiple components
* Conditional Functionalty (classes / styling)
* Functionality based off inputs
* NOT when It's component specific
* NOT when you need secure functionality
* NOT for something that can be done with a series of existing directives



# APIs
## Setting up an API
* Need to know schema / tables
* Need to decide what to protect / make public
* Need to decide what information to get and return to any given route
* Ensure all possible errors are handled
## Consuming responses / requests
* Need to know what is required from the user
* How much data to return / format of return
* Set proper status codes with response
    ``` javascript
    res.status(402).send({err: error, result: null})
    ```
## Ensure that all formats of return for your API are the same
    ``` javascript
        //without error
        res.send({err: null, result: []})
        //with error
        res.send({err: errorObject, result: null})
        //Maintain that format throughout
    ```
## Angular Service API Calls
* Need to know URL / Keys / Format of API
* Format of the API call
    ``` typescript
    import { Injectable} from "@angular/core";
    import { HttpClient } from "@angular/common/http";
    import { pipe } from 'rxjs';
    import { map, catchError } from 'rxjs/operators';

    @Injectable()
    export class UserService{
    constructor(private http: HttpClient) {
    }
    // Assume we have a users/signup route that returns either a success message or an error
    // And a users/login route that returns an error or the user
    // Assume we want to subscribe in our service
        login(user){
            this.http.post("/users/login", user).pipe(
                map(res=> {
                    if(res.error){
                    throw new Error(res.error)
                    }
                    return res.result
                })
                catchError(err=> throw new Error("Something went wrong, please try again later"))
            )
            .subscribe(
                { 
                    next: res => console.log(res), 
                    error: err=> console.log(`Error: ${err}`)
                }
            )
        }

        signup(user){
            this.http.post("/users/signup", user).pipe(
                map(res=> {
                    if(res.error){
                        throw new Error(res.error)
                    }
                    return res.result
                })
                catchError(err=> throw new Error("Something went wrong, please try again later"))
            )
            .subscribe(
                { 
                    next: res => console.log(res), 
                    error: err=> console.log(`Error: ${err}`)
                }
            )
        }
    }
    ```
##  Database Connections
* Store all of your information in a `config.js` file that is ignored from github 
    ``` javascript
        process.env.DBHost = "HOST URL OF YOUR DATABSE"
        process.env.DBUSER = "USER";
        process.env.DBPASSWORD = "DB PASSWORD"
        process.env.DBPORT = "DBPORT"
        process.env.DATABASE = "DATABSE/SCHEMA NAME"
    ```
* Reference the `process.env.?` in your connections file:
    ``` javascript
    let mysql = require("mysql");
    require("../config");
    let pool = mysql.createPool({
    connectionLimit: 10,
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DATABASE,
    port: process.env.DBPORT
    });
    module.exports = pool;
    ```
* Import the pool in any file you need to use the connection for a query: `let pool = require("../connections")`
* Use that pool to access the database with a query:
    ``` javascript
        // To grab all posts with a set userId 
        pool.query('SELECT * FROM POSTS WHERE userId = ?', [req.body.userId], (err, results)=>{
            res.send(results);
        })
        //To grab all posts
        pool.query('SELECT * FROM POSTS', (err, results)=>{
            res.send(results);
        })
    ```
* If you need to see what the `req.body` is for any queries you can add a `console.log(req.body)` which will then log to the console the `node/nodemon server` command is running.
* If all data is being sent and an error is happening / no data returned, log out the error in the `pool.query` (in the above example): `console.log(err)`


# Angular General Review and Communication
## Object Interfaces
``` typescript
// IN user.model.ts
export interface User {
    username: string,
    password: string,
    email: string
        confirmPassword?: string //not required but still exists on the type
    }
    //In controller
    import {User} from '../models/user.model'
    // In controllers class
    user: User
```
## Data Binding
## Parent/Child Communication
## Service Based Communication



# Styling and Angular MD
## SCSS
## Table Setup
## Angular Setup
## Custom Themes



# Routing and AuthGuards
## Routing in Angular
* Angular CLI allows for a routing file to be generated as part of `ng new`
    ``` typescript
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';

    const routes: Routes = [];

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }
    ```
* Your routes array is where all of your routes go.
* Routes are arrays that contain any information about the route and what it needs to do
    ``` typescript
    {path: 'home', component: HomeComponent}
    ```
* Options for Routes in the object
    * `path` - The path where the route will be triggered `home` or `home/jobs` never starts with a `/`. Paths that include `:` followed by a variable name are paths that can be used to pull out the variable name and any value will work for that route. `user/:id` will work with `user/ANYTHING` and the part after the `user/` can be pulled out in a component or resolver. `**` for the path will be ANY path not otherwise declared in the route array. This will always be the last route declared.
    * `pathMatch` - options for this are `prefix` or `full`. `full` allows for paths like `team/:id` and `team/11/user` to both work
    * `component` - the component that will load on that given route.
    * `redirectTo` - allows to redirectTo a declared path instead of loading a component. Can be any valid path.
    * `canActivate`, `canLoad` - takes an array of AuthGuards that fire on those specific route guards. 
    * `data` - allows for the passing of data as part of a route. Not really used in most cases. Equivalent of using a param as described above but not show it in the browser's url.
    * `resolve` - Fires off a resolver when loading the route.
## AuthGuards
* Can be used to restrict access to specific routes. Can be generated via the angular CLI `ng g g nameOfGuard`
* Takes advantage of one of the built in functions such as `canActivate` (used in like 90% of all AuthGuard cases)
* Expects a boolean or Promise boolean or Observable boolean to be returned. True means they CAN access the route, false means they CANNOT
    ```typescript
    import { Injectable } from '@angular/core';
    import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
    import { Observable } from 'rxjs';
    import { Router } from '@angular/router';
    import { UserService } from '../services/user.service' //Pretend that this exists

    @Injectable({
    providedIn: 'root'
    })
    export class UserGuard implements CanActivate {
    constructor(private userService : UserService, private router: Router){}
        canActivate(
            next: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            if(this.userService.isLoggedIn){ //isLoggedIn would be something we'd make on the user service
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        }
    }
    // IN THE ROUTE FILE
    {path: 'user', component: UserComponent, canActivate: [UserGuard]}
    ```

## Resolvers
* Allows for some funcitonality to occur before the route actually loads.
* Will hang up the route and cause a potential infinite delay if it never ends / has no return value
* Example: 
    ``` typescript
        import{Injectable} from '@angular/core';
        import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
        import {Observable} from 'rxjs/Observable';

        @Injectable({
            providedIn: 'root'
        })
        export class AppResolver implements Resolve<any>{
            constructor(){
            }
            resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any>{
                console.log('Router resolver has been triggered');
                return SomeObservable
            }
        }
        // In the routes array
        const routes: Routes = [{path: '', component: HomeComponent, resolve: {appResolver: AppResolver}}]
    ```

## Best Practices
* For AuthGuards redirect them to an appropriate path if they can't active. Redirect to `login` if they try to access a user only route.
* Use clear semantic routes. `/home` in lieu of `/websitehome`
* Redirect to top level (or show a 404 component) for all undeclared routes.
* Take advantage of AuthGuards.
* Be careful about what params you use and why you use them.



# Database Structure Best Practices
* Separate out information as much as possible
* Keep in mind if you have too much informaton in a table
* Take advantage of joining tables whenever possible
* Think about how hard it'd be to update information in the future.
* Take a look at repeating information in the tables.



# Authentication / Passport
## When to use what
## Best Practices



# Express and Server Setup
## Overall Structure
## Best Practices



# IFTTT



# General Node and CLI Package Review
## Different CLI Commands
## Node Review



# General JavaScript Review
* Arrow Functions provide syntactical sugar for functions.
    ``` javascript
        // SINGLE LINE WITH ONLY A RETURN
        // Non arrow function
        function randomNumber(min, range){
            return Math.floor(Math.random() * range) + min;
        }
        //Arrow funciton
        let randomNumber = (min, range) =>  Math.floor(Math.random() * range) + min;
        // MULTI LINE
        function randomNumber(min, max){
            let range = max-min;
            return Math.floor(Math.random() * range) + min;
        }

        let randomNumber = (min, max) => {
            let range = max-min;
            Math.floor(Math.random() * range) + min;
        }
        //With only one param AND one line as a return
        param => param+2;

        //Anonymous function
        let arr = [1,2,3,4,5]
        //Non Arrow
        let lessThan4 = arr.filter(function(val){
            return val < 4;
        })
        //Arrow
        let lessThan4 = arr.filter(val => val < 4);
    ```
* Higher order functions - Functions that take functions as arguments.
* Closures - Functions that return functions that allow for separation of scope.
    ``` javascript
        function multiplier(a){
            let timesCalled = 0;
            return function(b){
                timesCalled++;
                console.log(`TimesCalled with multiplier ${a}: ${timesCalled}`);
                console.log("Result: ",a*b);
            }
        }
        const timesTwo = multiplier(2);
        const timesThree = multiplier(3);
        // Without Closures
        let timesCalledTwo = 0;
        function timesTwo(b){
            timesCalledTwo++;
            console.log(`TimesCalled with multiplier 2: ${timesCalledTwo}`);
            console.log("Result: ",2*b);
        }
        let timesCalledThree = 0;
        function timesThree(b){
            timesCalledThree++;
            console.log(`TimesCalled with multiplier 3: ${timesCalledThree}`);
            console.log("Result: ",3*b);
        }
    ```
* This - The scope where the thing you're referring to `this` lives inside of.
    ``` javascript
    let obj = {
        age: 30,
        maxAge: 40,
        yearsUntilMax: () => this.maxAge - this.age; //'this' refers to the object it lives inside of.
        }
    }
    this.age // here means nothing
    obj.age // only way to access outside of the object.
    ```
* Hoisting - Moving var and functions declarations to the top of the scope before code is executed. Does not hoist initializations.
    ``` javascript
        let x; // Hoisted regardless of where in file
        let y = 10; // NOT hoisted
    ```
* Inheritance - In let's say an `array` ALL arrays have access to ALL prototypical functions of arrays like `.join`, `.forEach`, etc. You can if you want to actually create NEW prototypical functions and then ALL elements of that type will inherit that new function.
    ``` javascript
            Array.prototype.mikesName = "Mike"
        }
    ```
## ES6
* All things added: [New in ES6](http://es6-features.org/#Constants)
* Importing/exporting
    ``` javascript
        //ES5
        module.exports = function randomNum(a,b){
            return Math.floor(Math.random()* b)+a
        }
        let random = require('../randomNum')

        //ES6
        export randomNum(a,b){
             return Math.floor(Math.random()* b)+a
        }
        import {randomNum} from '../randomNum'
    ```
* Classes were added in ES6 where before you had to use objects only.
* Arrow Functions added in ES6
* `async` `await` added in ES6

# General Jr. Dev Requirements and Keeping up to Date with Web Dev topics, Contract Work
## Key things to work on / Jr Dev Foci
* Solid working portfolio projects
    * Showcase your skills
    * Be prepared to discuss problems/solutions
    * Talk about why you chose the techs you did
    * Talk about / be prepared to talk about order of attack
* Prepping for the Interview [Manager Tools](www.manager-tools.com)
    * Brush up on interview topics
    * Study techs you'll be using 
    * Study the company itself AND interview panel
    * Tailor your resume to the job you're applying to (or just have a solid resume)
    * Bring notepad and take notes
    * Be prepared to talk in depth about anything on your resume / GitHub
    * ASK QUESTIONS OF THE PANEL
        * Ask for clarification on questions they ask.
        * As a junior developer what kind of feedback can I be expecting in your company?
        * How do I know that I've put in a good day's work?
        * How do you enjoy working here and what makes you excited about coming into work?
        * What's the biggest problem the company is going to be facing in the next year?
        * How fast can a change that fixes a typo on the website get out into production?
    * Prep for where to park/ what to wear / who to talk to and test the route
    * Don't be afraid to make jokes / make them laugh
    * If you didn't get the job, ask why.
    * Hardest Questions:
        * So the interview is over and I call you tomorrow saying you didn't get the job. Why didn't I give it to you?
        * What's the thing that you built that you're most proud of?
        * Hypothetical questions that force critical thinking / thought process.
        * What's the most unique solution you've come up with for a problem?
        * Describe a situation you've had a hard time finding a solution and how you worked through it.
        * What does it look like when you're stressed?
    * Ask for business cards and send thank you cards. 
* Get paid your worth and don't take stock in lieu of money. 
    * Be wary of companies that say they have an `awesome startup feel`.
## Keeping your skills fresh
* Listen to podcasts
* Follow popular programmers on Twitter.
* Teach yourself via documentation and Stack Overflow.
* Work on personal projects that challenge you either in new techs or ones you know. 
* Attend meetups and learning groups.
* Don't get caught up in hype of the new hotness.
* Always have a side hustle.
## Contract Work
* Overestimate time needed - (My expected time) + 10% + Time for at least 3 iterations.
* Protect yourself at all costs. - Errors and Omissions Insurance
* Keep track of actual hours worked.



# Best Practice Reviews
* Ensure you have appropriate names for variables and functions.
* Use types in typescript whenever possible.
* Comment your code as if you will never touch it again and someone else will. 
    ``` javascript
    //No Comments Needed
    if(userBirthday < myBirthday){
        howMuchOlder()
    }
    else{
        howMuchYounger()
    }
    //Comments Needed
    if(userInput !== startPoint){
        calculateDiff(userInput, startPoint);
    }
    else{
        showSame();
    }
    ```
* Try to handle all errors and reasonable edge cases. You don't want your app to fail silently.
* Follow the code guidelines of your company.
* Read through the docs for best practice / coding style.



# Work Prioritizaion / Compartmentalization
## Order of Work
* Research what you have to do and what techs you need.
* Break out dependencies. And then work forwards from least dependent.
* Know the scope and requirements of the project / end user.
## How to compartmentalize tons of work 
* View what funcitonality you need from a base standpoint.
* Like with like, communication pieces together based off from and to the communication is happening.
* View language / framework / library differences and tackle those together if possible. 
* View each large functionality as a puzzle try to find all of the differences. And follow DRY.
* Almost no such thing as pieces that are too small.
* Use Kanban / Trello / Whiteboard



# Unit Testing