## Mouse Focus Directive
This allows us to attach the mouse focus directive to any element and change the background color based off interactivity with the mouse

``` typescript
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[mouseFocus]'
})
export class MouseFocusDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') mouseEnter(){
    this.setBgColor('blue')
  }
  @HostListener('mouseleave') mouseLeave(){
    this.setBgColor('purple')
  }
  @HostListener('mousedown') mouseDown(){
    this.setBgColor('yellow')
  }
  @HostListener('mouseup') mouseUp(){
    this.resetBgColor()
  }
  setBgColor(color){
    this.el.nativeElement.style.backgroundColor = color;
  }
  resetBgColor(){
    if(this.el.nativeElement.style.backgroundColor !== 'purple'){
      this.setBgColor('blue');
    }
  }
}

```

## User Login and AuthGuard
In order to use the login functionality we will need to do 3 things. 
1. Create a login component and template
2. Create the route for the user component
3. Set up an AuthGuard protecting the user route

### app-routing.module.ts
In addition to the imports that come along with them, this is the only change to the exisiting file:
``` typescript
const routes: Routes = [
  {path: 'user/:username', component: UserComponent, canActivate: [UserGuard]},
  {path: 'todo', component: TodoComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'todo'}
];
```

### Login Component
In order to use the login component we are doing the absolute bare minimum. I will discuss what other steps we would need to take but this will allow for basic functionality.
#### .html Template file
``` html
Username:<input [(ngModel)]="username"><br>
<button (click)="login()">Login</button>
```
#### .ts Controller FIle
All we have to do is check for input in the username input and if there is one, save it to local storage and redirect to that user's page
``` typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;

  constructor(private router: Router) { }

  login(){
    if(this.username){
      localStorage.setItem("user", this.username);
      this.router.navigate(['/user'+this.username]);
    }
  }
  ngOnInit() {
  }

}
```

### user.guard.ts
In here we have to strip the username from the route, check it against the username stored in local storage and if they match (case insensitive) allow them in, otherwise redirect them to the login route.
``` typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './services/todo.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let username = localStorage.getItem("user");
      if(username === next.params.username){
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
  
}


```