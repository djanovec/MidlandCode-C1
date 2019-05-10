## What if I want my SPA AND server code in the same folder?

* First you want to create the SPA folder in angular this can be a new angular app via `ng new` or a preexisting app.
* Next you could copy over all of the server code into the folder. Make sure you don't copy over `package.json` or `package-lock.json`.
* From here you either need to have the server serve static files from `/dist` which can easily be changed in `server.js` OR change the `outputPath`in `angular.json` to whatever folder you want it to such as public or prod, etc.


## How about running both simultaneously?

* We've been using `ng serve` to view our SPAs in browsers but that won't work to allow our frontend and backend to talk to each other without a lot of configuring. Instead we'll use `ng build`. 
* If you want to be able to edit the angular source files and have it rebuild each time you change something you'll want to use `ng build --watch` this will rebuild the bundle on any change.
* Now you can have a new script for let's say `"front" : "ng build --watch"` in your package.json file which will build the angular app and rebuild on changes when you run the `npm run front` command.
* Adding a `"back": "nodemon server.js"` script will run the server and reload on any changes. BUT it will also reload on any changes to the angular folders because they're part of the root folder. This can be overcome by adding a `nodemon.json` file in the top level folder and adding the following script to it:
    ``` javascript
    {
        "ignore": ["dist/", "src/app/"]
    }
    ```

## But this is two scripts I only want to have to type `npm start`!!!

* That's easy, but you'll need to install a global package to do it. 
* install the concurrently package with `npm i concurrently -g`
* Set up your start command (or any command you want to run both from) to be:
``` javascript
    "start": "concurrently --kill-others \"ng build --watch\" \"nodemon server.js\" "
```
* This CAN cause some problems so it depends on which direction you want to go with your commands

## That's it!


``` javascript
 login(username, password) {
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    this.rootStore.clearFlash();
    this.http
      .post("/api/auth/login", JSON.stringify({ username, password }), {
        headers: headers
      })
      .pipe(
        map((res: UserResponse)=> {
          if(res.token){
            localStorage.setItem("authToken", res.token);
            this.isLoggedIn = true;
            this.router.navigate(["/buddies"]);
            this.rootStore.selectUser(res.user)
          }
          return res.err
          }),
        catchError(error => throwError(error.error.err))
      )
      .subscribe(errMsg => {
        if(errMsg){
          this.rootStore.addError(errMsg)
        }}, 
        err=> {
          this.rootStore.addError(err)} );
  }

\
```