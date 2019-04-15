## Routing in Angular
1. How does it work?
2. What types of routes can you have?
3. How do you set up routing?
4. Things to consider with routing
5. Accessing Route Params: 
    * `private activeRoute: ActivatedRoute` the Activated Route module built into @angular/router
    * Params have to be declared when setting up the routes
    * This can then be accessed via `this.activeRoute.snapshot.queryParams` or `this.activeRoute.snapshot.params`.
    * This is the simplest but not always the best way to do it as an FYI
    