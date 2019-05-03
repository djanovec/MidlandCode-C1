## Server.js
``` javascript
const express = require('express');
const PORT = 3000;
const app = express();
const userRoutes = require("./routes/user.routes")

app.use(express.static(__dirname+"/dist"))
function middleWare(req, res, next){
    console.log("HI I'm a middleware!!!");
    next();
}

app.use(middleWare);

app.use("/user", userRoutes)

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/dist/index.html")
})

app.get("/*", (req,res)=>{
    res.redirect('back')
})




app.listen(PORT);

```

## /routes/user.routes.js
``` javascript
const express = require("express");
let posts = require("../data/posts.json")
let router = express.Router()

router.get("/:id", (req,res)=>{
    let userId = req.params.id;
    let userPosts = posts.filter(post=> post.userId == userId)
    res.json(userPosts);
})

module.exports = router;

```

