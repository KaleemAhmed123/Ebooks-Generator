### Optimistic updates

```tsx
useMutation({
  mutationFn: updateOrderStatus,
  onMutate: async (newStatus) => {
    await qc.cancelQueries({ queryKey: ['orders'] })
    const previous = qc.getQueryData(['orders'])
    qc.setQueryData(['orders'], old => applyOptimisticUpdate(old, newStatus))
    return { previous }  // rollback context
  },
  onError: (err, _, context) => {
    qc.setQueryData(['orders'], context?.previous)
  },
})
```

- The UI updates immediately. If the server call fails, the rollback restores the previous state
- Optimistic updates are appropriate for low-stakes mutations: status changes, toggles, likes
- They are not appropriate for: payments, irreversible actions, anything where a failed rollback would confuse the user
