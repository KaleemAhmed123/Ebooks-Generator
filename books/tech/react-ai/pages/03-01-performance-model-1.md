# Module 3 - Performance and Optimisation

## Where React actually spends time

- React's performance model is straightforward: a re-render runs your component function and reconciles the output against the previous output
- The cost is proportional to: how many components re-render, how expensive each component function is, and how many DOM nodes change
- Optimisation is about reducing all three. Most applications have problems only with the first one

### The re-render cascade

- When a component's state changes, it re-renders. So does every child, and every child's child
- This is correct behaviour — React cannot know which children depend on the changed state without running them
- `React.memo` breaks the cascade for a specific component if its props have not changed

```tsx
const OrderRow = React.memo(function OrderRow({ order }: { order: Order }) {
  return <tr><td>{order.id}</td><td>{order.status}</td></tr>
})
```

- `React.memo` does a **shallow comparison** of props by default
- It is wrong to assume `React.memo` always helps. It adds a comparison cost on every parent render
- It is a net gain only when the component is expensive to render and its props are stable
- A component that renders a `<div>` with two strings is not expensive — memo adds overhead with no benefit
