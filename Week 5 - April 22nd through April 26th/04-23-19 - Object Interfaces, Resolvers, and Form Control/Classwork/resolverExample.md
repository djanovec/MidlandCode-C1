## Resolver Example

The below is a very simplistic example of a route resolver.

### app-routing.module.ts
 We need to actually add the resolver to the route we declared. Here the `appResolver` can be any key name but that name will be what we will be accessing in our component.
``` typescript
 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TodoComponent } from './todo/todo.component';
import {UserGuard} from './user.guard';
import { LoginComponent } from './login/login.component';
import { ResolverService } from './resolver.service';

const routes: Routes = [
  {path: 'user/:username', component: UserComponent, canActivate: [UserGuard], resolve: {appResolver: ResolverService}},
  {path: 'todo', component: TodoComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'todo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
 ```

 ### resolver.service.ts

 We are in this example using an http call in our resolver but could just as easily return a static value (see commented out code for example).

 ``` typescript
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("Our Resolver Fired!");
    console.log(route.params.username); // if there were a param on our route
    // return 'Some Static Value' 
    return this.http.get(`http://www.somesite.com/api/login/user/${route.params.username}`); // calling a fake API if there were a param on our route
  }

  constructor(private http: HttpClient) { }
}


 ```

 ### todo.component.ts
 We are utilizing the ngOnInit function to pull out the data either static (commented out) or an observable and subscribing to it to do something with the lines with `// ...` are code that is in the controller that doesn't impact the usage of the resolver and is excluded for the sake of brevity
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
  }
 // ...
  }
  ngOnInit() {
    this.actr.snapshot.data.appResolver.subscribe(val=> something = val)
    // this.someStaticVariable = this.actr.snapshot.data.appResolver
  }

}


 ```