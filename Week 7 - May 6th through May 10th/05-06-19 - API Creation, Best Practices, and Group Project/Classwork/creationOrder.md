## Server Setup
1. `npm init`
2. Install packages needed
3. Set up folder / File Structure
4. Set up server.js
``` javascript
    const express = require('express');
    const app = express();
    const PORT = 3000

    app.use(express.static(__dirname+"/dist"))

    app.get('/', (req,res)=>{
        res.send("Hello World")
    })

    app.get('/*', (req, res)=>{
        res.redirect('back');
    })

    app.listen(PORT);
```

5. Setup Database
    1. Start up MAMP and Access PHPMYAdmin
    2. Create a new Database
    3. Create Tables and Schemas
    4. Setup Username/Password for DB connection

6. Connect to the Database
    1. Declare Connection
    2. Get Pool
    3. Export the Pool

7. Models
    1. Import Connection
    2. Create Functions needed
    3. Write SQL statements
    3. Export functions
8. Routes
    1. Declare Routes
    2. Utilize Model Functions

## API Design
1. Assume the front end user (and developer) is an idiot
2. Assume attacks will happen
3. Always send a response with helpful errors
4. Send statuses whenever possible