### 3. `bind()`
While `call` and `apply` immediately execute the function, `bind()` does not. 
Instead, `bind()` returns a **brand new function** with the `this` context permanently locked to the object you passed in. You can then save this new function to a variable and execute it later.

```js
const user = { name: "Charlie" };

function sayName() {
  console.log(this.name);
}

// sayName() is NOT executed here. A new function is returned.
const boundFunction = sayName.bind(user);

// Later in the code...
boundFunction(); // Output: "Charlie"
```

### Why does this matter in React?
Before React Hooks existed, React components were built using ES6 Classes. In a class, if you passed a method to a button (`<button onClick={this.handleClick}>`), the method would lose its `this` binding when the browser executed the click event. 

Developers had to manually bind every single method in the class constructor:
`this.handleClick = this.handleClick.bind(this);`

Today, arrow functions and functional components (Hooks) have completely eliminated this headache, but understanding `bind` remains a common senior-level interview question.
