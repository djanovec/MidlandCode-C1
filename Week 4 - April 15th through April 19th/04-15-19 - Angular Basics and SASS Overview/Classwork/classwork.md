## We'll be taking the existing app and adding a few components to it
1. Create a new component using the ng commands
2. Attach this component to the template for the base component
3. Have this component generate a random number and display it in the DOM
4. Create another component (without the ng commands)
5. Attach this component to the base component as well
6. Have an input field and a button in this template. Don't have either do anything yet though.


## Let's implement some scss files in lieu of css files.
1. Take any styling out of the parent components / top level style file and move them to the relevant container.
2. Declare some variables and mixins in a shared file as needed.
3. Think about what all you might need to change in your file structure to get the styling to work the way you intended it to.


## Random Number Angular
``` typescript
//template
    <div *ngFor="let num of randomNum; let i = index">Random Number {{i+1}}: {{num}}
<button *ngIf="i !== 4" (click)="deleteNumber(i)">Delete Number</button>
</div>

<button (click)="addRandomNum()">Add Random Numbers</button>

//.ts File
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {
  randomNum: number[] = [];      // Array<number>
  constructor() { }

  addRandomNum(){
  this.randomNum.push(Math.floor(Math.random() * 100) + 1);
  console.log(this.randomNum);
  }
  deleteNumber(idx: number){
    this.randomNum.splice(idx, 1);
  }
  ngOnInit() {
  }

}

```

## Form Input
``` typescript
//Template
<input placeholder="Name" [(ngModel)]="personName">

{{personName}}

<button (click)="resetName()">Change Name</button>

    //.ts
    import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  personName: string = ""
  constructor() { }
  resetName(){
    this.personName = "John";
  }
  ngOnInit() {
  }

}
```