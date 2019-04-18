## Classwork Solution for 4-17
The file in this folder titled fileStructure.png is an image of the file structure for the project we worked on today. Below are the different files (with file names listed before each) we edited to make this application work. Since no styling was added with the exception of adding an `active` class for the `app.component.scss` I will not be including any stylesheets. As compared to yesterday's example [here]("../04-16-19 - Component Interactivity and LocalStorage/Classwork/classworkSolution") we made no changes to the `app-routing.module.ts`, the `app.module.ts` (outside of changes made by the CLI) or the `todo.service.ts` files so they will not be included here.


## TodoComponent
We updated the component to include the addition of the child component `todo-list` to allow for the reusability of that compononet in both this and the user component. We then moved the filtering variables into the todo-list component to allow for filtering on both the user and todo components. We added the variables via parent-child communication to allow the child to have access to the todo array. This will also be seen on the `user.component.html` file.
### .ts Controller File

``` typescript
import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo: any = {task: '', username: ''}
  todos: any[] = [];
  constructor(private todoService: TodoService){
    this.todos = this.todoService.allTodos;
   }

   addTodo(){
    this.todoService.addTodo(this.todo);
    this.todo = {task: '', username: ''}
    this.todos = this.todoService.allTodos;
   }

  ngOnInit() {
  }

}


```
### .html Template File

``` html
<br>Task:<input type="text" [(ngModel)]="todo.task"><br>
Username: <input type="text" [(ngModel)]="todo.username"><br>
<button (click)="addTodo()">Add Todo</button>
<br>
<app-todo-list [todos]="todos" [isUserPage]="false"></app-todo-list>
```

## UserComponent
### .ts Controller File
Similar to the above example of the todo component, we allowed for the sharing of the todos array to the child component. We also had to allow for the delete button to communicate data up to the parent by adding an event emitter.
``` typescript
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  task: string = ''
  todos: Object[] = [];
  username: string;

  constructor(private todoService: TodoService, private actr: ActivatedRoute) { 
    this.username = this.actr.snapshot.params.username;
    this.todos = this.todoService.getByUsername(this.username);
  }

  addTodo(){
    let todo = {
      task: this.task,
      username: this.username
    }
    this.todoService.addTodo(todo)
    this.task = ''
    this.todos = this.todoService.getByUsername(this.username)
  }

  deleteTodo(id){
   this.todoService.deleteTodo(id);
    this.todos = this.todoService.getByUsername(this.username)
  }
  ngOnInit() {
  }

}

```

### .html Template File
``` html
<br>Task:<input type="text" [(ngModel)]="task"><br>
<button (click)="addTodo()">Add Todo</button>
<app-todo-list [todos]="todos" [isUserPage]="true" (deleteEvent)="deleteTodo($event)">

</app-todo-list>
```
## Todo-List Component
This is a presentational component that allows data to be passed form the parent down to it and conditionally renders the delete buttons as well the ability to filter via the username. The event emitter allows for the delete button to communicate with the `user.component.ts` by emitting the id to be deleted and accessing the delete funciton on the parent.

### todo-list.component.ts
``` typescript
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Object[];
  @Input() isUserPage: boolean;
  @Output() deleteEvent = new EventEmitter<number>()
  sortString: string = "id"
  constructor() { }

  deleteTodo(id){
    this.deleteEvent.emit(id);
  }
  ngOnInit() {
  }

}

```

### todo-list.component.html
``` html
<h2> Filter here</h2>
<input type="text" [(ngModel)]="searchString">
<br>
<h3>Sort Here</h3>
<select [(ngModel)]="sortString">
  <option value="id">Id</option>
  <option *ngIf="!isUserPage" value="username">Username</option>
<option value="task">Task</option>
</select>

<div *ngFor="let td of todos | filter:searchString | sort:sortString" [class.incomplete]="!td.completed">
id: {{td.id}} Name: {{td.task}} 
Username: <a [routerLink]="['/user/'+td.username]">{{td.username}}</a> Completed: {{td.completed}}
<button *ngIf="isUserPage" (click)="deleteTodo(td.id)">Delete This Todo!!!!!!!!!!</button>
</div>

```