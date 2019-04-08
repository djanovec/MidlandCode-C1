# Responsive Web Design an Intro

Responsive web design allows for a page to be a pleasant experience regardless of what device is being used. We'll cover a lot of topics that are important but there are SOOO many more that you can learn. A lot of this information was taken from [Googles RWD intro](https://developers.google.com/web/fundamentals/design-and-ux/responsive/) as it provides a clear and concise overview of RWD.

## The Basics - 

### Setting the viewport
Most IDES do this automatically with the html boilerplate but some older sites might not have it in already. It can be done with the following: 
``` html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

To attempt to provide the best experience, mobile browsers render the page at a desktop screen width (usually about 980px, though this varies across devices), and then increases font sizes and scales the content to fit the screen. This inconsistent font-sizes to users who might have to zoom and move around the page to see everything. Setting the above tells the page to match the screen's actual device width in pixels.

### Size Content to the Viewport

Basics for RWD are the following: 
* Do not use large fixed width elements.
* Content should not rely on a particular viewport width to render well.
* Use CSS media queries to apply different styling for small and large screens. This is the biggest thing you can do to help your sites look.
* Never completely hide content
* Optimize text for reading - According to Google: Classic readability theory suggests that an ideal column should contain 70 to 80 characters per line (about 8 to 10 words in English). Thus, each time the width of a text block grows past about 10 words, consider adding a breakpoint.

### Determining Breakpoints
In addition to the text optimization mentioned above, the following breakpoints are a solid starting point for a project: 
* sm (for phones - screens less than 576px wide)
* md (for small laptops - screens equal to or greater than 768px wide)
* lg (for laptops and desktops - screens equal to or greater than 992px wide)
* xl (for large desktops - screens equal to or greater than 1200px wide)

While the above is being used for Bootstrap, use breakpoints that work well for your site and/or project.



### Media Queries

Like pretty much anything CSS, HTML, or JavaScript related, MDN covers this topic in depth [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries). That being said, here are the basics:

#### Media Types to Query
* `all` - For all devices
* `print` - For print preview mode
* `screen` - For screens
* `speech` - For speech synthesizers

#### Most Common Features to Query:

* `width` - Width of the viewport	 
* `height` - Height of the viewport	 
* `aspect-ratio` - Width-to-height aspect ratio of the viewport	 
* `orientation` - Orientation of the viewport	 
* `resolution` - Pixel density of the output device	 

#### Logical Operators
* `not` - When utilizing two or more opposing queries
* `and` - Must fit two or more criteria

#### Syntax
The primary syntax is as follows:
``` css
@media mediaType {}
```
OR
``` css
@media (mediaFeature: condition){}
```

If you wanted to have a query for a max width of 1200px AND a minimum width of 800px it would be as follows:
``` css
@media (max-width: 1200px) and (min-width: 800px){}
```

The brackets then contain any styling needed. In the above example if we wanted to hide an element with `class="large-screen-only"` once the screen width drops below 800px we could do that with:
``` css
@media (max-width: 800px){
    .large-screen-only{
        display: hidden;
    }
}
```