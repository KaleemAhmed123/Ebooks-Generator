### Hydration errors

- A hydration error occurs when the server HTML does not match what React renders on the client
- Common cause: rendering the current date, a random ID, or `window` values that differ between server and browser
- Use `useEffect` for client-only values — they run after hydration and do not participate in the server render

```tsx
// Wrong: causes hydration mismatch
const now = new Date().toLocaleString()

// Right: client-only after hydration
const [now, setNow] = useState('')
useEffect(() => setNow(new Date().toLocaleString()), [])
```
