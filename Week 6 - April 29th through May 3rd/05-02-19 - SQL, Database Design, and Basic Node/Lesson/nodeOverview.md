## So now the time has come to play around with node... Are you ready?

### Basics
* Node allows you to run (once or continuously) some javascript to serve some sort of purpose.
* Comes pre-loaded with A TON of different tools to allow you to do all sorts of fun things.
* Follows similar pattern to our angular apps in that it uses a package.json to determine what things to load and what not to load. 
* Can declare dependencies and install from NPM

### Package.json
* Three major sections for this:
    1. Scripts - This is what allows you to declare custom scripts for building, running, serving your application.
    2. Dependencies - When you install using the `npm i somePackage` tag, anything you declare gets added to the dependencies section. This allows for easy retrieval and reinstall from a github clone.
    3. devDependencies - Similar to number 2 but with this, you can also leave things you only need in dev in this category so when it's deployed ONLY the required prod dependencies will be installed.
* Also allows you to add project information and keywords for easy searching on NPM / Other published locations.
* Is important to keep up to date to allow for easy review of dependencies etc.

### The Process
* Node allows you access to the process which can house ALL sorts of information. A single log of a process can look like a little overwhelming.
* With just `process.env` it starts to look a little bit more manageable. This is the environment of the process.
* It's important to note that the process itself allows you to add and change keys. This is what allows you to customize things at run time and call them later. ANY time you call `process.env.someKey` in your app it all points to the same location regardless of imports etc. This makes it incredibly easy to declare things such as secret keys or connection information for a database, etc.
* NOTE: This is almost ALWAYS done with the use of a file added to your `.gitignore` file. Why though?

### Node and the Wonders of ES6
* So it doesn't work with ES6 (Well it does depending on version to be fully clear)... But I thought you said we were going to be using ES6... Oh we are! That's where babel comes in.
* Babel is a package that can reconfigure different code into ES5 so a browser (or node itself) can understand it!
* Setup is few step process but overall fairly painful. This is the `MOST BASIC OF ALL` installations and you can do a TON more than you see here: 
    1. `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node` in the CLI sets up the requirements. Let's pull it apart and talk about what it does here.
    2. Next you declare a `.bablerc` file with the following data:
        ``` javascript
        {
            "presets": ["@babel/preset-env"]
        }
        ```
    3. Finally you can set up a script that instead of calling `node filename.js` calls:  `babel-node src/server.js`

### What if we want to keep a file running continuously like a server? 
* In most cases, the file will be kept running by the package you're using BUT it will not register ANY changes you make until you restart the command to run the file. Think of what happens when we edited the `angular.json` file. 
* You can use the `nodemon` package as a workaround for this though! With a simple `npm i nodemon` you can now call `nodemon filename` and it will run the file and keep it open, restarting anytime changes have been registered. 
* If you're also using Babel you can simply change the start script to:   `nodemon --exec babel-node src/server.js` and now it will use both!

### Passing Arguments to a Node APP
Let's say you have an app that you can run in `DEV`, `PROD`, or `TEST` environments. You can pass ANY arguments to the node process by adding them to the end of the node call. 
* Instead of `node server.js`, if you wanted to pass an environment you would call `node server.js PROD`. 
* To get the variable in the application you would call `console.log(process.argv[2])`. `argv[0]` and `argv[1]` are PRESET by node and as such you have to pull your arguments in order. 
* This can sometimes cause problems but is better than some alternatives.