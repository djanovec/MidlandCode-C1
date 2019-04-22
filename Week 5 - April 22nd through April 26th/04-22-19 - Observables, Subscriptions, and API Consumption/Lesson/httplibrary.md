## Ok so we've tried fetches and the like before. But now for something completely different.
### NOTE:
    If you want to take advantage of APIs using Angular you can use anything in the ES6 and below arsenal, but the preferred method is via the HttpClient Library built into angular. Be aware that the ENTIRE library changed between Angular 4 and Angular 5. Previously it was the `Http` library but not it is the `HttpClient` library. You will almost assuredly see thee `Http` library still in use as it requires a refactor. The two libraries are very very similar but for simplicity sake I will be focusing on the `HttpClient` library.

## What is the HttpClient Library?
Basically it's the same as the fetch API or the XMLHttpRequest set up, it allows you to communicate with data from outside of the app itself. This is almost exclusively done via the use of 
and API call for data. 

## How do we use it?
* The library itself is actually quite simple to use. It utilizes semantic calls for the basic HTTP protocols. 
* The library itself is actually a series of functions that are observables so anything you want to do with them is completely acceptable. 
* Like most services or built in things, it needs to be injected into the constructor, it generally follows this pattern: 
    ``` typescript
        constructor(private http: HttpClient){}
    ```
* Once injected, to make actual calls the syntax is as follows: 
    * GET - `this.http.get('url', options)` options are hilariously optional.
    * POST - `this.http.post('url', object, options)`
    * DELETE - `this.http.delete('url', options)`
    * PUT - `this.http.put('url', object, options)`
* Generally speaking you would return the call and set up any possible options you would need when declaring the Observable. Remember any of the operators you have are fully usable with the `HttpClient` Library.
* All you would need to do is then subscribe and pass in the `next()` and `error()` functions to handle any issues. The errors are of type `HttpErrorResponse` and can be passed into an error handler as you see fit. best practice would be to take advantage of the `catchError(errorHandlerFunction)` operator in the pipe for the call.
* `retry()` being added to the pipe will allow you to declare how many times you can retry the call before handling errors. 
* Let's say we have todos we want to call via a `getTodos()` function on a service. We have an errorHandler function named `handleError` and we want it to retry at least 4 times before erroring out. That function might look like: 
    ``` typescript
        getTodos(){
            return this.http.get('ourUrl')
            .pipe(
                retry(4),
                catchError(this.handleError(error))
            )
        }
    ```
* With the above, we would simply need to subscribe to the data on our component like 
    ``` typescript
        this.todoService.getTodos().subscribe(res=> this.todos = res.todos); //or whatever key the response is on.
    ```
* Sometimes you'll need to add headers to a POST request. They're fairly easy to build:
    ``` typescript
        const httpOptions = ({
            headers: new HttpHeaders({
                'header-one': 'some-value'
                'header-two': this.someOtherValue
            })
        })
    ```
* Other than the headers you can set up parameters as well for the case of a get API request that allows parameters: 
    ``` typescript
        const options = {params: new HttpParams().set('paramName', value)}
    ```
    NOTE: Once params are created they are IMMUTABLE, you must declare all of the options at once. you can't add a `.set()` after the initial declaration.
