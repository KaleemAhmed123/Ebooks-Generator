## React Hooks Deep Dive

- Before 2018, React components were built using ES6 Classes. Classes confused the `this` keyword, made code reuse difficult, and grouped unrelated logic together in lifecycle methods like `componentDidMount`
- **Hooks** replaced classes by allowing functional components to "hook into" React's internal state and lifecycle engines

### `useState`: The Local Memory

- Variables declared with `let` disappear when a function finishes executing. If you want a component to "remember" something between renders, you must use `useState`
- Setting state triggers a re-render. If you do not want a re-render, do not use `useState`

### `useEffect`: Syncing with the Outside World

- The most abused hook in React. `useEffect` is **not** for reacting to state changes. It is for synchronizing your component with systems outside of React (like a mapping library, an analytics tracker, or the `document.title`)
- If you are updating state based on other state inside a `useEffect`, you are probably doing it wrong. Derive the value during render instead

```jsx
// BAD: Storing derived data in state
const [firstName, setFirstName] = useState('Kaleem');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(firstName + ' Ahmed');
}, [firstName]);

// GOOD: Derive during render
const [firstName, setFirstName] = useState('Kaleem');
const fullName = firstName + ' Ahmed';
```

### `useRef`: The Escape Hatch

- `useRef` returns a mutable object that persists for the full lifetime of the component
- Unlike `useState`, mutating `.current` does **not** trigger a re-render
- Common use cases:
  1. Storing a reference to a DOM node so you can call native APIs on it (e.g., `inputRef.current.focus()`)
  2. Storing an interval ID so you can clear it later when the component unmounts
