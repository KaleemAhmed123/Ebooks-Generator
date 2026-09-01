## `useRef` and DOM Manipulation

We already discussed that `useState` is for variables that, when changed, should trigger a re-render of the UI.

But what if you need a component to remember a piece of data between renders, but you specifically do *not* want the UI to re-render when that data changes? 
This is exactly what `useRef` is for. It acts as an "escape hatch" from React's strict declarative rendering cycle.

### The Anatomy of a Ref

`useRef` returns a simple JavaScript object with a single property: `current`.

```jsx
const myRef = useRef(0);
console.log(myRef); // { current: 0 }
```

Unlike state, this `current` property is completely mutable. You can reassign it directly: `myRef.current = 5;`. When you mutate `.current`, React does not care. It will not trigger a re-render.
