### The Solution: Separation of Concerns
We can extract this complex logic into independent, highly testable Custom Hooks. 
Custom Hooks allow you to extract the *stateful logic*, not the *state itself*. Every time you call a custom hook, it gets completely independent, isolated state.

**1. The Window Resize Hook**
```jsx
// hooks/useWindowWidth.js
export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width; // We just return the primitive value.
}
```

**2. The User Fetching Hook**
```jsx
// hooks/useUser.js
export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return { user, loading }; // We return an object containing the state
}
```
