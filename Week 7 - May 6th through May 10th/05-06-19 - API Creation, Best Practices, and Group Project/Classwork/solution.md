## server.js
``` javascript
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const PORT = 3000
const userRoutes = require("./routes/users.routes");


app.use(bodyParser.json());
app.use(express.static(__dirname+"/dist"))

app.use("/users", userRoutes);

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.get('/*', (req, res)=>{
    res.redirect('back');
})

app.listen(PORT);
```

## connections.js
``` javascript
const mysql = require("mysql");
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "todoAppadmin",
    password: "admin",
    database: "todoApp"
});

module.exports.pool = pool;
```

## user.model.js
``` javascript
const pool = require("../connections").pool;
const bcrypt = require("bcrypt");

function create(req, res){
    pool.query("SELECT * FROM USER WHERE username = ?", 
    [req.body.username], (err, queryReturn)=>{
        if(queryReturn[0]){
            return res.send("USERNAME ALREADY EXISTS")
        }
        let password = bcrypt.hashSync(req.body.password, 5);
        let username = req.body.username;
        pool.query("INSERT INTO USER (username, password) VALUES(?,?)", [username, password], (err, result)=>{
            if(!err){
                return res.send("Signed Up!");
            }
            console.log(err);
            res.status(500).send({error: "SOMETHING BROKE"})
        })
    })    
}

function getAll(req, res){
    pool.query("SELECT id, username FROM USER", (err, result)=>{
        res.send({
            error: err,
            users: result
        })
    })
}

function login(req, res){
    pool.query("SELECT * FROM USER WHERE username = ?", [req.body.username], (err, result)=>{
        if(result[0]){
            if( bcrypt.compareSync(req.body.password, result[0].password)){
                return res.send({message: "Welcome Back!"})
            }
            else{
                return res.send({error: "Invalid Username or Password"});
            }
        }
        res.send({error: "Invalid Username or Password"})
    })
}

module.exports.getAll = getAll;
module.exports.login = login;
module.exports.create = create;

```
## users.routes.js
``` javascript
const express = require("express");
let router = express.Router();
let user = require("../models/users.model");

router.get("/all", (req, res)=>{
    user.getAll(req, res);
})

router.post("/login", (req, res)=>{
    user.login(req, res);
})

router.post("/signup", (req, res)=>{
    user.create(req, res);
})

module.exports = router;

````