## So we come to our final major step in our `Observables` journey, `Resolvers`


### What are Resolvers?

* Resolvers are a type of service that gets fired off when a route is `resolved`
* You can declare any functionality you want for them, but usually it's to pre-load data from an API or to set values based off query parameters.
* After declaring the Resolver, you can add it to any route and then access the data it returns by subscribing to it in the key you bound it to.
* Resolver services need to declare the `resolve(param1, param2)` function which usually returns an Observable (or Promise) and takes two parameters:
    1. param1 - ActivatedRouteSnapshot
    2. param2 - RouterStateSnapshot

### How do you declare them?
* Declaring them is actually the easiest part of Resolvers. Since it's effectively a service it's as simple as: 
``` typescript
    import{Injectable} from '@angular/core';
    import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
    import {Observable} from 'rxjs/Observable';

    @Injectable()
    export class AppResolver implements Resolve<any>{
        constructor(){
        }
        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any>{
            console.log('Router resolver has been triggered');
            return SomeObservable
        }

    }
```
* With the above example we simply declare a resolver to log that it was fired and then just returning some form of Observable.

### So we declared it, what now?
So declaring it is all well and good but that doesn't really help us actually utilize it now does it? Let's take a look at how to then utilize it! There are multiple ways ranging from useful and simple to incredibly complex and very unique use cases for utilizing our resolver. We'll look (thankfully) at the simplest way. It's a 3 step process:
1. Making sure the knows it exists: Add the resolver service to the providers array: `providers: [AppResolver]`
2. Set up your routes that will use the resolver: 
    ``` typescript
        const routes: Routes = [{path: '', component: HomeComponent, resolve: {appResolver: AppResolver}}]
    ```
    The resolve key is an object that can have more than one resolver. They will all fire when you resolve the new route. In the case above we only have a single route, but if we wanted more we would HAVE TO add the resolve key to each of the routes we declare. Furthermore the `appResolver` key name is simply how we will access the data in the component. In this case, `appResolver` is a very generic name and not a good use case, but it will work to show you what to do in the next step.
3. Accessing the data from the Resolver -This is a two step process, the first of which is pulling the item off the ActivatedRoute, this can be done by importing the ActivatedRoute type and then injecting it in our constructor adding the following two lines:
    ``` typescript
        import { ActivatedRoute } from '@angular/router';
    ```
    ``` typescript
        constructor(private route: ActivatedRoute) {}
    ```
    After that we can simply access the data off the key we declared when setting up our resolver. This is almost always done in the OnInit life cycle hook like so: 
    ``` typescript
          ngOnInit() {
            this.whateverYouWantToCallIt = this.route.snapshot.data.appRoute;
        }
    ```
    That key in the component can be used to to literally whatever you want in to template or calling an external service, or anything honestly!