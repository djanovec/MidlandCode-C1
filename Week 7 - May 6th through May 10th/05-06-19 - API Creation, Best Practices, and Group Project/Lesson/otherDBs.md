## So what other options do you have for databases?

### PostGres

- [Overview](https://www.postgresql.org/about/)
- Used for more complex things that MySQL can't handle.
- Allows for more types of things stored
- Open source (unlike MySQL which is proprietary)
- Easy integration with Heroku
- Example with node:

```javascript
// In Connections File
const pg = require("pg");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/todo";

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  "CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)"
);
query.on("end", () => {
  client.end();
});

// In Routes File
router.post("/api/v1/todos", (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = { text: req.body.text, complete: false };
  // Get a Postgres client from the connection pool
  pg.connect(
    connectionString,
    (err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err });
      }
      // SQL Query > Insert Data
      client.query("INSERT INTO items(text, complete) values($1, $2)", [
        data.text,
        data.complete
      ]);
      // SQL Query > Select Data
      const query = client.query("SELECT * FROM items ORDER BY id ASC");
      // Stream results back one row at a time
      query.on("row", row => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on("end", () => {
        done();
        return res.json(results);
      });
    }
  );
});
```

### MongoDB

- Becoming the Defacto NoSQL language.
- Developer friendly as it's working with raw JSON objects (or at least JSON like objects)
- Done in node through the mongoose package
- Multiple free hosting sites avalable such as `mlab.com`
- Easily set functions to allow for schemas to have build in commands such as a `sanitize` function for user models.
- Uses collections in lieu of tables.
- Example with Node:

```javascript
//-------------------- In Mongoose Config File ------------------//
export default mongoose => {
  function gracefulExit() {
    mongoose.connection.close(() => {
      console.log(
        `Mongoose connection has disconnected through app termination`
      );
      process.exit(0);
    });
  }

  mongoose.connection.on("connected", ref => {
    console.log(
      `Successfully connected to ${process.env.NODE_ENV} database on startup `
    );
  });

  // If the connection throws an error
  mongoose.connection.on("error", err => {
    console.error(
      `Failed to connect to ${process.env.NODE_ENV} database on startup `,
      err
    );
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    console.log(
      `Mongoose default connection to ${
        process.env.NODE_ENV
      } database disconnected`
    );
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
  mongoose.connect(
    process.env.MONGO_URI,
    { useMongoClient: true },
    error => {
      if (error) throw error;
    }
  );
};

//----------------- Schema Example ----------------------//
import mongoose from 'mongoose';

import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

let userSchema = mongoose.Schema({

  local : {
    username : { type : String, unique : true },
    password : String,
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    email : { type : String, unique : true },
  },
  jwthash: {type: String},
  role : { type : String }
}, {timestamps: true});

// password Hasher anytime password is changed
userSchema.pre('save', function(next){
  if(!this.isModified('local.password')){
    return next();
  }
    this.local.password = this.generateHash(this.local.password);
    this.jwthash = crypto.randomBytes(20).toString('hex');
  return next();

});

// Generates the hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Ensures valid password
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.sanitize = function(){
  return {
    _id : this._id,
    username : this.local.username,
    friends : this.local.friends,
    email: this.local.email,
    role: this.role,
    lastUpdated: this.lastUpdated
  }
};

export default mongoose.model('User', userSchema);

//----------------- In a routes file-------------------//
import User from "../models/user.model.js";

// In route
User.findOne({ _id: req.user._id }, (err, user) => {
        user.hash = crypto.randomBytes(20).toString("hex");
        user.save(err => {
        res.send({ success: true });
        });
})
```
