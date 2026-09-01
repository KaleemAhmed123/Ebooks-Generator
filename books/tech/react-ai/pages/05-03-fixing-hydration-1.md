## Fixing hydration mismatch errors

- "Text content does not match server-rendered HTML" is the most common error in Next.js or Remix
- AI tools struggle to fix this because they often suggest turning off SSR entirely (`suppressHydrationWarning`) or wrapping the whole component in `typeof window !== 'undefined'`
- These "fixes" ruin your time-to-first-byte and break SEO

### The real fix: two-pass rendering

- The rule: the first render on the client must exactly match the server. The second render can read browser-only APIs
- Use a custom hook to track when hydration is complete

```tsx
// 1. Create the hook
export function useHydrated() {
  const [isHydrated, setIsHydrated] = useState(false)
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return isHydrated
}

// 2. Use it in your component
function LocalTime() {
  const isHydrated = useHydrated()
  
  // The server and the first client render both output this:
  if (!isHydrated) return <span>Loading time...</span>
  
  // The second client render outputs the real browser time:
  return <span>{new Date().toLocaleTimeString()}</span>
}
```
