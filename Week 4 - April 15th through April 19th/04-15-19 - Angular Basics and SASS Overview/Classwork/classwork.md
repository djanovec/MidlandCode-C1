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

## Routing:
### In Parent Template
``` HTML
<router-outlet></router-outlet>
<br>
<a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" 
    [routerLink]="['/random-number']">Random
    Number</a>
<br>
    <a routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" 
    [routerLink]="['/form']">Form</a>
```

### In App Routing Module
``` typescript
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { RandomNumberComponent } from './random-number/random-number.component';
    import { FormComponent } from './form/form.component';

    const routes: Routes = [
    {path: 'random-number', component: RandomNumberComponent},
    {path: 'form', component: FormComponent}, 
    {path: '**', redirectTo: 'random-number'}
    ];

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }
```


## Todo App
### Template
``` HTML
<label for="name">Name</label>
<input id="name" [(ngModel)]="task.name" type="text" placeholder="Todo Name">
<label for="date">Due Date</label>
<input id="date" type="date" [(ngModel)]="task.dueDate" placeholder="Due Date">
<button (click)="addTodo()">Add Todo</button>

<h2 class="blue-text">Incomplete Tasks</h2>
<ul>
  <ng-container  *ngFor="let todo of todos; let i = index">
  <li *ngIf="!todo.completed">Name: {{todo.name}}, Due Date: {{todo.dueDate}}
    <input type="checkbox" id="complete{{i}}" [(ngModel)]="todo.completed">
    <label for="complete{{i}}">Mark as Complete</label>

  </li>
</ng-container>
</ul>


<h2 class="yellow-text">Complete Tasks</h2>
<ul>
  <ng-container  *ngFor="let todo of todos; let i = index">
    <li *ngIf="todo.completed">Name: {{todo.name}} , Due Date: {{todo.dueDate}}
      <input type="checkbox" id="incomplete{{i}}" [(ngModel)]="todo.completed">
      <label for="incomplete{{i}}">Mark as Incomplete</label>
    </li>
  </ng-container>
  </ul>
```
### Controller
``` typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  todos: Object[] = [];
  task: Object = {name: '', dueDate: '', completed: false}
  constructor() { }

  addTodo(){
    this.todos.push(this.task);
    console.log(this.todos);
    this.task = {name: '', dueDate: '', completed: false}
  }
  ngOnInit() {
  }

}
```