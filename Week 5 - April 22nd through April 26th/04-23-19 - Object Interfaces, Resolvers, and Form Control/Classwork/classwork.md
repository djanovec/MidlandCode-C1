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