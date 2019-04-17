## What if you want a parent and child to talk to each other?

### Parent to Child
So there are a couple options for how to have a parent talk to a child and vice versa. the first is simply with property binding.
Let's say you have a parent component with a value named `names` that you want the child to access. Sure you COULD use a service but if it's only communicating parent/child that's not needed. Consider for a moment this snippet at the top of parent:
`names: string[] = ["Mike", "John"]`
If those values will NEVER change, you can simply declare them in the child as well and be done with it. But if they MIGHT change or definitely will, you'll need to bind them. So let's assume the variable you want them to be bound to in the child is also named `names`. We'll need to use an input and set the values in the parent template. This is a simple two step process:
1. declare the variable as normal in the child component but prepend it with `@Input()` and import the `Input` module from `@angular/core` if it isn't automatically.
2. Add the binding to the component call in the parent: change `<child-component></child-component>` to `<child-component [nameOfVariableInChild]="nameOfVariabelInParent"></child-component>`
    * If you bound it to the `name` property in the template but want to call it `childName` in the child, instead of `@Input() name` you could put `@Input('name') childName`


### Child to Parent Way One:
You can use the `@ViewChild` decorator to access child function and variables. It is important to note thatg it is NOT two way binding. It is just oneway binding. Let's say you want to access the sayHi function of a child component. This can be done using `@ViewChild(ChildComponentClassname)` and settting up the parent to have access to functions/variables that the child declares. I would suggest checking this out but we won't be covering it much more as it's very problematic and can cause problems. A rough example might look like: 
``` javascript
  @ViewChild(ChildComponent)
  set child(child: ChildComponent) {
    this.parentVariable = child.childVariable;
  };  
```

### Child to Parent Way Two (usually the preferred way):
Utilizing event emitters from a child to communicate with a parent. So let's say you have an `@Input` by the name of `names` that you have sent from the parent to the child using the method above. What happens if you want the child to be able to edit that variable and let the parent know that it was edited? You could in theory leave all the functionalty to edit in the parent but that can cause problems from a design standpoint. This leaves you with the option for an event emitter. This is a couple step process. 
1. Create a funciton in your parent to function as a setter/handler for the even from the child. If you want to take the change in the child and update the parent it might look like: `setName(val){this.name = val}`
2. Bind the new `setName` function to the even property you will create in the child such as `<child-component (nameEvent)="setName($event)"></child-component>` the value in parenthesis is the name you will create in the child.
3. Create the event emitter in the child using the `@Output` decorator: `@Output() nameEvent = new EventEmitter<variableTypeToBeEmitted>();`
4. Emit that property in some sort of function. Let's say in the child you have a `saveData` function that updates the name. You would then declare the function as `saveData(val or nothing if using ngmodel){this.nameEvent.emit(val or the ngModel)}`

