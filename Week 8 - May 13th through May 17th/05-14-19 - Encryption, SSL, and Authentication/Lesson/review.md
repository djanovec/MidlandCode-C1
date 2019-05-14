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
        * Make sure you only use Observables/Promises in appropriate asynchronous programming
        * Subscribe to Observables to get ANY data from them
        * Make sure you're handling any potential errors from the Observable Stream or in the Promise chain

* Form Validation
    * Reactive Forms
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
    * Template Driven
        ``` typescript
            // Let's say we have an object interface that includes username, email, password named User
            user: User;
            onSumbit(){
                this.userService.signup(this.user.username, this.user.email, this.user.password);
            }
        ```
        ``` html
        <form class="signup-form" role="form" name="form" (ngSubmit)="signUpForm.form.valid && onSubmit()" #signUpForm="ngForm">
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
    * Best Practices
        * Give error messaged to the user
        * Validate all possible requirements
        * Keep the form from submitting (and ideally disable the button) until the form is valid
* Directives
    * Pre-built directives
    * Custom Directives
    * When to use a directive over a component

* APIs
    * Setting up an API
    * Consuming responses
    * Login/Signup Responses
    * Database Connections

* Angular General Review and Communication
    * Object Interfaces
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
    * Data Binding
    * Parent/Child Communication
    * Service Based Communication
* Styling and Angular MD
    * SCSS
    * Table Setup
    * Angular Setup
    * Custom Themes
* Routing and AuthGuards
    * Routing in Applications
    * AuthGuards
    * Best Practices

* Database Structure
    * Database Design
    * Best Practices
* Authentication / Passport
    * When to use what
    * Best Practices
* Express and Server Setup
    * Overall Structure
    * Best Practices

* IFTTT
* General Node and CLI Package Review
    * Different CLI Commands
    * Node Review

* General JavaScript Review
    * This
    * Then
    * Hoisting and Inheritance
    * ES6
* General Jr. Dev Requirements and Keeping up to Date with Web Dev topics, Contract Work
    * Key things to work on
    * Keeping your skills fresh
    * Contract Work
* Best Practice Reviews
    * Generic Overview
    * Specific Q&A
* Work Prioritizaion / Compartmentalization
    * Order of Work
    * How to compartmentalize tons of work 

* Unit Testing