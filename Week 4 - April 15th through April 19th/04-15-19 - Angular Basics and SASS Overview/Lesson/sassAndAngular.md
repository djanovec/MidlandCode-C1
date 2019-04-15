### Angular Issues with SCSS
* Angular is automatically set up to use SCSS as part of the ng serve / ng build commands.
* Because SCSS is compiled at build/serve time if you're using random functions as part of your SCSS they will generate into CSS ONCE and then stay that way forever.
* Let's take a look at how children inherit styling from their parent. It might not be the way you think it would work. 
* Some key things to remember about:
    1. If you're keeping SCSS files separate by component you need to include the shared variables in each sub scss file otherwise it won't know what they are.
    2. Remember how parent and child components handle styling rules. 
    3. Keep nice clean files separate and utilize mixins and variables whenever possible.