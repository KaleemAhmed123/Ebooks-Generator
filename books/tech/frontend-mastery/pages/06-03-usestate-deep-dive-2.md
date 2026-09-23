### The Functional Updater

Because state updates are batched, what happens if you try to update the same state multiple times in a row?

```jsx
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```
If `count` was `0`, the result after clicking will be `1`, not `3`. 
Because `count` is `0` during this entire render cycle, all three functions are essentially saying `setCount(0 + 1)`.

To fix this, if your next state depends on your previous state, you must pass a callback function to the setter. React will pass the most up-to-date queued value into this callback:

```jsx
const handleClick = () => {
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
  setCount((prevCount) => prevCount + 1);
};
```
Now, the result will correctly be `3`.

### Never Mutate State Directly

React uses strict equality (`===`) to determine if an object or array has changed. If you mutate an array directly and pass it back to state, React sees that it is the exact same array in memory, assumes nothing changed, and aborts the re-render.

```jsx
// BAD: WRONG: Mutating the array
const handleAdd = () => {
  items.push("New Item"); 
  setItems(items); // React ignores this. The memory reference hasn't changed.
};

// GOOD: RIGHT: Creating a brand new array using the spread operator
const handleAdd = () => {
  setItems([...items, "New Item"]); // New memory reference triggers a re-render
};
```
