## First off, what is reactive programming?
Reactive programming ([Wikipedia Link](https://en.wikipedia.org/wiki/Reactive_programming)) is a programming concept that deals with data streams and the propagation of change. In Angular it is handled extensively with Observables via the `rxjs` library.
* [Rxjs Docs](http://reactivex.io/rxjs/)
* [Angular Rxjs Intro](https://angular.io/guide/rx-library/)

### What are Observables?
Well simply put they're something that you umm.. observe. I know that seems ridiculous but that's simply it! The angular docs describe it a little more verbosely [here](https://angular.io/guide/observables). They basically take advantage of a `subscriber` and `publisher` dynamic. Furthermore, they don't actually do anything until you subscribe. At which point they keep doing something until either the function completes OR you unsubscribe.

Let's walk through the example from the Angular Docs: 
``` typescript
    // Create an Observable that will start listening to geolocation updates
// when a consumer subscribes.
const locations = new Observable((observer) => {
  // Get the next and error callbacks. These will be passed in when
  // the consumer subscribes.
  const {next, error} = observer;
  let watchId;
 
  // Simple geolocation API check provides values to publish
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(next, error);
  } else {
    error('Geolocation not available');
  }
 
  // When the consumer unsubscribes, clean up data ready for next subscription.
  return {unsubscribe() { navigator.geolocation.clearWatch(watchId); }};
});
 
// Call subscribe() to start listening for updates.
const locationsSubscription = locations.subscribe({
  next(position) { console.log('Current Position: ', position); },
  error(msg) { console.log('Error Getting Location: ', msg); }
});
 
// Stop listening for location after 10 seconds
setTimeout(() => { locationsSubscription.unsubscribe(); }, 10000);
```

### How to define an Observer
So now we know what an Observable is.. let's talk about observers. These are the handlers you pass to the Observer creater. Basically it's an object that defines one or more of the following functions:
  1. next - This is the only required function and handles what to do with new information
  2. error - Pretty straight forward...
  3. complete - Usually notification that the execution is complete and what to do at that point.

Once you have something to observe and an observer function you simply need to subscribe and watch the magic happen!

So for simplicity sake, let's take a simple synchronous observable. By using `Observable.of(array)` you can turn any array into an observable
``` typescript
    const myObservable = Observable.of(1, 2, 3);
 
    const myObserver = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
    };
    
    myObservable.subscribe(myObserver);
```

### Ok so this is all well and good if every instance of that gets a new value. What if you want everyone who subscribed to an observable to see the same state?
Well some libraries will do this automatically for you which is great! If you're using state management you probably already have this set up for you. If not, let's look at an example [here](https://angular.io/guide/observables#multicasting).

