## Adding a filter pipe to our todo app

1. Take the existing code functionality and create a filtering pipe.
2. Add a search field to the todo list component
3. Filter out any todo that doesn't contain the appropriate search parameters.

## Adding a sort pipe to our todo app
1. Add a drop down containing three string values ('username','id', 'title' ) and link that using a model to the list component
2. Create a pipe that will take a string argument and sort an array of objects.
3. Sort the array based off the key that was passed as a string argument and return the array.
4. Connect the dropdown to the sort to allow for items to be sorted however the user prefers.


## Let's refactor our todo component a little further:
1. Add a completed tag to the todos. This should be true or false but should start as false for any new todos.
2. Create a completed class that will change the text of the todo to green in the list component.
3. Have the new class attach to the todo html element if the todo is completed.
4. For added challenge let's add a checkbox to the list that when clicks changes the completed key to false/true and updates the array via the service.