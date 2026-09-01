# Module 5: TypeScript For The Frontend

## Why TypeScript?

If you try to build a large-scale React application in pure JavaScript, it will inevitably collapse under its own weight. 

JavaScript is dynamically typed. You can create a variable as a Number, change it to a String, and then pass it into a function that expects an Array. The browser will happily accept your code, until a user clicks a button and the entire app crashes with `TypeError: undefined is not a function`.

**TypeScript is a superset of JavaScript.** It adds strict, static typing to the language.
- You declare the "shape" of your data before you write the logic.
- The TypeScript compiler acts as an aggressive assistant. It analyzes your entire codebase inside your editor. 
- If you try to pass a String to a component that expects a Date object, the editor will throw a red error line *before* you even hit save. 
- **TypeScript catches bugs at compile-time so your users never see them at runtime.**

## Types vs Interfaces

The most common question beginners ask is: "Should I use `type` or `interface`?" Both are used to define the shape of objects.
