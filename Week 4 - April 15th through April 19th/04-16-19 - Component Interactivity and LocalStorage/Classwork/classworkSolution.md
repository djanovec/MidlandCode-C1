## Classwork Solution for 4-16
The file in this folder titled fileStructure.png is an image of the file structure for the project we worked on today. Below are the different files (with file names listed before each) we edited to make this application work. Since no styling was added with the exception of adding an `active` class for the `app.component.scss` I will not be including any stylesheets.

### app.module.ts
The only major change we made to this file (with the exception of those done via the angular CLI) was to import `FormsModule` to allow the use of `ngModel` in our templates
``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { UserComponent } from './user/user.component';

@NgModule({
declarations: [
    AppComponent,
    TodoComponent,
    UserComponent
],
imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
```

## app-routing.module.ts
Here we added our main routes (including the route parameter for users) and a redirect in case a user tries a route not explicitly declared. 
``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
{path: 'user/:username', component: UserComponent},
{path: 'todo', component: TodoComponent},
{path: '**', redirectTo: 'todo'}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
```

## TodoService
This is the real workhorse of the application. We created an autoincrementing id (in a real application this would be done in the database) as well as functions to add, delete, retrieve by usernam, or retrieve all todos.
``` typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 private todos: Array<Object> = []; //Object[]
 private nextID: number = 0;
 constructor() { }

// add Todo
addTodo(todo: Object){
  todo['id'] = this.nextID;
  this.nextID++;
  this.todos.push(todo)
}

// Delete Todo
deleteTodo(id: number){
  let index = this.todos.findIndex(todo=> todo['id'] === id);
  // let index = this.todos.findIndex(
  // function(todo){
  // return todo.id === id
  // })
  this.todos.splice(index, 1);
}

// Filter By Username
getByUsername(username){
  return this.todos.filter(todo => todo['username'] === username)
}

// Get All of them
/// this.todos = this.todoService.allTodos
get allTodos(){
  return this.todos;
}
// this.todos = this.todoService.getAllTodos();
// getAllTodos(){
//   return this.todos;
// }


}

```

## TodoComponent
### .ts Controller File
After injecting the `TodoService` in the constructor and initializing the `todos` variable, we create functions the template can use to access the server. We are also creating a todo object to house the form data and then send along to the service. Because service additions to not function synchronously we have to re-retrieve the data everytime something is updated
``` typescript
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo: any = {task: '', username: ''}
  todos: any[] = []
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
We are accessing all of the todos and using an `ngFor` to iterate over them. We are also adding conditional routing to be able to access the users page that belongs to the username in each todo. We are also using `ngModel` and the `(click)` binding to allow for the addition of todos
``` html
<br>Task:<input type="text" [(ngModel)]="todo.task"><br>
Username: <input type="text" [(ngModel)]="todo.username"><br>
<button (click)="addTodo()">Add Todo</button>


<div *ngFor="let td of todos">
id: {{td.id}} Name: {{td.task}} 
Username: <a [routerLink]="['/user/'+td.username]">{{td.username}}</a>
</div>
```

## UserComponent
### .ts Controller File
Similar to the above example of the todo component, we also add the ability to delete elements by passing an id. In addition to the injection of `TodoService` we also are injecting `ActivatedRoute` so we can access the username route param of `/user/:username` once we grab this from the `ActivatedRoute` we set this to a variable in the class via `this.username = this.actr.snapshot.params.username;`
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
Almost identical to the todo template file. Since we can pull the username directly from the `ActivatedRoute` in the controller we only need a `task` key to be able to create a todo on this template. We are also adding a button that allows for the deletion of todos by passing the id to the controllers `deleteTodo` function.
``` html
<br>Task:<input type="text" [(ngModel)]="task"><br>
<button (click)="addTodo()">Add Todo</button>


<div *ngFor="let td of todos">
id: {{td.id}} Name: {{td.task}} 
<button (click)="deleteTodo(td.id)">Delete This Todo!!!!!!!!!!</button>
</div>
```