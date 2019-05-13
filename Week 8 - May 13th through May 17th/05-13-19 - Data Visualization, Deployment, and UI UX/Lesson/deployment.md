# Deployment Issues and Questions
If you want to use a MySQL database, go to the Resoures Tab and search for [`ClearDB`](https://elements.heroku.com/addons/cleardb). It will add a `CLEARDB_DATABASE_URL` config variable in your Settings tab. This will be the information you need to access it via a desktop application such as [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

## Important Steps
* Pull out your credentials from the link: mysql://[`USERNAME`]:[`PASSWORD`]@[`HOST`]/[`Default Schema`]?reconnect=true
* Set up your tables and columns via the information above in `MySQL Workbench` or equivalent application.
* Set up your config vars in your `connections.js` AND on heroku.
* Set your port in your server file to `const PORT = process.env.PORT || 8080`
* Set your build script in your `package.json` to `ng build --prod`
* Set your start script in `package.json` to `node server` (where server is your servers file name)`
* Push everything to github
* Deploy via github.

