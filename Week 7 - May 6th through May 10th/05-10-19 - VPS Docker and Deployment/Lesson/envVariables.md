## config.js (in your .gitignore)
``` javascript
process.env.DBHOST = "HOSTNAME"
process.env.DBPORT = "PORT NUMBER"
process.env.DBUSER = "DBUSER NAME"
```

## connections.js
``` javascript
    database: process.env.DBNAME //usersDatabase
```

