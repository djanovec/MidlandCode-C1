## Full User Resolver Example

### user.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User
  posts: Post[]
  constructor(private actr: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {
    this.actr.data.subscribe((userResponse : User) => this.user = userResponse)
    let userId = this.actr.snapshot.params.id;
    this.todoService.getPostsByUserId(userId).subscribe((postsRes: Post[]) => this.posts = postsRes)
  }

}


```
### user.component.html
``` html
<h1>
  {{user | json}}
</h1>
<br>
<div *ngFor="let post of posts">
{{post | json}}
</div>
```

### todo.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  post: Post;
  constructor(private todoService : TodoService, private actr: ActivatedRoute) { }

  getTodo(){
    let postId : number = this.actr.snapshot.params.id;
    this.todoService.getPostById(postId).subscribe((postResponse: Post) => this.post = postResponse)
  }

  ngOnInit() {
    this.getTodo();
  }

}

```


### todo.component.html
``` html
{{post | json}}
```


### user.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number){
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  }

}

```


### todo.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

getPostById(id: number){
  return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
}

getPostsByUserId(userId: number){
  return this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
}

}

```


### user-resolver.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {
  constructor(private userService: UserService) { }

  resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userId = route.params.id;
    return this.userService.getUserById(userId)
  }


}


```

### app-routing.module.ts
``` typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TodoComponent } from './todo/todo.component';
import { UserResolverService } from './user-resolver.service';

//home, todos, users, redirect
const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "todos/:id", component: TodoComponent},
  {path: "users/:id", component: UserComponent, resolve:{userResolver: UserResolverService}},
  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

### Object Interfaces

``` typescript
export interface Post{
userId: number,
id: number,
title: string,
body: string 
}


export interface User{
id: number,
name: string,
username: string,
email: string,
address: Address,
phone: string,
website: string,
company: Object
}

export interface Address{
    street: string,
    suite: string,
    zity: string,
    zipcode: string
    geo: Geo
}

export interface Geo{
    lat: string,
    lng: string
}


```