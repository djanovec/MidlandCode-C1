# OAuth

First and foremost what is Oauth? It's an open authorization framework that allows for services to share assets or information across multiple sites. You're almost assuredly already using it in your everyday use. Ever log into a site with Facebook? Ever use some sort of SSO tech? You've already used OAuth then. Think of it as if you're letting a valet drive your car. 

### How it works
1. Website 1 connects to Website 2 on behalf of the user with OAuth and a verified identity.
2. A token is generated on Website 2 that is a single use token.
3. Website 1 then gives the token/secret to the original client software.
4. The software then provides the information to the Auth provider.
5. Client may be asked to authenticate if not already authenticated.
6. An approved access token is generated and given to the user.
7. That token is then given to Website 1.
8. Website 1 then passes it to Website 2 as authentication proof.
9. Website 2 gives access to Website 1.

It's that easy? While those steps may seem complex, the simplest way to think of it is that you can use a website to leverage the security of another for it's own security. This can make the authentication process for your app/site MUCH easier. The biggest downside is that if you're using SSO for multiple sites and your credentials are leaked/ found, get ready to have a ton of sites now be accessible. 

# Passport.js
[Passport](http://www.passportjs.org/docs/authenticate/) is a library for node.js that provides multiple authentication options. It has built in functionality for OAuth, OAuth 2.0 AND Facebook, Twitter, Google, and many others.

## Setting it up can be a bit tricky the first Time
In order to configure passport you need 3 things.
1. Authentication Strategy
2. Application Middleware
3. Sessions (this is optional especially with JWT Authorization)

First you need to set up your Local Strategy here's an example using mongoose:
``` javascript
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    pool.query("SELECT * FROM USERS WHERE USERNAME = ?",[username], function (err, user) {
      if (err) { return done(err); }
      if (!user[0]) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user[0]);
    });
  }
));

```
You then (with express) need to initialize the use of passport as a middle ware. An example is below with the sections needed only for session based authentication commented out:
``` javascript
app.configure(function() {
  app.use(express.static('public'));
//   app.use(express.cookieParser());
  app.use(express.bodyParser());
//   app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
//   app.use(passport.session());
  app.use(app.router);
});

```
From there you can implement it either in a route directly OR as middle ware as below:
``` javascript
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

  ```