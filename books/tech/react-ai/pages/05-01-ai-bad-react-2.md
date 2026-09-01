### Fixing the God Effect

- AI output:
```tsx
// ❌ generated code
useEffect(() => {
  fetchOrders()
  if (user) syncAnalytics(user)
  document.title = `Orders - ${filter}`
}, [user, filter])
```

- Your correction (human in the loop):
```tsx
// ✅ refactored: split by concern
useEffect(() => { document.title = `Orders - ${filter}` }, [filter])
useEffect(() => { if (user) syncAnalytics(user) }, [user])
// fetchOrders moves to React Query
```

- The rule: one effect per concern. If you cannot name the effect with a simple sentence, it is doing too much
