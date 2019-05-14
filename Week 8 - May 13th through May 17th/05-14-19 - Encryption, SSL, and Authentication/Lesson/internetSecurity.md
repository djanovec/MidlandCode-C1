## Internet Security and Authentication
What all can you do to secure your application?

## Cookie/Session Based Security
### Benefits
* The biggest benefit is the persistence of cookies. It can easily be used to store information for repeat visitors and are stored locally as opposed to on the server itself.
* They work without the user having to know anything about their use.
* Because they are local, they reduce server memory impact.
* Uses a database to store session information which allows messages to be pushed directly to all users without any other information.

### Downsides
* If a user disables cookies it can cause problems or even break the application if the cookies are relied upon for authentication.
* Each cookie is limited in information stored.
* Because of the above they're almost always limited to string information.
* Easily accessible and readable if the user finds them.
* Most browsers limit the number of cookies per site which coupled with the small amount of data sent it can cause problems if you need to send a lot of data via cookies.
* Can cause issues on mobile devices.

## Using Session based authentication with Express
If you want to implement cookies and session based storage, the defacto is [Express-session](https://www.npmjs.com/package/express-session) and is one of the most used for express with 520k downloads per week. It allows for the easy setup of session based authentication and is well documented. The one problem currently is that you have to setup another database/table for keeping track of all of your sessions.


## JWT Stateless Authentication
### Benefits
* Since most web apps are by nature stateless, they continue that usage and can make things a bit easier.
* Allows more complex data to be stored in the JWT.
* Allows for a separate authentication server to handle the load of all authentication requests.
* Much better cross platform compatibility with mobile and other devices.
* Hashes information to keep it secure.

### Downsides
* If someone hacks the JWT it can cause major security issues.
* If you set up response or requests incorrectly on your app or server you can inadvertently break parts of your application.
* The stateless nature means it's harder to leverage a session database to send a bunch of information to your users. (Still feasible but not super easy)

# TLS/SSL
These are the backbones of internet security. Ever see a site that is `https://` as opposed to `http://`? That site uses an SSL/TLS certificate. This is done via the handshake between sites and something called [symmetric cryptography](https://en.wikipedia.org/wiki/Symmetric-key_algorithm). Basically it's done with individual encryption keys that are unique for each connection. 

### How it's used in Internet Security
Without encryption, an attacker can be paying attention to any communication between a server and a client to keep track fo all of the information sent between the two. SSL certificates can block this with the use of a public and private key. A public key is known to your server and available in the public domain. This key can then be used to encrypt any information sent back and forth. The private key is what the user getting the information has. Only the private key can unlock the message/info encrypted with the public key. Think of it as Person A has a message and a padlock but no key. They lock it and then send it to Person B who has the only key. If intercept that package I couldn't unlock it (well I could but it could take a really long time and not be worth it).
