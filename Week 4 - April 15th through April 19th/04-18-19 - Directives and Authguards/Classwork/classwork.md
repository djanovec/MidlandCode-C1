## Let's practice a little bit with some directives!

You can use a pre-existing app for this or start with a new one:

* Generate two directives:
    1. MouseFocusDirective
        * This will be associated with anything that has a `[mouseFocus]` attribute
        * When the item is hovered over, change the background color to `blue`
        * When the mouse leaves the element, change it to `purple`
        * Any time the mouse is pressed down on the element have the background color be `yellow` until the mouse button is released.
    2. MissedBirthdayDirective
        * This directive should be attached to anything with a class of `.birthday`
        * It should take an input of a date in `MM/DD/YYYY` format.
        * Calculate the time between now and the date provided. 
        * If their birthday has already passed this year, add a `.missed` class which should add a red border
        * If they are older than you, add the `.is-older` class which should make the background black and the text color red.

        ``` typescript
            import { Directive, Input, OnInit, HostBinding } from '@angular/core';

            @Directive({
            selector: '.birthday'
            })

            export class MissedBirthdayDirective implements OnInit{
            @Input('birthday') birthday: string;
            myBirthday: Date = new Date('1980-01-01')
            constructor() { }
            @HostBinding('class.missed') private missed: boolean;
            @HostBinding('class.is-older') private isOlder: boolean;

            checkDate(){
                let now = new Date(Date.now());
                let splitDate = this.birthday.split('/')
                let userBday = new Date(`${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`)
                this.isOlder =  userBday < this.myBirthday;
                this.missed = (userBday.getMonth() < now.getMonth() || 
                (now.getMonth() === userBday.getMonth() && userBday.getDate() < now.getDate()))
            }

            ngOnInit(){
                this.checkDate();
            }


            }
        ```

## Back to the Todo App!

1. Add the ability for a user to login and store the user into local storage. 
2. Only allow the appropriate user to access a `user/:username` route via an AuthGuard

