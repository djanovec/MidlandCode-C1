## Review

We've covered a lot of topics this week and have done a lot of work in class. This will probably be one of the easier weeks though depending on how you look at it. Most (but not all) Fridays will be a chance for review and a chance to ask questions. This week is no different.

If you feel like you've got all the topics so far, feel free to move on to the in class work. If not, ask away!


## HTML Elements

### Semantic Elements -
If you're going to use semantic elements for part of your page, I recommend using them throughout the entirety of the project. 

* Main - Any Main content usually one per page
* Aside - Any content to the side like a glossary, usually one per page
* Header - Any sort of header, can be page header or section header
* Footer - Any sort of footer, can be page footer or section footer
* Nav - Any navigation menu, top menus or sub menus can use these
* Section - Any Section, usually inside a main. Second least used of these for me.
* Article - Usually a sub section of Sections, least used of these for me.

### Most Used Tags and Their Most Used Attributes
Most used for pretty much all elements are `class`, `id`, and `style`. Below will be the most used elements as well as any element specific attributes outside of the above three. If no additional attributes are listed, the main three are the only ones generally used
* `<div></div>` - Containers in lieu of or addition to Semantic Tags
* `<a></a>` - Used for internal or external links. `href` allows for the actual url or id to be linked to
* `<img>` - Used to add images to the page. `src` allows for a url of the image to be loaded
* `<ol></ol>` or `<ul></ul>` - Creates ordered (numbered) or unordered (bullet pointed) lists.
    * `<li></li>` - List items contained in one of the lists above.
* `<form></form>` - Parent form container for any form elements
* `<label></label>` - Label for any form elements. `for=""` allows the label to link to a form element.
* `<input>` - Input elements. 
    * `type=""` - Determines the kind of input. Can be `text`, `radio`, `checkbox` `password` or others.
    * `name=""` - Declares the name of the input for use in sending the information to the server. Needs to be the same across all shared `radio` or `checkbox` types to ensure the form works correctly.
    * `placeholder=""` - Determines a placeholder to start in the input allowing better user experience.
    * `value=""` - Sets the default value for the input. Should only be used to help with auto-fill.
* `<button></button>` - Allows for a button to display
* `<script></script>` - Allows for inline javascript or the loading of an external javascript file.

### Most Used CSS and their Uses
* `background` - Single declaration styling to set multiple background properties.
    * `background-attachment` - How the background image attaches to the screen.
    * `background-color` - Sets the background color.
    * `background-image` - Sets the background image
    * `background-position` 	backgroundPosition
    * `background-repeat` - Alows the background to `repeat`, `repeat-x`, `repeat-y`, or `no-repeat`
    * `border` - Single Declaration styling for border `1px solid black` width, style, color.
        * `border-bottom`, `border-top`, `border-right`, `border-left` same as above for one side each
        * `border-color` - Sets border color for all borders. Could also be `border-(side)-color` for one side.
        * `border-style` - Sets border style for all borders. Could also be `border-(side)-style` for one side.
        * `border-width` - Sets border width for all borders. Could also be `border-(side)-width` for one side.
* `clear` - Set to `both`, `right`, or `left` to clear floated elements on that side.
* `color` - Sets font color.
* `cursor` - Sets the cursor for that element. Can be: `pointer`, `help`, `none`, `default` or others.
* `display` - Sets the display for the element. Can be `flex`, `inline`, `inline-block`, or `block`
* `FlexBox` Attributes
    * `flex-flow` - Sets in one line if the flex container should be a `row` or `column` and if it should `wrap`
        * `flex-direction` - `row` or `column`. Default is `row`
        * `flex-wrap` - Sets if it should `wrap` or `no-wrap` or `wrap-reverse`. Default is `no-wrap`.
    * `flex` - Single line styling `flex: x y size` determines the `grow`, `shrink` and `basis` respectively.
        * `flex-basis` - sets the starting width (for row) or height (for column) of a flexed item.
        * `flex-grow` - Determines if an item should grow (1 or higher) or not (0) as the flex container grows. Default is 0
        * `flex-shrink` - Determines if an item should grow (1 or higher) or not (0) as the flex container grows. Default is `
    * `justify-content` - Determines how content should be justified in a flex box. Can be `space-around`, `space-between`, `space-evenly`, or `center` to add that justification to the element.
* `float` - `left` or `right` to float the element to either the left or right of the container.
* `font` - Sets the font for the element.
* `font-family` - Sets the font family (multiple fonts in a stack) for the element
* `font-size` - Sets the font size to be used
* `height` - Sets the height of the element
* `left`, `top`, `right`, `bottom` - Sets the offset from the declared attribute for use with relative or absolute positioning
* `line-height` - Sets how much space each line of text should take up.
* `list-style` - Overwrites default bullet/number styles for `<ol>` or `<ul>` tags.
* `margin` - One line styling for all margins. Can be 1-4 values depending on which sides should be styled.
    * `margin-bottom`, `margin-top`, `margin-left`, `margin-right` - Sets margin for one side only.
* `overflow`, `overflow-x`, `overflow-y` - 	Sets whether overflow of an element is `visible`, `hidden`, allows to be `scroll` or others.
* `padding` - One line styling for all margins. Can be 1-4 values depending on which side(s) should be styled
    * `padding-bottom`, `padding-top`, `padding-left`, `padding-right` - Sets padding for one side.
* `position` - Allows to determing the position. When used with `top`, `left`, `right`, and/or `bottom` can specifically style where the item should be according to:
    * `relative` - The item will be moved _relative_ to the position it would appear in the normal document flow.
    * `absolue` - Positioning will be based off the nearest ancestor container with `position: relative` keeps looking up the chain for a `relative` ancestor stopping at the body.
    * `fixed` - Will be positioned based off the body and will not move when content is scrolled.
* `text-align` - `center`s text, moves text to `right`, moves text to `left`, or `justify`s text.
* `text-decoration` - Can be used to remove underline from `<a>` tags
* `text-transform` - Can be used to force text to be `lowercase` or `uppercase`
* `visibility` - Can make an item `visible` or `hidden`
* `width` - Sets the width of an element.
* `z-index` - Pushes elements in front of or behind other elements in respect to the user.

