## Server-side rendering and hydration

- SSR sends HTML from the server that the browser can display before any JavaScript runs
- **Hydration** is the process of React attaching event handlers and state to that server-rendered HTML
- The user sees content quickly. They can interact with it only after hydration completes

### The hydration gap problem

- Between the first paint (server HTML) and hydration completing, the page looks interactive but is not
- Buttons exist but do not respond. This window is longer on slow devices with large bundles
- React 18 streaming SSR reduces this by sending HTML in chunks as it becomes ready, rather than waiting for the full page

### Streaming SSR with Suspense

```tsx
// server entry (Next.js App Router or custom Express)
// React streams HTML for the shell immediately
// Each Suspense boundary streams its content when the data is ready

export default function Page() {
  return (
    <main>
      <Header />           {/* streamed immediately */}
      <Suspense fallback={<OrdersSkeleton />}>
        <Orders />         {/* streamed when orders query resolves */}
      </Suspense>
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsWidget />{/* streamed independently */}
      </Suspense>
    </main>
  )
}
```

- The browser receives and renders `<Header />` before the orders query finishes
- Orders and analytics stream independently — whichever resolves first appears first
