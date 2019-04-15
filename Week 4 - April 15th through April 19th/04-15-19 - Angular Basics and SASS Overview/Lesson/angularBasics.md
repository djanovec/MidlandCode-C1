## Attributes and Syntax
1. Recap for Basic JS
2. What changes in Angular based off raw JS
3. Why would you want to adjust attributes in an SPA?

## Data Binding for attributes via Interpolation
* We've seen this already through the use of {{}} can also be done via [] for atributes
* Can be a direct property such as a variable name
* Quite often is a template expression: {{getRandomNum() * 4}}
    * Evaluates whatever is inside the brackets to a string value. This is important to note for Arrays and Objects
    * Most JS options are valid for template expressions not all are usable though
* Be mindful of naming variables when using directives and template variables (such as let x of y). If names are shared between different scopes you might get unintended effects. The following is the basic order of importance
    1. Template Variable
    2. Directive
    3. Component
* As per the angular docs all template expressions should follow these rules:
    1. No visible side effects, as in it shouldnt change anything other than the value of the target property
    2. Quick execution. Remember that the template has to be checked for any possible changes and if your expression takes a long time it can lead to a laggy or broken feel which leads to a bad user experience
    3. Simplicity. Have it do what needs to be done and nothing more. If you're writing an incredibly intricate template expression you might want to rethink what you're using it for and refacto accordingly.
    4. Idempotence: This is a fancy wordy for basically means it should act the exact same way until something it relies upon changes at that point it will continue to act the exact same way until something changes again.
* Template Statements - We've started to use these. These are the ones that WILL have side effects. The one we've used so far has been `(click)="someFunction()"`
    * These don't have to follow all of the same rules as above.
    * Have more JS that is usable but there are still limitations.
    * Same as before there is a precedence for names so be sure you're not reusing variable names.
    * CANNOT refer to the global namespace i.e. `window` or `Math.random()`
* Remember that not all binding is two-way and not all binding NEEDS to be two-way. Think about what you're using information for and 