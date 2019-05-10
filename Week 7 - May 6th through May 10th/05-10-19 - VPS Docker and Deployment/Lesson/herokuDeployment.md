## What is Heroku
Heroku is a free hosting site that allows for easy deployment of applications directly form a gitHub repo. IN addition to easily setting up automatic deployment, you can also deploy directly from the command line.

### Usage
* Full documentaion can be found [here](https://devcenter.heroku.com/)
* Sign up for an account(or login) [here](https://www.heroku.com)
* Once logged in create a new application from the dashboard
* Set any configuration variables needed for your applicaton to run

![configVars](./configVars.png)
* Set up how you would like to deploy (or do so via the CLI)

![deploy](./deploy.png)

### Downsides
* Depending on usage of your application, the free tier only goes up to a certain amount of bandwith
* There is only native support for postGres on the site, but you can connect to any hosted database via configuring the `config variables`
* Depending on the plan, the application will go to sleep after a set amount of time which causes a small amount of load on startup if it has not been used in a while. 


### To Deploy from github repo
#### For an Angular App
* Choose to unignore your dist folder and run `ng build --prod` before pushing to github
* If you don't unignore your dist folder In your package.json
    * Update your scripts `"build": "ng build --prod",`
* Set the `"start"` command to `node server` (server is your server's file name) 
