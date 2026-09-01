## URL state and the router as a store

- The URL is a piece of state that survives a page refresh, can be bookmarked, and can be shared
- Any state that a user would want to share or return to belongs in the URL
- Filters, search queries, pagination, selected IDs, active tabs

```tsx
// Bad: filter state in useState — lost on refresh and not shareable
const [status, setStatus] = useState<OrderStatus>('pending')

// Good: filter state in the URL — shareable and bookmarkable
// URL: /orders?status=pending&page=2
function useOrderFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = (searchParams.get('status') ?? 'all') as OrderStatus
  const page = Number(searchParams.get('page') ?? 1)

  const setStatus = (s: OrderStatus) =>
    setSearchParams(p => { p.set('status', s); p.set('page', '1'); return p })

  return { status, page, setStatus }
}
```

### What belongs in the URL versus local state

| Belongs in URL | Belongs in local state |
|---|---|
| Active filter | Modal open/closed |
| Search query | Hovered row |
| Selected record ID | Accordion expanded state |
| Pagination page | Pending form input before submit |
| Active tab (if content differs meaningfully) | Tooltip visibility |
