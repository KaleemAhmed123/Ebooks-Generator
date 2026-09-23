## The Rest of the Hooks

`useState`, `useEffect` and `useRef` have their own chapters. These are the six
you will still meet in any real codebase.

### `useContext`: read a value from an ancestor

Passing a prop through five components that do not use it is called prop
drilling. Context is the way out: a provider holds a value, any descendant reads
it without the intermediate components knowing.

```jsx
const ThemeContext = createContext('light');

function Page() {
  return <ThemeContext value="dark"><Toolbar /></ThemeContext>;
}

function Toolbar() {
  const theme = useContext(ThemeContext);   // "dark", no props involved
}
```

In React 19 you render `<ThemeContext>` directly; `<ThemeContext.Provider>` is
the older spelling and still works. Every consumer re-renders when the value
changes, so do not put fast-changing state in a context that wraps the whole app.

### `useReducer`: state whose next value depends on the last

When several pieces of state change together, or the next value is a function of
the previous one, a reducer keeps the transitions in one place instead of
scattered across handlers.

```jsx
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```
