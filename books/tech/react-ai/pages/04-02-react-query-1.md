## React Query: server state done right

- React Query treats server data as a cache with a staleness budget, not as state you own
- The API has three operations: fetch, mutate, and invalidate
- Caching, background refetching, deduplication of concurrent requests, and retry on failure are built in

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Fetch: data is cached under the key ['orders', sellerId]
function useOrders(sellerId: string) {
  return useQuery({
    queryKey: ['orders', sellerId],
    queryFn: () => fetchOrders(sellerId),
    staleTime: 30_000,   // treat as fresh for 30 seconds
  })
}

// Mutate: update on the server, then invalidate the cache
function useCancelOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: (_, orderId) => {
      // Force the orders list to refetch
      qc.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
```

### Query keys as cache addresses

- The query key is the address of the data in the cache
- `['orders']` and `['orders', sellerId]` are different cache entries
- Invalidating `['orders']` invalidates all queries whose key starts with `'orders'` — both the list and any individual order detail
- Design keys to reflect your data hierarchy: `['orders', sellerId, orderId]`
