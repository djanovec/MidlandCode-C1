## In Class work Service Sharing
1. Set up an app with routes/components for "/user/:username" and "/todos/"
2. Set up a service that will CRUD (minus the U) for your todos.
3. In the Service, have functions 
    1. Add a todo: information should be username and title of the todo, id of the todo (this should auto generate)
    2. Remove a todo: Function should take an index and remove the appropriate todo
    3. Retreive todos by username: Should filter out any todos not by the specific username
    4. Retrieve ALL todos
4. On the todo component, you should have sub sections
    * An add todo section should have a form for a username and a title of todo. When you add a todo it should keep the todos you already have and just add to it.
    * A todo List which would just retrieve all todos and list them in a table with id, username, and todo showing. The usernames should also be links going to "/username/theusernameinthetable". You should also have a button to delete the specific todo via the service.
5. In the user component, it should have all the functionality of the above. Think about how you want to handle deleting elements.
    * The user component should not need to have a username input for adding todos.
    * Only the user's todos should show.
    * The user component should be the only place that allows for deletion of todos


    ## Todos By Username:
    If you have: 
    ``` javascript
    [{name: 'Wash the dog', user: 'Mike'},
    [{name: 'Wash the cat', user: 'Mike'},
    [{name: 'Wash the horse', user: 'Mike'},
    [{name: 'Wash the elephant', user: 'John'},
    [{name: 'Wash the rhino', user: 'John'},
    ]
    ```
    If you are at `/user/Mike` You should only get:
    ``` javascript
    [{name: 'Wash the dog', user: 'Mike'},
    [{name: 'Wash the cat', user: 'Mike'},
    [{name: 'Wash the horse', user: 'Mike'}]
    ```

