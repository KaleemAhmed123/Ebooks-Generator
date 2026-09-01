## Designing for failure

- Every component that fetches data will at some point: receive nothing, receive an error, or receive stale data
- Designing for the happy path and patching failure later is how you end up with blank pages and silent errors

### Error boundaries

- An error boundary is a class component that catches errors thrown during render of its children
- Function components cannot be error boundaries — you must use a class or a wrapper library like `react-error-boundary`

```tsx
import { ErrorBoundary } from 'react-error-boundary'

function OrdersDashboard() {
  return (
    <ErrorBoundary fallback={<ErrorState message="Could not load orders" />}>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersList />
      </Suspense>
    </ErrorBoundary>
  )
}
```

- Place error boundaries at feature boundaries, not at the root
- The root error boundary is the last resort — catching there means the whole page has failed
- A feature error boundary means one section shows an error while the rest of the page continues working

### Suspense for loading states

- `Suspense` lets a component signal that it is not ready yet — React renders the `fallback` until it is
- Today it works with `lazy()` for code splitting and with React Query's `suspense` option
- The fallback renders in the same position as the suspended content — skeletons should match the shape of the real content
