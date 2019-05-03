## Let's start simple
* Set up a very very simple app that allows you to access the `/` page and sends a `hello world` message.
* Now redirect any route that isn't to `/` to the `/` url.
* So now we want to be able to get all the posts from an API by the user ID. (We're working with non databases atm so let's pretend we have it in a database)
    1. Set up a route that allows for a userID param
    2. Copy the JSON from [here](https://jsonplaceholder.typicode.com/posts) and save it locally in tour server file/ a json it can access.
    3. When a persons calls `/users/5` return an array of only the posts from that user.
* Set up a middleware to log `Hi I'm a middleware` to the console every time a request is made to ANY route.
* Finally take one of your existing angular apps and have that be sent to the front end whenever `/app` is accessed.
* Makes sure that any route not already declared is redirected to `/`.
* Separate out these files as you would in a PROD environment
