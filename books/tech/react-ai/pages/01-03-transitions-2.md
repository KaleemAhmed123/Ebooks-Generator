### useDeferredValue

- `useDeferredValue` is the child-side version of `startTransition`
- You control what the slow component receives, not where the update comes from

```tsx
function SearchPage({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query)
  // deferredQuery lags behind query during typing
  // the list re-renders with stale data until React has time
  return <ResultList query={deferredQuery} />
}
```

- Use `startTransition` when you own the state setter
- Use `useDeferredValue` when you receive the value as a prop and do not own the setter
