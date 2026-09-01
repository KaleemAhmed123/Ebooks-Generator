### Creating a Promise

You rarely create Promises from scratch in modern React (fetch and axios do it for you), but understanding the constructor is vital for interviews.

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Data fetched successfully!");
    } else {
      reject("Network error occurred.");
    }
  }, 2000);
});
```

### Consuming a Promise (.then and .catch)

When a Promise resolves, it passes its data to `.then()`. If it rejects, it passes its error to `.catch()`.

```js
myPromise
  .then((data) => {
    console.log(data); // "Data fetched successfully!"
    // You can return a value here to pass it to the NEXT .then()
    return data.toUpperCase(); 
  })
  .then((uppercaseData) => {
    console.log(uppercaseData); // "DATA FETCHED SUCCESSFULLY!"
  })
  .catch((error) => {
    console.error(error); 
  })
  .finally(() => {
    // This runs regardless of success or failure. Perfect for hiding loading spinners!
    console.log("Cleanup complete.");
  });
```

Because `.then()` always returns a new Promise, you can chain them infinitely, completely flattening the Callback Pyramid of Doom into a single, highly readable vertical line.
