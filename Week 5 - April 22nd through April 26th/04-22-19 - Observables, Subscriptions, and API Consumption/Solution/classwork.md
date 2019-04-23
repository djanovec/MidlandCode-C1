## Let's take our new found knowledge for a test drive!

Let's take advantage of the [Giphy API](https://giphy.com/) for this one!

* Create a new single component app. The component should simply have a text field and a div to display your list of returned items to. 
* When the user enters in text into the field it should automatically make an API call based off the search string. 
* Pick whatever you want for the starting values of the other required fields or add them to the form if you'd like. If you add them to the form, have them also automatically pull the data form the API on change
* Make sure the input is done changing before sending the api call. A wait time of 400ms should do the trick!
* If a user is typing a bunch but at the end of typing the value doesn't change, then don't send a new request.
* Also add a counter on the page (using observables) that shows how long the user has been on the page. 


## TIMER
#### In Component
``` typescript
    timer: Observable<number> = interval(1000);
    this.timer.subscribe()
```

#### In template
``` html
    You have been on the page for {{timer | async}} seconds.
```

## Auto API Call

``` typescript
    this.autoSearch = fromEvent(searchBox, 'input').pipe(
        map((e: KeyboardEvent) => e.target['value']),
        filter(text => text.length > 3),
        debounceTime(400),
        distinctUntilChanged()
    );
  this.autoSearchSub = this.autoSearch.subscribe(val => this.gifService.apiCall(val));
```
[Alternate example](https://angular.io/guide/practical-observable-usage)


# FULL CODE

## gif.service.ts
``` typescript
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GifService {

  constructor(private http: HttpClient) { }

  getGifs(searchTerm){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=DtwTkZwAIfcbYylnIlpb5tczU7Y3MH8n&q=${searchTerm}&limit=20&offset=0&rating=R&lang=en`)
  }

}

//

```

## gif.component.ts
Commented out lines are the ones without using angular material design
``` html
<h4>Seconds Spent on Page: {{timer | async }}</h4>

<div class="container">
    <mat-form-field class="example-full-width">
        <input id="searchBox" matInput placeholder="Search String">
      </mat-form-field>
      
</div>
<mat-grid-list cols="4" rowHeight="2:2">
  <mat-grid-tile *ngFor="let gif of gifs">
    <img [src]="gif.images.fixed_width.url">
  </mat-grid-tile>
</mat-grid-list>

<!-- <div>
    <input id="searchBox" placeholder="Search Term">
</div> -->

<!-- <div *ngFor="let gif of gifs">
    <img [src]="gif.images.fixed_width.url">
</div> -->


```

## gif.component.ts
``` typescript
import { Component, OnInit } from '@angular/core';
import { GifService } from '../gif.service';
import { Observable, interval, fromEvent } from 'rxjs';
import {map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators' 

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss']
})
export class GifComponent implements OnInit {
  gifs: Object[] = [];
  timer: Observable<number> = interval(1000)
  inputObs: Observable<string>;
  inputElement: any;
  constructor(private gifService: GifService) { 
   }
  ngOnInit() {
    this.inputElement  = document.getElementById("searchBox");
    this.inputObs = fromEvent(this.inputElement, 'input').pipe(
      map(e => e['target'].value),
      filter( text => text.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    )
    this.inputObs.subscribe(val =>  
      this.gifService.getGifs(val).subscribe(res => this.gifs = res['data']))
    this.timer.subscribe()
  }
}

```

## app.module.lts

``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GifComponent } from './gif/gif.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    GifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, MaterialModule,
    HttpClientModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```