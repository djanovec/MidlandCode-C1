## Imports into `app.module.ts`
1. FormsModule - ngModel
2. RouterModule - for routing
3. HTTPClientModule - for HTTPclient
4. ReactiveFormsModule - Reactive Form Validation
5. Anything with Angular Material
6. Custom Modules

## Typescript Typing of Variables
1. Figure out if it's always the same type needed/returned.
2. Use custom object interfaces when you can.
3. Remember you can `Object | Array | string`
4. Type `any` as a last resort.

## HttpClient
1. Remember to put the moduel into `app.module.ts`
2. Utilize verb keys `.get`, `.post` etc.
    * `.post` - Creating new things / sending data to a server
    * `.get` - Only for retrieving things / data from a server
    * `put` - Can also use `.post` but this is for any updating of data.
    * `delete` - Only for deletion of something from the server's API.
3. Always use in a service. 

## Dependency Injection
1. When you want to use the things on a class in a Component / Service / Directive / AuthGuard / etc.
    * eg : `constructor(private userService : UserService){}`

## Parent/Child Communication
1. Child would be to help out repeated code in the template to clean up the parent template.
2. Try to avoid intense logic in the child and instead pass up values to trigger logic in the parent.
3. `@Input() childVarName : typeName` in child,  and bind `[childVarName]="parentVarname"` in parent template
4. `@Output() eventName = new EventEmitter<emittedType>()` bind to `(functioninChild) = "functionInParent($event)"`


## Observables
1. Use to watch any data that changes over time.
2. Have to subscribe WHEN you're ready to do stuff with that data.
3. Template requires `{{observableVarName | async}}` to show the data as it changes.
4. Can be in Service / Controller / Authguard / Resolver / Anywhere it makes sense most often though you'll subscribe in the controller.

## Authguard
1. Used to protect / dissalow routes based off certain criteria.
2. Must return true or false which would be allowing/ not allowing respectively.

## T, whatever that is
* You'll see it on TS and Angular Docs. 
2. Refers to ANY type that might be in that function to build a generic reusable function.
3. Not used super often honestly.

## Lazy loading modules (what goes where??)
1. Declared in route file.
2. Declared in the sub module file depending on what you need to do.

## Navigating the Angular Docs
1. Overwhelming amounts of information
2. Keep digging for examples
3. If needed go elsewhere for examples there are a ton of people out there that make pretty decent examples. (Caveat Emptor)

## Passing inputs from component to services
1. Create var name on the service
2. Access that through dependency injection of the service into the controller.
3. Use one way binding `{{}}` to display it. Will NOT update from the service without an observable used.
4. Have to recall the data each change or use the `rxjs` `of()` to make an observable of it.

## When to put code inside/outside of ngOnInit
1. If you need access to a resolver / a dom element / or an `@Input` from a parent it HAS to be in on init.
2. Any funcitonality you want to run immediately when the comp loads.

## Resolvers
1. Things that you want to have happen (or start to happen) BEFORE the component ever gets loaded. Before the lifecycle.
2. Used for preloading of data / helping the load of the controller.

## Binding Components to Templates / Component Communication
* Passing information via a Service or Parent/Child Communication
* State management which is fancy services called stores.
* Binding Types:
    * One way Controller -> Template 
        * `{{}}` to bind controller variables to the template directly (outside of an element)
        * `[]` to bind to attributes of an element such as `[class.className] = "someBoolean Thing"`
    * One way Template -> Controller done on elements with `(someEvent)="functionToCall()"`
    * Two Way Binding Controller <-> Template done with `[(ngModel)]="varName"`

## Routing
* Declared in some form of routing file (auto generated via the CLI)
* Any of your routes (also referred to as outlets) have to be declared as objects in the Route Array
    * Example: `{path: 'home', component: HomeComponent}` 
        * Path is the actual path such as `localhost:4200/home`
        * Component is the Class Name of the component to load at that path.
    * You can also declare the following in the object above:
        * `redirectTo: 'home'` replaces component key and tells where to redirect to
        * Authguards like `canActivate: [array of AuthGuard Class Names]`
        * `resolve: {varNameOfResolver: ResolverClassName}`
        * The Path path can be `**` to be ANY route not declared above. This should be the last route declared.
* Linking in the tempalte: `<a href="">` is not used as that will link to an external site from the SPA
    * Instead you would use `<a [routerLink]="['/home']">` where the '/home' would be any path you declared in the router file as above.
    * `<a routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" [routerLink]="['/signup']">Signup</a>`
        * The `[routerLInk]` tells where to go in the SPA in this case the 'signup' path
        * The `routerLinkActive` tells what class (in the example above we chose that to be the class .active) to add to the anchor tag if the route declared in `routerLink` is the currently active link. The active class must be styled in the style file if you want to do anything with that class.
        * ` [routerLinkActiveOptions]="{exact:true}"` tells the routerLinkActive to ONLY add the class if the entirety of the current path matches. This protects you if you have routes like `/users/friends` and `/users/jobs` and `/users` and don't want the `/users` link to have the active class if you're on `/friends` or `/jobs`
* `ActivatedRoute` - The route active / being loaded. Observable based info or actual live data on the `snapshot` key
    * Used to grab queryParams / Parameters
    * Can be used to see full path you're being routed to, etc.
    * Can also be used to see where you're coming from and the component being loaded.


## Syntax / Writing Code that Compiles
* Follow best practice with variable and function naming to avoid misuse / confusion
* Separate concerns to Services / Components / Directives / Etc.
* Utilize / Follow the Lifecycle - `ngOnInit()`
* Fail Fast and Honestly Often - Try to troubleshoot as much as possible before asking for help
* Example:  `<input name="firstName" id="firstName" [{ngModel}]="someVarOnTheController">`
    * Attribute `[{ngModel}]` does not exist on element input no provider found. 


## Reading Errors and Fixing Them
* Look through the error stack for a file name that matches one that you created.
* If a file name that YOU created exists look at that line of code. If that line calls a function elsewhere look at that other classes code.
    * `this.userService.getUsers().subscribe(val => this.users = val)`
    * Error on line X (line that above code exists on)
* If the file referenced isn't one you created do one of two things:
    * Check to see you're missing an import in the `app.module.ts` file.
    * Or check the docs for the file you're using to make sure it has compatibility (Should be done ahead of time)


## Local Storage
Ine the below example we use the `user` key but we could call that WHATEVER we want. By default no keys for storage exist in localStorage.
``` typescript
    //Saving a non-object item into localStorage
    let user = "Mike";
    localStorage.setItem('user', user);

    //Reading a non-object item
    let variableName = localStorage.getItem(nameOfKey);

    //Saving a JSON Object or Object Interface
    let user = {id: 2, name: 'Mike'};
    localStorage.setItem('user', JSON.stringify(user));

    //Reading a JSON object or Object Interface
    let user = JSON.parse(localStorage.getItem('user'))

    //Updating an item
    localStorage.setItem(existingkey, newValue);

    //Removing an item
    localStorage.removeItem(nameOfKey)

    // Clearing all items
    localStorage.clear();

```