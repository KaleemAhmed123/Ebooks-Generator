## Promises Deep Dive

Before ES6, asynchronous operations (like reading a file or fetching data from an API) were handled exclusively with **Callbacks**. A callback is simply a function passed into another function, meant to be executed when the task finishes.

```js
// The era of Callback Hell
fetchData(function(data) {
  processData(data, function(processedData) {
    saveData(processedData, function(result) {
      console.log("Finally done!");
    });
  });
});
```
This deep nesting creates a triangle shape known as the "Pyramid of Doom." It makes error handling incredibly difficult because every single callback needs its own `if (error)` check.

### Enter the Promise

A **Promise** is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Think of it like a buzzer you get at a restaurant. It is a promise that you will eventually get your food. You can go wait at your table while the kitchen works.

A Promise is always in one of three states:
1. **Pending:** Initial state, neither fulfilled nor rejected. (You have the buzzer).
2. **Fulfilled:** Meaning that the operation completed successfully. (The buzzer flashes).
3. **Rejected:** Meaning that the operation failed. (The kitchen ran out of ingredients).
