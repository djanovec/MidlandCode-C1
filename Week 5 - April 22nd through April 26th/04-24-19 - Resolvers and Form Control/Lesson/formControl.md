# What if you don't want to have to write form validation for EVERY form you have?

## That's where form validation comes into play. There are two main types of form validation. There is reactive form validation and template-driven form validation.

### Reactive Form Validation
* Takes place almost entirely in the Component controller as opposed to the template.
* Does not use `ngModel` and that functionality will be removed in Angular 7.
* Utilizes `FormGroups` and `FormControls` to do the validation. 
* Start by adding `[formGroup]="nameOfFormYouWantToUse` and `(ngSubmit)="functionToRunOnSubmit()"` in your template.
* Now it's time to declare what you would like to use in the template. This can be done in line or by using a `FormBuilder`
* Connect the from in the component to the form in the template. This is done by making a `FormGroup` element in the Component Class: `yourForm: FormGroup;`
* In your onInit function, create the formGroup like so:
    ``` typescript
        this.yourForm = new FormGroup({
            'nameOfFormElement': new FormControl(startingValue, 
            [Array, Of, Validators, To, Use]
            )
        })
    ```
* In the template you use `formControlName=''` to name inputs to match the names you used in the formGroup variable.
* Validators can be a validation function you create (see bottom of file) or preset Validators which include:
  1. min  - takes a number as an argument
  2. max  - takes a number as an argument
  3. required - checks to see if a value was given
  4. email - checks to see if the pattern is an email
  5. minLength - takes a number as an argument
  6. maxLength - takes a number as an argument
  7. pattern - takes a Regexp pattern to check for matching
* Custom validation is possible through a `factory` that returns a `ValidatorFn` function or just a validator function. Either way you will access the `AbstractControl` type and utilize that to verify the .value key.
* If you need access to a forms element you should make a get function such as `get inputName(){return formName.get('inputName')}` You can then access the `.value` attribute to 
* You can check the `.valid` attribute of the form or any attribute at any time. And you can pull the .value off the form for all the form values at once.
* See bottom for css class references for forms.


### Template Driven Forms 
* Much simpler as iit takes advantage of native HTML5 validation.
* Add directives to the form element such as: 
    ``` typescript
        <input name="name" required minlength="10" [(ngModel)]="some.key" #name="ngModel">
    ```
* In the above example, since we don't have access to the form in our controller and we want to assign the elements 'model' to a variable. That is what `#name="ngModel"` is for. 
* With the above you can access `name.errors` or `name.valid` in the template.
* Custom validators must be done with a directive. Can be done by using a provider such as: `[{provide: NG_VALIDATORS, useExisting: YourClassName, multi: true}]`



### So you have Forms set up for validation, now what?

* Keys that exist on a form element: 
    1. `.valid` and `.invalid`
    2. `.disabled`
    3. `.errors` - Either null or an array of errors.
    4. `.pristine` - No changes at all to the element
    5. `.dirty` - Something has changed
    6. `.touched` / `.untouched` - Some interaction has/ has not occurred with the element,
* Based off these values, classes are also added to the element to allow for styling based off form status: 
    1. .ng-valid
    2. .ng-invalid
    3. .ng-pending
    4. .ng-pristine
    5. .ng-dirty
    6. .ng-untouched
    7. .ng-touched
* You can use these classes and even these keys to add error messages using `*ngIf` whenever you need to.

### Example Custom Validator

``` typescript
    import { AbstractControl, ValidatorFn } from "@angular/forms";


    export function validateReason(control: AbstractControl) {
        let reasons: string[] = ['suggestion', 'complaint', 'comment'];
        let valid = !reasons.includes(control.value)
        return valid ? { 'invalidReason': { value: control.value } } : null
    }

    export function badWord(badWord: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const containsBadWord = control.value.includes(badWord);
            return containsBadWord ? { 'badWord': { value: control.value } } : null;
        };
    }
```