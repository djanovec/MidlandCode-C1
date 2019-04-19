## So we have a normal looking app... what about animation?

*  First things first, we need to import the appropriate module into the module.ts file a : `import { BrowserAnimationsModule } from '@angular/platform-browser/animations';` and adding it to the imports array will allow us to use them.
* Next we will need to import the animation functions we plan on using into the component file. These are all imported from '@angular/animations`
* The animation functions are similar to things such as `ngOnInit`. They're functions that you use to trigger when and how animations happen. For more information check out the docs for [Angular Animation Function](https://angular.io/guide/animations#animations-api-summary)
* next add the actual animations in an array inside the component decorator

## Now to actually "code" the animation!
* You start off by declaring a state and it's styles: 
    ``` typescript
        state('uniqueStateName', style({
            <!-- SEE NEXT BULLET POINT -->
        }))
    ```
* In the style object you declare the actual styles using standard css attributes in camelCase. So instead of `background-color: black` you would say `backgroundColor: 'black'`
* So now we have two states that just switch on or off but just happen immediately with no nice clean movement. We need to set up some transitions. This is done via: ` transition('firstState => secondState', [animate('duration delay easing')])` Instead of `=>` you could also use `<=>` if you want that animation for bot directions.
* Final step is to take the states and the transitions and wrap them in a trigger. This is done like: `trigger('nameOfAnimation', [array of states and transitions])`
* Finally we can simply add it to the element we want to be styled as a one way bound attribute: `<div [@nameOfAnimation]="expression to determine which state it is">`
``` typescript
     trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
```


## What about reusable animations?
* Create an animation.ts file, import the animation functions, then declare the animation as you would normally but export it using something like 
``` typescript
    import {
        animation, trigger, animate, style
    } from '@angular/animations';

    export const animationName = animation([
    style({
        height: '{{ height }}',
        width: '{{ width }}',
        backgroundColor: '{{ backgroundColor }}'
    }),
    animate('{{ time }}')
    ]);
```
* In the above examples you could straight declare the values for your styles, but that would defeat the purpose of true DRY. 
* When you want to call the animation in your component, you simply do so with `useAnimation(`
* Your trigger and transition would look the same but instead of the array of styles: 
    ``` typescript
    trigger('openClose', [
      transition('open => closed', [
        useAnimation(animationName, {
          params: {
            height: 0,
            width: 0,
            backgroundColor: 'red',
            time: '1s'
          }
        })
      ])
    ])
    ```

## Because nothing is easy, routes are done differently...
* First add the `BrowserAnimationsModule` to your `.module.ts`
* Configure the routes by adding a `data` key to them. This key contains an object: `{animation: 'NameOfAnimation'}` The animation here will be the 'state' of the animation we will be using.
* In the app.component.html you'll need access to the router outlet: 
    ``` typescript 
    <div [@nameOfAnimation]="prepareRoute(outlet)" >
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    ```
* This is all well and good but what does prepareRoute mean? Basically you have to get the router-outlet you built access to above and here's the example from the Angular docs for what that preparer might look like: 
    ``` typescript
        prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && 
        outlet.activatedRouteData['animation'];
        }
    ```

* Next define the animation as you would normally. You can use the `query` function to see which state is entering or leaving. `query(':enter')` or `query(':leave')`
* You'll also want to use the `group()` function to ensure all animations run concurrently.
* Utilize the `animateChild()` function if your components entering and leaving ALSO have animations you want to show.
