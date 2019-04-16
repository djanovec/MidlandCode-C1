## What are services?

So while it is a very basic reduction, think of a service as reusable code that can be called on command throughout different components. It helps with DRY programming and when the time comes for us to cover API consumption and external calls, Services are the workhorses.

## How do we set one up?
* A service (like the majority of Angular things) is a class just like any component. 
* Unlike components you need to prep the service for injection into the app. This is done with an @Injectable decorator such as `@Injectable({providedIn: 'root'})`
* If you do not use the providedIn flag as seen above, you will need to list it in the providers array in your app.module.ts file (or appropriate module file)

## When to use and when not to use services
### Use a service if
* The functionality you need is shared between multiple (or even just more than one) components
* What you need tyo accomplish is component independent. An example would be an API call. Even though you might only one component USE that date, the call itself is not specific to component usage.
* You need to share data across sibling/multiple non parent/child components
* You're using overly complex functionality that doesn't directly impact a component

### Do not use a service if
* It is overly simple non repeated functionality
* You're trying to share information between ONLY child and parent components
* The functionality would work better as a pipe or directive. 

## Sharing via a Service.
* Best practice for sharing via services is to use a getter and setter method. 
    1. Have a function such as `getAttr(){return this.attr;}` to get the value of something on the service.
    2. For the setter it would be similar but take a value as an input: `setAttr(val) {this.attr = val;}`
* In the component, inject the service into the constructor and simple say `this.componentAttr = this.serviceName.getAttr()`
* This method WILL NOT WORK if you are using asynchronous data. That will be covered later in the class via the use of observables and the rxjs library.