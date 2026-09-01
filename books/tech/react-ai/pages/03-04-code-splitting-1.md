## Code splitting and lazy loading

- A JavaScript bundle is downloaded and parsed before any React code runs
- Every kilobyte in the bundle is time spent before the user sees anything
- Code splitting breaks the bundle into chunks that load on demand

### React.lazy and Suspense

```tsx
import { lazy, Suspense } from 'react'

// The module is not downloaded until this component renders
const AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'))

function App() {
  return (
    <Routes>
      <Route path="/orders" element={<OrdersPage />} />
      <Route
        path="/analytics"
        element={
          <Suspense fallback={<PageSkeleton />}>
            <AnalyticsDashboard />
          </Suspense>
        }
      />
    </Routes>
  )
}
```

- The analytics bundle downloads only when the user navigates to `/analytics`
- Users who never visit analytics never pay for the download
