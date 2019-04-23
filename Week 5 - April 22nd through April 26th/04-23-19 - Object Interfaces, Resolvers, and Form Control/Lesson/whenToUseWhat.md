# When to Use Different Angular Things:

## Services
* Common Functionality Used in multiple components.
* Communication Between Sibling (and in some cases Parent/Child) components.
* As a resolver.
* API Calls / Communication with the outside world.

## Components
* Self Contained reusable templates.
* When you need to break up a complex page into smaller pieces.
* To contain specific funcitonality for a template / specific piece of an Single Page Application (SPA).

## Pipes
* Output conversion to change styling
* Output filtering of data
* To change display of variables to the DOM but not mutate original values

## Resolvers
* Preloading Data for the page navigated to
* Getting inputs (and doing something with them) based off the url they are navigating to.

## AuthGuards
* Protecting a route based off some criteria

## Object Interfaces
* Setting the structure of an Object variable based off known keys/types

## Directives
* Reusing funcitonality for the template. 
* Allowing functionality for the template that takes some form of input.

## Routing
* Connecting Components for an actual SPA.

## API Calls
* Get/Sending info from/to an outside source (outside of the app). 

## Observables
* Need to watch asynchronous data.
* Any sort of data that is going to change that you need live updates to.

## Parent Child Communication
* Pass information from parent to child (so that the child has access to it).
* Passing information up to the parent to utilize that data / trigger an event.
* When a service doesn't makes sense for the use case.
* When you want to use a presentational component inside a logical component.
``` html
<!-- Inside the parent template -->
<app-child-component [childVarName]="parentVarName" ></app-child-component>
```

## Form Control
* Control types of data allowed.
* Form validation.
* Easier way to update errors live to the template.

## Rxjs Library
* When you want to do things with observables.
* Changing behaviour of observables / when they emit new data.


## HttpClient
* Used to make API calls or calls to the outside.
