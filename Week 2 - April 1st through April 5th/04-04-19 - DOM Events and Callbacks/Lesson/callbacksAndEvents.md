# Interactive Webpages
So we learned already what the DOM is and how you change elements, but only at set times and not with user input. If we wanted to say change something when a user clicks a button we'll need more skills for that. That is where callbacks and event handlers come in to play.


## Events
Whenever you think of something happening when you're using a website, whether it be clicking a button or entering a name into a text input, there's almost always an event in javascript to correspond with it. There are many more events than you'll probably ever need but thats completely fine. Almost all of the events have semantic naming and as such are very easy to understand what they do. The most common ones include:
blur, click, dblclick, error, input, keydown, keypress, keyup, load, mousedown, mouseenter, mouseleave, mousemove, mouseover, mouseup, resize, scroll

In order for the event to be registered you need to attach an event listener. This can be done one of a couple different ways. One of the most common is as follows:
``` javascript
    document.getElementById('someID').addEventListener("nameofeventtolistenfor", callbackFunction)
```

A couple of important things about the above. The callback function can be a function described elsewhere or an anonymous function declared in line. That would look like:
``` javascript
    document.getElementById('someID').addEventListener("nameofeventtolistenfor", function(){ thingsToDoHere})
```


## Callbacks
So what are callbacks?

When you want to declare a callback function this can be as either option above, an anonymous function or as an actual function. If you want to easily access the element that the event was fired on, you can access it one of two ways. The first is a bit unneeded and should only be done if you need to access the event as well as the element:
``` javascript
    document.getElementById('someID').addEventListener("click", function(e){ 
        e.target // this is the element
    })
    //OR
    document.getElementById('someID').addEventListener("click". myCallback)
    function myCallback(e){
        e.target // this is the element
    }
```
In the above, one of the parameters always passed to the callback function is the event itself. This is useful to find more information about the event and needed if you want to see what key was pressed for key based events. The second example takes advantage of `this` and scope

``` javascript
    document.getElementById('someID').addEventListener("click", function(){ 
        this // this is the element
    })
    //OR
    document.getElementById('someID').addEventListener("click". myCallback)
    function myCallback(){
        this // this is the element
    }
```

That takes advantage of scope and knows that the `this` in that scenario refers to the target itself. If you need to override the meaning of `this` for instance if you're creating a class, you can user something like `myCallback.bind(this)` to force a higher scope into the callback.


## Limitations of Callbacks/Event Listeners in Raw JS

One of the hardest things about callbacks and Event listeners is that they're attached at the time the line of code is run. If you create an element after the fact, you'll need to attach an event to it at the time of creation otherwise it will NOT be attached. This can be fixed with things like jQuery and become moot in angular but in raw JS it's something to keep in mind.