## Let's take our new found knowledge for a test drive!

Let's take advantage of the [Giphy API](https://giphy.com/) for this one!

* Create a new single component app. The component should simply have a text field and a div to display your list of returned items to. 
* When the user enters in text into the field it should automatically make an API call based off the search string. 
* Pick whatever you want for the starting values of the other required fields or add them to the form if you'd like. If you add them to the form, have them also automatically pull the data form the API on change
* Make sure the input is done changing before sending the api call. A wait time of 400ms should do the trick!
* If a user is typing a bunch but at the end of typing the value doesn't change, then don't send a new request.
* Also add a counter on the page (using observables) that shows how long the user has been on the page. 

## Not the required order but possibly the easiest.
1. Sign up for an API Key through Giphy
2. Look at the Giphy Docs to see what kind of format the data will be returned in from the API
3. BUild the template for the single component.
4. Create a simple HTTP.GET request with a button click to make sure you have http syntax down.
5. Set up the timer (for how long they've been on the page) observable
6. Add the extra functionality such as calling on change or with data typed / etc.