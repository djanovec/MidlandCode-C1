## So let's say you have an admin route that you need to protect. How would we go about doing that?

### Auth Guards to the Rescue! But what are they?

* Basically services that help you keep users from accessing information they're not supposed to.
* Can use dependency injection and access other services synchronously or asynchronously in order to obtain the information they need.
* Can be set to protect/ guard the following interfaces:
    1. CanActivate - Stops from going to a route
    2. CanActivateChild - Stops access to child routes
    3. CanDeactivate - Stops from leaving a route
    4. Resolve - Can get data before a route is activated
    5. CanLoad - Similar to CanActivate but used for asynchronously loaded modules.

### How to declare them on a route
* In the route declaration, add the needed interface and the name of the guard service you are using like so:
    ``` typescript
        //import Routes and Components as usual
        import {ActivationGuard} from '../services/ActivationGuard'

        const routes Routes = [
            {path: '/secret', 
            component: SecretComponent, 
            canActivate: [ActivationGuard]
            }
        ]
    ```
* Remember that you'll need to inject the guard into your module.ts file or declare it in the service.ts file in order to have the service available to use.

### So it's declared, now what?

* The next step is up to you. We decided to use canActivate in this scenario so let's go with that.
* Inject any dependencies the guard might need in the constructor. 
* Make sure that the class also implements the interface you decided to use. This is a different step than a normal service. 
    ``` typescript
        export class ActivationGuard implements CanActivate{}
    ```
* Much like `OnInit` needs a function called `ngOnInit()` the guard needs a function called `canActivate()` or whatever interface you were using.
* The return value HAS to be a boolean. True means they can access it, false means they cannot.
* It can implement any service or injected dependency you prefer.
* It is best practice to also navigate away to a non protected page so the user doesn't just think the link is broken.
* Example: 
    ``` typescript
        import { Injectable }        from '@angular/core';
        import {CanActivate, Router} from '@angular/router';
        import {OurUserService}      from './ouruserservice.ts'

        @Injectable()
        export class AuthGuard implements CanActivate {
        constructor(userService: OurUserService) {}
            canActivate(): boolean {
                if(this.userService.isLoggedIn){
                    return true;
                }
                this.router.navigate(['/login']);
                return false;
            }
        }
    ```