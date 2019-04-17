## Pipes Overview
* Basic pipe and filter usage is fairly straight forward. You pass the value you're binding through a pipe that then does something to that value. Pipes can alter the appearance of an item or filter out an array. 
* Basic syntax is as follows: `{{variable | nameOfPipe}}` 
* If you set up your pipe to work as a filter in an ngFor it would be something aking to: `*ngFor="let name of names | somePipe"`. This would filter through names without any sort of search filter.
* If you want to pass parameters to a pipe, they can be done using the following syntax `{{variableName | somePipe:parameter}}`


## What are pipes and when should you use them?
* As stated above, the simplest use for a pipe is to change the appearance or to filter data.
* Pipes should be used in lieu of directly altering the variable you're looking to filter or change the appearance of.
* Pipes SHOULD not be used if you actually want to change the value of a variable. I.e. you should use a pipe to make a string variable all caps ONLY if you want the variable to remain in its original form in the component controller.

## How do you make a pipe?
* Guess what? It's a class! you can generate pipes with `ng g pipe pipeName`
* Creating a pipe from scratch in easy steps (steps 1-3 are automatic using the angular cli)
    1. Create the pipe .ts file in the appropriate location, a standard generic pipe looks like this:
        ```typescript
            import { Pipe, PipeTransform } from '@angular/core';
            @Pipe({
            name: 'nameOfPipe' //this is how you will actually call the pipe in the template
            })
            export class NameOfPipe implements PipeTransform {

                transform(value: any, args?: any): any {
                    return value;
                }

            }
        ```
    2. import the pipe .ts file into the appropriate module using `import {name of exported class in pipe file} from 'relative path to file'`
    3. Declare the pipe in your declarations array of the appropriate module file.
    4. Set up the funcitonality inside the pipe.ts file.