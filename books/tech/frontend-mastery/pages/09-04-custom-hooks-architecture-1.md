## Custom Hooks Architecture

In 2018, React Hooks (`useState`, `useEffect`) revolutionized how we write components. But the true power of Hooks was not just managing state. It was the ability to **compose** them into your own Custom Hooks.

A Custom Hook is simply a JavaScript function whose name starts with `use` and that calls other Hooks inside of it.

### The Problem: Massive Components
A common junior mistake is putting all the logic (fetching, state management, event listeners) directly inside the component rendering the UI. This creates massive, 500-line "God Components" that are impossible to test or reuse.

```jsx
// BAD: The Anti-Pattern: A God Component
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ... 200 lines of JSX rendering the profile ...
}
```
