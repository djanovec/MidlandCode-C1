# Review Topics


# Angular General Review and Communication
* [Angular CLI Commands](https://angular.io/cli)
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
* Two Way Binding
    * Used to keep template and controller in sync
    * Generally used exclusively with `ngModel`
    * Must have a class variable in the controller
    * Used with `[(ngModel)]="Name of Var in controller`
* One Way Controller => Template
    * Used to update info in the template whenevr it updates in the controller
    * Used in TONS of different ways and places
    * Outside of html tags: `{{varInController}}`
    * In HTML tags `[attribute]="var in controller"`
    * Can be used in conjuction with parent => child communication
* One Way Template => Controller
    * Allows for functionality on the controller to be fired by the template
    * Biggest use cases are `(click)="someFunctionOnController()` and `(ngSubmit)="someFunction()"`
    * Can be used in conjuction with parent <= child communication
## Parent/Child Communication
* Parent to Child Communication
    * Done with attribute binding.
    * IS ONLY ONE WAY.
    * Think of it as updating the template but the template you're updating is housed elsewhere.
    * Example:
        ``` typescript
            // In Parent Class
            usersInParent: User;
            // In Child Class
            @Input() usersInChild; // Doesn't have to be the same name this is how you'd reference it in the child.
        ```
        ```html
            <!-- In parent -->
            <child-component [usersInChild]="usersInParents"></child-component>
        ```
    * As it updates in the parent that update will flow down and update the variable it is bound to in the child.
* Child to Parent Communication
    * Used to send values up to the parent via event triggering
    * ONE WAY ONLY
    * In order to work needs a function in the child that then triggers a function in the parent.
    * Example:
        ``` typescript
        //In Parent
        getChildMessage(msg: string){
            console.log(msg)
        }

        //In child
        @Output() messageEvent = new EventEmitter<string>(); // could be any type in the <>


        sendMessage(msg){
            this.messageEvent.emit(msg);
        }
        ```
        ``` html
        <!-- In Parent -->
        <child-component (messageEvent)="getChildMessage($event)"></child-component>

        <!-- In Child -->
        <div (click)="sendMessage('hello')"></div>
        ```
## Service Based Communication
* Used when you need to talk amongst sibling components
* Best to pull out shared functionality from components.
* Can also be used to obsucre data from the components/users
* Assume we have a service called `UserService` that has the variable `user` and `getUser()` which gets the value and `setUser(user)` which takes new data and sets it to `user` in the service.
    ``` typescript
    //Component A
    user: User
    constructor(private userService: UserService){
        this.user = this.userService.getUser()
    }
    //Component B
    user: User
    constructor(private userService: UserService){
        this.user = this.userService.getUser()
    }
    updateUser(user){
        this.userService.setUser(user);
    }
    //Whenever it's updated in component B, when we return to component A the new value will be shown.
    ```
* Used to keep the state since Components will update and reinitialize data each time in most cases.


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


# Styling and Angular MD
* Always use separate `scss` files per component
* If you need to have universal styling use the `styles.scss`AVOID THIS IF YOU CAN
## SCSS
* Works the same as CSS if you want it to.
* Allows for nesting:
    ``` css
        /* Raw CSS */
        .parent{
            color: blue;
        }
        .parent:not(.class){
            border: 1px solid black;
        }
        .parent .child{
            background-color: orange
        }
        /* SCSS */
        .parent{
            color: blue;
            &:not{
                border: 1px solid black;
            }
            .child{
                background-color: orange;
            }
        }
    ```
* Allows for variables
    ``` scss
        $primary-color: blue;
        .class{
            background-color: $primary-color;
        }
    ```
* Mixins
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
## Angular MD Setup
* Create a secondary module file. I normally name it `material.ts`
    ``` typescript

    import {A11yModule} from '@angular/cdk/a11y';
    import {DragDropModule} from '@angular/cdk/drag-drop';
    import {PortalModule} from '@angular/cdk/portal';
    import {ScrollingModule} from '@angular/cdk/scrolling';
    import {CdkStepperModule} from '@angular/cdk/stepper';
    import {CdkTableModule} from '@angular/cdk/table';
    import {CdkTreeModule} from '@angular/cdk/tree';
    import {NgModule} from '@angular/core';
    import {
    //   ANY MATERIAL MODULES YOU NEED
    } from '@angular/material';

    @NgModule({
    exports: [
    //SAME MATERIAL MODULES AS ABOVE
    ]
    })
    export class MaterialModule {}

    ```
* Import MaterialModule into your `imports` array in `app.module.ts`
* Follow docs for usage in the template
## Custom Themes
* You need to make sure your color scheme meets accessibility guidelines
* Use either a graphic designer or color scheme helper of some sorts [coolers.co](https://coolors.co/)
* For easier use, use [this site](http://mcg.mbitson.com/)

# Unit Testing



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



# Authentication / Passport
## When to use what
## Best Practices



# Database Structure Best Practices
* Can be done via SQL interface as well as raw SQL via some form of connection
* Separate out information as much as possible
* Keep in mind if you have too much informaton in a table
* Take advantage of joining tables whenever possible
* Think about how hard it'd be to update information in the future.
* Take a look at repeating information in the tables.


# Deployment Issues and Questions
If you want to use a MySQL database, go to the Resoures Tab and search for [`ClearDB`](https://elements.heroku.com/addons/cleardb). It will add a `CLEARDB_DATABASE_URL` config variable in your Settings tab. This will be the information you need to access it via a desktop application such as [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

## Important Steps
* Pull out your credentials from the link: mysql://[`USERNAME`]:[`PASSWORD`]@[`HOST`]/[`Default Schema`]?reconnect=true
* Set up your tables and columns via the information above in `MySQL Workbench` or equivalent application.
* Set up your config vars in your `connections.js` AND on heroku.
* Set your port in your server file to `const PORT = process.env.PORT || 8080`
* Set your build script in your `package.json` to `ng build --prod`
* Set your start script in `package.json` to `node server` (where server is your servers file name)`
* Push everything to github
* Deploy via github.



# Express and Server Setup
* Basic Boilerpate Server:
    ``` javascript
    var express = require('express');
    var app = express();

    app.get('/', function(req, res){
    res.send('hello world');
    });

    app.listen(3000);
    ```
* [Express Docs](https://expressjs.com/)
## Port Use
* When deploying always use `process.env.PORT || YOURDEFAULTPORT`
* Use ideally 3000 or 8080 for your default port
* Usually SQL is `3306`
* `ng serve` is on port 4200 
    * Needs to forward if you want to access routes in the server for port 3000
    * Set up a config for the proxy:
        ``` javascript
        {   "/api":  //OR NAME OF ROUTE(S)
            {
                "target": "http://localhost:3000",
                "secure": false
            } 
         }
        ```
    *  Then run `ng serve --proxy-config NAMEOFCONFIGFILE`
## Same Project BE/FE
* Ideally build the angular app first with `ng new`
* Then layout your server structure in that folder as seen below
* Either use port forwarding with `ng serve` as above or use `ng build --watch` and `nodemon server` in two different consoles.
## Overall Structure
* Generally Speaking you'll have the following generic structure:
* `server.js`                   <-- Sets up all basic info and starts the server listening
* `/server`                     <-- This Folder is NOT needed if your server is in a different repo from your FE
    * `/routes`                 <-- Sets up any routes you might need broken into appropriate folders
        * `user.routes.js`
        * `tweet.routes.js`
        * `friend.routes.js`
    * `/models`                   <-- This folder houses all of your schemas and/or relevant SQL/PostGres queries
        * `user.models.js`
        * `tweet.models.js`
        * `friend.models.js`
    * `/config`
        * `config.js`               <-- Setting ALL of your process.env.?  Also be ignored by git
        * `env.conf.js`             <-- Alters variables / connections based off the environment
        * `server.conf.js`          <-- Handles server config / error handling for the server
        * `passport.conf.js`        <-- Passport configuration (or authentication config if not passport)
        * `(DATABASE TYPE).conf.js` <-- Replaces connections.js
        * `sockets.conf.js`         <-- Configuring any sockets (socket.io) you want to use
    * `/middleware`                 <-- Seperate middleware files for your project
    * `/socket`                     <-- Setting up any sockets/responses in appropriate files in this folder
## Commonly Used Libraries
* `npm i mysql`         - De facto package for connecting to mysql databases
* `npm i request`       - Used to make external API calls from server side
* `npm i express`       - De facto server framework
* `npm i pg`            - PostGres connector for postgres databases
* `npm i mongoose`      - Connector for mongoDB databases
* `npm i socket.io`     - Used for websocket communication
* `npm i body-parser`   - Used to digest json via posts to the server
* `npm i cors`          - used to restrict CORS requests 
* `npm i bcrypt`        - Used for hashing passwords
* `npm i passport`      - Used for authentication (also `passport-local`, etc.)
## Middleware
* Can be implemented with `app.use(MIDDLEWARE)` or on a route `router.get('/path', MIDDLEWARE, (req, res)=>{})`
* Can be imported in libraries (`passport`, `body-parser`) or custom middle-ware.
* Can do pretty much anything you want to do before the route fires off.
* Any route(s) can have any middleware or any number of middleware the more you have the slower the route
* Must be exited with `next()` or res.send/return. If no `next()` occurs, will be stuck forever.
* Values passed via middleware should be attached to the `req` object`
    ``` javascript
        someMiddleWare(req,res,next){
            res.locals.newKeyName = value;
            next();
        }
    ```
## Best Practices
* Maintain consistent variable naming conventions across all files.
* Attach appropriate names to file names `user.routes.js` for routing files as opposed to `user.js` in a routes folder.
* Attach appropriate statuses to your responses:
    ``` javascript
        if(unauthorized){
            return res.status(402).send({RESPONSE OF SOME SORT});
        }
    ```
* Always return your `res.send()` to ensure you don't accidentally send a response twice/thrice in a route.
* Make comments any non-intuitive routes/models/etc.
* Ensure all of your models files match appropriate queries for the tables.
* DON'T send back any information you don't want the user to see, for example sanitize user info before sending back.
* Follow semantic naming conventions for your routes. `/users/add` or `/users/all` as opposed to `/addUsers` or `/getAllUsers`
* Take advantge of ALL http verb `router.get`, `router.post`, `router.put`, `router.delete`

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

# JavaScript Review
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

# Node and CLI Package Review
* [NPM](www.npmjs.com) - Houses all npm packages 
* If you need a package for something, check the docs on npm
    * Review how often it's updated
    * Make decisions also by number of weekly downloads and docs
* Can be used for a backend or just simple js projects
* Node can be used to build CLI packages which can be deployed to NPM
* `package.json` - 
    ``` javascript
    {
        "name": "exampleexpress",   //<-- Name of package
        "version": "1.0.0",         //<-- Version of the app
        "description": "",          //<-- Description of the app
        "main": "index.js",         //<-- Main file
        "scripts": {                //<-- Custom or buit in script to be run
            "start": "node index"
        },
        "author": "",               //<-- Author of the application
        "license": "ISC",           //<-- The license the app is under, a lot of times it's an MIT license
        "dependencies": {           //<-- Packages that the application needs in production
            "express": "^4.16.4"
        },
        "devDependencies":{}        //<-- Packages that the application needs for a dev environment
    }
    ```
* Don't alter the `package-lock.json` it keeps track of dependencies of dependencies
## Different CLI Commands 
* `npm init`                - Initializes a node package (automatically done with `ng new`)
* `npm i PACKAGENAME`       - Installs the package multiple packages can be added the `--dev` flag can be added for dev dependencies
* `node -v`                 - Gets current version of node
* `npm start/test/build`    - Runs the appropriate command in the `package.json` file
* `npm run CUSTOMSCRIPT`    - Runs custom script as defined in the `package.json` file

## Commonly Used Packages (Non-Express)
* Angular CLI adds all needed packages for angular
* `babel`       - This and packages associated with [Babel](https://babeljs.io/) used for turning ES6 to ES5
* `nodemon`     - Allows for hot reloading of node applications on change
* `async`       - Library that helps with asynchronous JS functionality
* `lodash`      - Used for easier object and JS functionality
* `d3`          - Used for data visualization
* `heroku`      - Heroku CLI usage
* `mocha`       - Used for testing
* `nodemailer`  - Used to send emails from a node application
* `webpack`     - Allows for bundling of files and uglification into a single file
* `graphQL`     - Easy setup of REST APIs
* `cron`        - Allows for cron jobs on a server (recurring functionality)


# Junior Dev Requirements and Keeping up to Date with Web Dev topics, Contract Work
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

# GitHub / Git

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