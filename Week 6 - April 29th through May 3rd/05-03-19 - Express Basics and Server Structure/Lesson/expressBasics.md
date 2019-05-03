## So now it's time to build a server! But first what is express?
* Express is one of several modules that allow for easy construction of HTTP servers. 
* They can be run on multiple different platforms including locally on your own machine.
* Incredibly robust and allows you to serve html files to be rendered client-side, or render files server-side.
* Also allows for interaction with databases via client facing APIs.
* Can also do anything node does and handle all sorts of wonderful things!


## So how do we get started?
* There are a ton of options for what you can use for scaffolding, or setting up options but the BARE minimum is something like:
``` javascript
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
* Take a second to look at that and let's figure it out together!
* So that's great if you want a server to just say `Hello World!`. If you want it to do more we'll have to start looking at more options!

## Basic App Configuration
* You can set up `app.use()` to declare specific things you want to use in the whole app. This can be for routes (see below), middleware (see below), specific modules etc.
* If you're using the express generator you'll probably see stuff like: 
    ``` javascript
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
    ```
* All of the above is telling the entirety of the application to use those specific modules when the server is running. 


## Configuring Routes
* So you already saw the `app.get` or `app.listen` but that's not the ideal way to declare routes. One of the best ways is to declare them as their own custom files.
* Let's say we have a `/users/` router that has `/users/posts` and `/users/settings` and `/users/friends` etc. Well we could declare all of those in the top file sure, but ideally we keep like with like. 
* Those could then be separated out into a `user.routes.js` file (this is the naming convention but doesn't require `routes` in the file name). In there you could declare
    ``` javascript
        var express = require('express');
        var router = express.Router();

        router.get('/posts', (req, res, next)=>{
        res.send(postData);
        });
        router.get('/settings', (req,res,next)=>{
        res.send(settingsInfo)
        })
        router.post('/settings', (req, res, next)=>{
            //Functionality to post to settings
        })

        //etc...
        module.exports = router; // this is ES5 an alternative would be `export default router`
    ```
* The above is great for a standalone bit of routing. You can then tell your application to use it in the top level file with 
    ``` javascript
        var usersRouter = require('./routes/users');
        app.use('/users', usersRouter)
    ```
* So what do the `req` and `res` mean in the callback function?
    * `req` is the request being made and contains all sorts of information you can use. [More Req Options]('http://expressjs.com/en/4x/api.html#req')
    * `res` is the response you're planning on sending back. [More Res Options]('http://expressjs.com/en/4x/api.html#res')
    * These don't have to be the only arguments passed into the callback and don't have to be named `req` and `res` BUT they're always the first two arguments and ALWAYS in that order.
* If you want to declare parameters to a route it's super simple! Let's say you want `/users/SOMEUSERID/posts` don't worry, express has got you fam. 
    * In the route declaration simply declare it like `router.get('/users/:userId/posts') etc...`. From there you can get it in the callback function by accessing: `req.params.userId` look familiar? 
    * This can be done for multiple params as well such as (from the Express guide) `router.get('/flights/:from-:to' etc..)`  and then access them with `req.params.from` and `req.params.to`
* You can also take advantage of `res.sendFile()` to deliver static files (great for angular apps with client side rendering).

## So what if you want all routes for `/users` to go through an authorization process of some sorts ahead of time, Or some other functionality?
Middleware to the rescue!
* Sometimes you want to make custom functionality. Let's say you want to take every request to the servers `/users` routes and check to see if a token/api key matched
* You COULD declare that function at each call inside the callback. But instead you could declare it as a standalone function:
    ``` javascript
        function checkAuth(req, res, next){
            if(req.whateverTokenKeyYouWant){
                next()
            }
            else{
                res.send('Invalid token')
            }
        }
    ```
* In this case, `next()` tells the server that this middleware is done and to move on to the next one. If you don't send a response in a route or exit out of a middleware with `next()`, the server will NEVER conclude the call (well it'll time out but not gracefully).
* In your routes you can now simply call `router.get('/route', checkAuth, (req,res,next)=>{})` and it will automatically call that middleware.
* Alternatively you could use the `router.all` or `app.all` and attach middleware to ALL routes or all http methods to a specific route (`router.all('/users', middleware, callback)` would attach to any `GET`, `POST`, `PUT`, `PATCH`, or `DELETE` to `/users`)


## If you want to test APIs without the use of a front end, check out the postman addon for chrome