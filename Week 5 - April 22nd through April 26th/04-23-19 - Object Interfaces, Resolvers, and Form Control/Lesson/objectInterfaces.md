## What are object interfaces?

Simply put they're a way for you to describe what a specific object should look like and what keys it should have. You use them a bunch when you have objects that you want to look a specific way. 

Let's take our todos for example. Before we declared them like this" 
``` typescript
    let newTodo : Object = { 
        name: 'something', 
        category: 'something else', 
        id: 4, 
        completed: false
    }
```

That is perfectly fine but we know EVERY todo is going to look like that and have ONLY those keys. Also if we tried to say `newTodo.name = 'new name'` the linter would give us an error because the `name` key doesn't exist on type `Object`. With an interface we don't need to worry about that. 

Somewhere in a shared folder we would declare a Todo interface:

``` typescript
    export interface Todo {
        name: string,
        category: string,
        id: number,
        completed: boolean
    }
```

Now we import that into the component and the declaration simply gets changed to:

``` typescript
    let newTodo : Todo = { 
        name: 'something', 
        category: 'something else', 
        id: 4, 
        completed: false
    }
```

That's great if we can declare ALL values at the beginning, but what if we want some of them to not be required? Let's say we don't want id to be a required key but it MIGHT be there. In the interface we simply change it to: 
``` typescript
    id?: number,
```
The `?` lets the interface know it's optional. Cool, what if we want extra types, or a function, or a bunch of other weird requirements? Well for that we can always check the typescript docs: [Typescript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)