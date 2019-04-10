# Classwork for 4-10-19

This will be a little bit more freeform than a lot of the homework thus far. This will be a group project with randomly assigned teammates. You will all be working out of the same repo for this so make sure you're using appropriate branch names. When one of you is complete with a task, be prepared to walk through your code and discuss what it does with the group so anyone unclear on some topics can learn. Make sure you have proper comments as well.

## First
* Find an API to use (public with key, public without key, pay, it doesn't matter). It just can't be identical to the in class work.
* Be prepared to discuss why you chose that API.
* Build a clean site where your API data will be shown.
    * This should be built from scratch with HTML and Styling chosen by you.
    * Follow best practices for DRY CSS and proper separation of classes.
    * This does NOT have to be incredibly detailed but should look good as a single site.
    * Ensure that all pages are done with mobile in mind and can be seen properly on ANY sized device.
* Allow input from the user and make an API request based off what the user is looking for. 
    * Example, if you chose the OMDBAPI, let them search for movies with a specific title or by a certain actor
* Take the information returned from the API and display that on your site. The data displayed should utilize some form of transition in CSS to appear in a pleasant and non-jarring way for the user.  
* Allow for a message to the user when the information is loading such as a loading bar or icon that disappears upon proper retrieval.
    * Try to utilize some from of transform for a load effect when the loading bar disappears. This can be as simple as a shrink and fade out, or having the loading bar rotate along the y axis like a flipping card. 
* Have an error message such as "Something went wrong" or "Please try again later" if the request was denied/failed to work.
* Also add a message telling them that they NEED JavaScript in order for the site to work properly if they don't allow JavaScript in their browser

## Second
* Create a VERY simple form on a separate page (can be styled or not, that's not important) that allows them to sign up for your site. 
* Have the following on it:
    * At least three inputs (your choice as to what but they have to have SOMETHING even if its just a single character in them to be valid) 
    * A set of radio buttons with at least 4 options
    * At least 3 checkboxes
    * One hidden input with any value you prefer
* Take all that data and then send it to the  [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
* Use an alert or console log to notify the user that their account was created with the information that was returned from the POST request.