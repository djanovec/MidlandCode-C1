## Putting it into practice:

We're going to put Resolvers, Interfaces, and Http into practice. 
We'll be using the JsonTypicode API [Here](http://jsonplaceholder.typicode.com/)

1. Set up a 3 component APp:
    1. Home Component - Just use filler text for now
    2. Todos component - this will follow a pattern of /todos/:id
    3. UsersComponent which will follow /users/:id
2. Add a user service and a todos service. These should have functions to be able to pull data from the API based off the values of the routes for the User and Todos Component
3. When a user navigates to users/1: 
    1. pull all of the posts associated with the user with id of 1 
    2. And all the data associated with that user.
4. When a user navigates to /posts/2, pull that specific post by id from the server.
5. The loading of the User information in step 3.2 above should be done as part of a resolver so that as soon as the route loads, you already know which users posts to load. 
6. Utilize Interfaces for the objects you get back since you know the exact format they'll be returned in.
7. If you feel like adding animations, add those as well. 
8. In case it wasn't obvious in the above steps, the information should be displayed to the template in a logical and visually clean way. I'm not looking for super fancy, just neat and organized.


## Now to make everything work well together!

1. So let's take whatever is left to finish in the homework over the weekend and first off complete that.
2. Create Object interfaces for the Todo and the User objects with all required fields.
3. Let's implement an AuthGuard for the user/:id to ensure that the appropriate user is logged in. This will require two more steps:
    1. Implement a login function/ component with a login service. You can simply create dummy passwords or just whatever you see fit for this but the user should be stored on the service.
    2. Allow the user to navigate away form the page  and come back and STILL be logged in until they logout. (We've done this before but try not to copy your code)
    3. On the Auth guard for the Users/:id route, make sure that the user that is logged in has  the correct id corresponding to the route. Otherwise, send them back to either:
        * If a user IS logged in, send them to their appropriate route
        * If no user is logged in, send them to the login page.
4. Think about what other functionality you might want to add to make this a true prod app, let's discuss!
    