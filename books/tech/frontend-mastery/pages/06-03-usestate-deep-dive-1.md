## `useState`: The Re-render Engine

If you declare a standard JavaScript variable inside a React component (`let count = 0;`), two things will go wrong when you try to update it:
1. React will not know the variable changed, so it will not trigger a re-render to update the UI.
2. Even if a re-render is triggered by something else, the entire component function runs again from top to bottom, which means `let count = 0;` will re-execute, wiping out your changes!

To solve this, React gives us the `useState` hook. It solves both problems simultaneously:
1. Calling the setter function (e.g., `setCount`) actively alerts React's engine that a change occurred, scheduling a re-render.
2. It stores the value *outside* the component function in React's internal memory (using Closures!), so the value is preserved across re-renders.

### State is Asynchronous (Batching)

One of the most common bugs junior developers face is trying to read state immediately after setting it:

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(1);
  console.log(count); // Output: 0! Why isn't it 1?
};
```

When you call `setCount(1)`, React does not pause execution and update the DOM immediately. It puts the update in a queue. It waits to see if you are going to call any other state updates in the same function. 
Once your function finishes executing, React takes all the queued updates, batches them together, and performs a single optimized re-render. This is called **Automatic Batching**.

Because the variable `count` is a simple `const` captured in the current render's closure, it will not reflect the new value until the *next* render cycle.
