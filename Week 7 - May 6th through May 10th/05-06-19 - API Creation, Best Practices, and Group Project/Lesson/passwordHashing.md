## So yeah passwords.

I've mentioned it before but if you're on a site that when you ask to reset your password they just straight send you your password. NEVER USER THAT PASsWORD AGAIN (or the site if you can help it! But why?
* Best practice (and honestly ONLY practice at this point) is to store passwords in your database as hashed values.
* You can't avoid sending the password to the server as plaintext. Yeah you could hash it on the front end but that's pointless as the end user has access to ALL of the front end code.

### What is hashing?
* Basically hashing is just taking a value (in this case a password) and transforming it through the magic of math!
* Hashing is one way and one way only. Once it's changed you can't change it back. The beauty of this though is that if you take a set value it will ALWAYS change to the same value (sort of).
* Why is this secure? Well the problem is that it is only for a set amount of time longer. How long is tough to say. Basically ANY has can be cracked but because you're trying to reverse engineer it the amount of time it would require to get it right is so ludicrous it just doesn't make sense unless you have access to a super computer and NEED the value.
* Because of this passwords are converted to a hashed value then stored in the database. When a plain text password is provided via a login request or equivalent the order of operations is as follows:
    1. Plain text password is taken from `req` and turned into a hashed value. 
    2. User with the username provided is found in the database and the saved hashed password is retrieved.
    3. The two hashed values (one from the DB one form the req) are compared and depending on if they equal or not, the user is allowed access or a wrong password/username message is sent to the front end.

## How to hash

*  the `bcrypt` package is the preferred method for hashing. It's slower than the built in `crypto` package in node but is more secure (hence it being slower).
* This can be done synchronously or asynchronously depending on your needs. See the [docs](https://www.npmjs.com/package/bcrypt) for more info.
* After installing and requiring the bcrypt package, hashing is incredibly straight forward.
* Bcrypt uses salt rounds for more complex hashing
    * Salt rounds increase the time needed to hash but also make it more difficulty to crack. 
    * Every increase in salt rounds by 1 DOUBLES the time needed to hash. We're talking ms but it can add up.
* Steps for synchronous hashing (why synchronous or asynchronous?): 
    ``` javascript
        const bcrypt = require('bcrypt');
        const saltRounds = 10 
        var hash = bcrypt.hashSync(plainTextPassword, saltRounds);
    ```
    That's it!
* Then you can simply compare the two with: 
    ``` javascript
    bcrypt.compareSync(plainTextPassword, hashedValuedFromDB)
    ```
    That will then be true or false depending on if they match!

Play around with an example [here](https://www.dailycred.com/article/bcrypt-calculator)!