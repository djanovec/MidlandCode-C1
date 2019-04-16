# Use this as reference for some of the most useful tools preloaded in Angular and how they're used.

## Pipes 
* AsyncPipe - Used to keep Asynchronous Data up to date. This will update asynchronously on any change from the observable
    * Example: 
        ``` html
            <div class="dataFromAPI">{{variableAPICallSavesTo | async}}</div>
        ```
* CurrencyPipe - Formats Currency based off given input
    * Example: 
        ``` html
            <div class="currency">{{currencyValueNumber | currency:'EUR'}}</div>
            <!-- Input: 47.21-->
            <!-- Output:  EUR47.21-->            
        ```
    * More information [here](https://angular.io/api/common/CurrencyPipe)
* DatePipe - Formats Dates based off given input
    * Example: 
        ``` html
            <div class="date">{{dateObjctNumOrString | date:'medium'}}</div>
            <!-- Input: Date Object for 5/1/18 10:34:00 AM-->
            <!-- Output: May 1, 2018, 10:34:00 AM -->
        ```
    * More information [here](https://angular.io/api/common/DatePipe)
* DecimalPipe - Formats Decimal Numbers
    * Example: 
        ``` html
            <div class="decimal">{{number | decimal:'4.2-4'}}</div>
            <!-- Input: 4.3450574-->
            <!-- Output:  04.3451-->
        ```
    * More information [here](https://angular.io/api/common/DecimalPipe)
* JsonPipe - Allows objects to be displayed as JSON strings
    * Example: 
        ``` html
            <div class="jsonPipe">{{json | json}}</div>
            <!-- Input:  {a: 'value', b: 'value'} -->
            <!-- Output: {a: 'value', b: 'value'} instead of [Object object]-->
        ``` 
    * More information [here](https://angular.io/api/common/JsonPipe)
* KeyValuePipe - Pipe used to turn an object into an iterable for ngFor
    * Example: 
        ``` html
            <div class="keyvalue">{{object | keyvalue}}</div>
            <!-- Input:  {a: 'value1', b: 'value2'} -->
            <!-- Output: [{key: 'a', item: 'value1'}, {key: b, value: 'value2'}] -->
        ```
    * More information [here](https://angular.io/api/common/KeyValuePipe)
* LowerCasePipe - Self explanatory
    * Example: 
        ``` html
            <div class="lowercase">{{stringName | lowercase}}</div>
            <!-- Input: 'HELLO world'-->
            <!-- Output: 'hello world-->
        ```
* PercentPipe - Turns numbers into percentages
    * Example: 
        ``` html
            <div class="percent">{{number| percent:'1.2-4'}}</div>
            <!-- Input: .34523245-->
            <!-- Output: 34.5232 %-->
        ```
    * More information [here](https://angular.io/api/common/PercentPipe)
* SlicePipe - Takes input and slices it into a new array
    * Example: 
        ``` html
            <div class="slice">{{array | slice:2:5}}</div>
            <!-- Input: [1,2,3,4,5,6] -->
            <!-- Output: [2,3,4,5]-->
        ```
    * More information [here](https://angular.io/api/common/SlicePipe)
* TitleCasePipe - Converts all words to capitalized words
    * Example: 
        ``` html
            <div class="titlecase">{{stringName | titlecase}}</div>
            <!-- Input: 'hello world'-->
            <!-- Output: 'Hello World-->
        ```
* UpperCasePipe - Self explanatory
    * Example: 
        ``` html
            <div class="uppercase">{{stringName | uppercase}}</div>
            <!-- Input: 'hello world'-->
            <!-- Output: 'HELLO WORLD-->
        ```


## Functions
* formatCurrency - Function that formats currency, same argument order as the pipe
* formatDate - Function that formats Dates, same argument order as the pipe 
* formatNumber - function that formats numbers, same argument order as the pipe
* formatPercent - Function that formats percentages, same argument order as the pipe

## Template Options
* NgClass - Directive used to declare conditional classes on an element
    * Example 1 as strings:
    ``` html
        <div [ngClass]="'series of strings as usual'">
        <!-- Output to dom: <div class="series of strings as usual"> -->
    ```
    * Example 2:
    ``` html
        <div [ngClass]="['series', 'of', 'strings', 'as', 'usual']">
        <!-- Output to dom: <div class="series of strings as usual"> -->
    ```
    * Example 3:
    ``` html
        <div [ngClass]="stringVar">
        <!-- Output to dom (if string var = 'class1'): <div class="class1"> -->
    ```
* NgContainer - the <ng-container></ng-container> tag allows for more property binding but doesn't render or get styled on the DOM
    * Example (assuming sickShirt is true):
    ``` html
        <div> 
            Hello there friend! 
            <ng-container *ngIf="sickShirt">
                Oh cool shirt man!
            </ng-container>
            How have you been?
        </div>
        <!-- Output: <div> Hello there friend! Oh cool shirt man! How have you been? -->
    ```
* NgForOf - This and ngFor are directives to iterate through any form of iterable and append the dom with premade mini templates
    * Example assuming names = ['Mike', 'Roger', 'Steve', 'John']
    ``` html
        <div *ngFor="let name of names; index as i">{{i+1}}:{{name}}</div>
        <!-- OUTPUT 
        <div>1: Mike</div>
        <div>2: Roger</div>
        <div>3: Steve</div>
        <div>4: John</div>
        -->

    ```
* NgIf - Using a boolean, determines whether or not to render element (and it's children) to the DOM
    * Usage 1 (assuming bool is false):
    ``` html
        <div *ngIf="bool">Hello!</div>
        <!-- Output:  -->
    ```
    * Usage 2 (assuming bool is true):
    ``` html
        <div *ngIf="bool">Hello!</div>
        <!-- Output:  <div>Hello!</div>-->
    ```
    * Usage 3 (assuming bool is false):
    ``` html
        <div *ngIf="bool; then true else false">Hello!</div>
        <ng-template #true>It's true!</ng-template>
        <ng-template #false>It's False!</ng-template>
        <!-- Output: <div>It's false!</div> -->
    ```
* NgStyle - allows for conditional styling on an element
    * Usage 1 (assuming width is 110):
    ``` html
        <div [ngStyle]="{'max-width.px': width}">...</div>
        <!-- Output:  <div style="max-width: 110px"></div>-->
    ```
    * Usage 2 (assuming styleObject = '{background-color: 'white'}):
    ``` html
        <div [ngStyle]="styleObject">...</div>
        <!-- Output:  <div style="background-color: white"></div>-->
    ```
    
* NgSwitch / NgSwitchCase - allows for one of 2 or more options to appear based off conditional data
    * Usage (assuming language equals 'spanish'):
    ``` html
        <div [ngSwitch]="language">
        <div *ngSwitchCase="'english'">Hello!</div>
        <div *ngSwitchCase="'french'">Bonjour!</div>
        <div *ngSwitchCase="'spanish'">Hola!</div>
        <!-- Output: <div>Hola!</div> -->
    ```