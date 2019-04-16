# Local Storage

### So a user just went to a new page after filling in a ton of data on the previous page but then accidentally clicked referesh before finishing the process all the way through. What happens? Well it's one of two things generally

1. In a basic angular application, the app returns to the state it is at initiation which means all the progress is lost, they hate life, and you because you designed an app with poor UX/
2. In an app that utilizes localStorage, you can avoid this!

## How to access local storage in angular:

``` typescript
    //Saving a non-object item into localStorage
    let user = "Mike";
    localStorage.setItem('User', user);

    //Reading a non-object item
    let variableName = localStorage.getItem(nameOfKey);

    //Saving a JSON Object
    let user = {id: 2, name: 'Mike'};
    localStorage.setItem('User', JSON.stringify(user));

    //Reading a JSON object
    let user = JSON.parse(localStorage.getItem('User'))

    //Updating an item
    localStorage.setItem(existingkey, newValue);

    //Removing an item
    localStorage.removeItem(nameOfKey)

    // Clearing all items
    localStorage.clear();

```

### For best practice you should usually create a service worker to easily access / update / destroy specific sets of keys.