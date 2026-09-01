## The rendering pipeline

- A render in React has three phases: **render**, **commit**, and **effects**
- **Render phase**: React calls your components and builds a new virtual tree (the fiber tree). Pure. No side effects. Can be interrupted and rerun
- **Commit phase**: React compares old and new fiber trees, then mutates the DOM. Synchronous. Cannot be interrupted
- **Effects phase**: `useEffect` and `useLayoutEffect` callbacks run after the commit

### Why this matters for performance

- The render phase is the one you can make expensive or cheap
- If your component calls an expensive calculation on every render, it runs in the render phase
- The DOM write (commit) is fast. The calculation before it is where time is lost
- Profiling blame: `useLayoutEffect` blocks paint. `useEffect` does not

### Batching in React 18

- In React 17, state updates inside `setTimeout`, `fetch` callbacks, and native event handlers were **not** batched — each one caused a separate render
- React 18 **automatic batching** batches every state update regardless of where it happens
- This means three `setState` calls inside a `setTimeout` now cause one render instead of three

```tsx
// React 18 — this causes ONE render, not three
setTimeout(() => {
  setUser(u)
  setLoading(false)
  setError(null)
}, 0)
```

- If you genuinely need each update to render separately, wrap it in `flushSync` from `react-dom`
- You almost never need `flushSync`
