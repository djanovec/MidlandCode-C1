## This is not the most ideal way to set up queries. But this is at least an introduction to pooling

* In the connections.js or db.js file: 
    ``` javascript
    var mysql = require('mysql')
    var pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'YOUR USERNAME (PREFERABLY FROM process.env.dbUsername)',
        password: 'YOU PASSWORD (PREFERABLY FROM process.env.password)',
        database: 'YOUR DATABASE (PREFERABLY FROM process.env.db)'
    })

    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }

        if (connection) connection.release()
        return
    })

    module.exports = pool;
    ```
* Then any route can access it with the following code: 
    ``` javascript
    //At the top
    let pool = require('../connections.js') // Or path to above code.

    //Obviously the query can be anything you want it to be this is just an example.
    pool.query('SELECT * FROM POSTS WHERE userId = ?', req.params.userId, (err, results, field)=>{
        res.send(results);
    })
    ```

* Ideally however you would move the queries into their own functions specific to the posts or users or whatever.
* This might look like (in the models file for posts):
    ``` javascript
    getPostsById(res, userId){
        pool.query('SELECT * FROM POSTS WHERE userId = ?', userId, (err, results, field)=>{
            if (err){
                res.send(err);
            }
            else{
                res.send(results);
            }
        })
    }
    ```
* Then in the routes function for `GET /posts/:userId`
    ``` javascript
    //At the top import the posts functions from the file

    router.get('/posts/:userId', anyMiddleWare, (req, res)=>{
        //The below is an example but it can be whatever way you import it you'd like
        postsFunctions.getPostsById(res, req.params.userId);
    })
    ```
