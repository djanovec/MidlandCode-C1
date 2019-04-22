## Creating Observables all the time is annoying... In the words of Homer Simpson: "Can't someone else do it?"
To that end, angular takes advantage of the rxjs library. Although it sounds like it, it's not some weird medical library, it's a super useful library for handling all sorts of observable related things!

For a lot more information on these, check out the docs [here](https://angular.io/guide/rx-library)
### Creation Functions: 
* fromPromise - Allows you to easily convert a promise into an observable. 
* interval - incredibly useful in lieu of using the setInterval, just don't forget to unsubscribe at some point
* fromEvent - Allows you to set up observable mouse movements without the use of `@HostListener`s or `addEventListener`.

### Operators
So we created our observable in rxjs, but we want to do a bunch of stuff to it every time it gets new data. Well that's where the magic of operators come into play. The most common ones I've used are
* debounceTime - allows you to wait a little bit instead of IMMEDIATELY triggering the observable again. Super useful for API calls.
* distinctUntilChanged - literally what it sounds like, it won't emit new values until it has changed from the previous one. 
* map - basically the same as the `.map` function in the javascript. It allows you to do multiple things to a value passed into it. 
