## useMemo and useCallback

- `useMemo` memoizes a computed value. The computation re-runs only when the dependency array changes
- `useCallback` memoizes a function reference. It is `useMemo` where the value is a function

```tsx
// Without useMemo: filteredOrders recomputes every render
const filteredOrders = orders.filter(o => o.status === status)

// With useMemo: recomputes only when orders or status changes
const filteredOrders = useMemo(
  () => orders.filter(o => o.status === status),
  [orders, status]
)
```

```tsx
// Without useCallback: a new function reference every render
// React.memo on the child is useless
const handleSelect = (id: string) => setSelectedId(id)

// With useCallback: same reference until setSelectedId or nothing changes
const handleSelect = useCallback(
  (id: string) => setSelectedId(id),
  [setSelectedId]  // setSelectedId from useState is always stable
)
```
