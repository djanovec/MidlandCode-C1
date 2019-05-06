## So Now we want to send data!

### Generic Sending of Data
* Express can't easily handle posted data without some sort of help. It seems weird I know but it's the way it is.
* The accepted practice is to use `body-parser` this will allow the express `.post` route to actually access the body of the request as a JSON file
* A simple `import bodyParser from 'body-parser';` with the appropriate `npm install` command will get the body-parser module into you server.js file.
* From there it's as simple as declaring it as middleware `app.use(bodyParser.json())`. That allows access to the json object being sent to the server!
* Any time you're using a .post request it's as simple as pulling it from `req.body` so let's say you posted the following JSON file to a .post route:
    ``` javascript
    {
        "username": "John",
        "password": "Smith"
    }
    ```
    If you wanted to get the username key you can simply log it like: `console.log(req.body.username)`
* If you wanted to test in postman you'll need to post it as `raw` data of type `json` then just build a valid JSON and click send!
## What about passwords?
* So in the above example we're sending a JSON object with a `username` and `password`. It's being sent as plain text. Is this a bad thing, if so why/why not?