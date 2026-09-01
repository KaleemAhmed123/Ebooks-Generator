### Deep linking for free

- When filters are in the URL, your analytics link becomes a shareable filter preset
- When the selected order ID is in the URL, a support agent can send a direct link to the order
- When pagination is in the URL, the back button works as the user expects
- These are not features you add later. They are the default behaviour of URL state

### Syncing URL state with React Query

- Use URL params as query keys
- When the URL changes, the query key changes, and React Query fetches the new data automatically
```tsx
const { status, page } = useOrderFilters()
const { data } = useQuery({
  queryKey: ['orders', { status, page }],
  queryFn: () => fetchOrders({ status, page }),
})
```
