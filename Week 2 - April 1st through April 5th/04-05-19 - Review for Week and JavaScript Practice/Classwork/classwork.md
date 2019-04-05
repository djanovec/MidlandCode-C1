## Group Project

We will be building a simple todo list that allows for a user to add items, check them as complete, and set deadlines for them. The format should be visually pleasing and should be easy to understand at first look. How it is designed will be up to the groups and more functionality can be added, but it should have the following components at bare minimum:

* Two separate sections, one for completed tasks and one for incomplete tasks
* A form and button to allow for users to create a new task. This should include at least a title and due date but can include more.
* If not all information has been provided, or an invalid date format was used, the todo shouldn't be added and a message should be added to the DOM to tell the user what's wrong.
* For the lists of items, they should have a way to mark the todo as completed or un-mark it as incomplete.
* Once a todo is marked or unmarked as complete, it should be moved to the appropriate section. 
* The incomplete todo(s) should have a time remaining section. This should show the number of days remaining until the due date. It will show 0 if the due date is today, and the whole todo should be highlighted in some way if the due date has passed.
* Allow for a user to delete a todo that was added accidentally


## Personal Project

Utilize the image ![SketchPad](sketchPad.jpg) to create a drawing pad for users. It should have the following functionality (at minimum):
* Have a canvas HTML element
* Have 3 preset colors of your choice (to the left of the canvas)
* Allow the user to select any of the three colors and use some form of CSS (in this case the white border around red) to show which color is selected
* On mouse down on the canvas, start drawing on the canvas until the user releases the mouse or leaves the canvas. The color of the line should correspond to the selected color on the right.
* At the bottom have three sliders representing red green and blue, they should allow for a numerical value from 0-255. When the sliders are moved, the color in the box to the left of the sliders (in this case the purplish box) should adjust color according to the new `rgb()` values;
* When a user clicks add color, it should add the new color to the bottom of the other color buttons and be able to be selected for use on the canvas.
* Feel free to add more functionality, such as a way to clear the canvas, change the stroke size, add a better cursor etc.