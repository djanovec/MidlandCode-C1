## Setting up Backend With Express

* Either Initialize and NPM with `npm init` or use an existing angular folder structure.
* `npm install express`
* install `nodemon` for live hot reloading
* Set up `npm start` command in your `package.json`
    * `node server (file name)` requires rerunning on file changes
    * `nodemon server (file name)` hot reloads
* Start Coding
``` javascript
const express = require('express');
const app = express();
const userRoutes = require("./routes/user.routes.js")

// Sets up a folder to deliver static files. Think images, external stylesheets, pdfs, etc. Also SPAs if you have one build through ng build or ng build --prod
app.use(express.static(__dirname+"/dist"))

// Middle ware
// Normally for authenitcation or logging information
app.use(function(req,res,next){
    console.log("Hi I'm a middleware.")
    // res.send("Invalid Credentials")
    next();
})

// Importing Routes see below
app.use("/user", userRoutes)

// Top Level Route
app.get('/', (req,res)=>{
    res.send("Hello World")
    // or res.sendFile(spa's index.html)
})

// Redirect form non declared route
app.get('/*', (req, res)=>{
    res.redirect('back');
})


// Open the port
app.listen(3000);
```
## Example Route
``` javascript
let express = require('express');
let router = express.Router();

router.get('/:userid', (req, res)=>{
    let userid = req.params.userid;
    let usersTodos = todos.filter(todo=> todo.userId = userid)
    res.send(usersTodos);
})

module.exports = router;
```
