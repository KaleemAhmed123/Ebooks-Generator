### The container/presenter split

- The split is not about class components versus function components — that battle ended years ago
- It is about **what a component knows**
- A container knows the domain: it knows what an `Order` is, what `sellerId` means, when to refetch
- A presenter knows layout: it receives `title`, `subtitle`, and `status` as strings and renders them

```tsx
// Container: knows the domain
function OrderCard({ orderId }: { orderId: string }) {
  const { data: order } = useOrder(orderId)
  return <OrderCardView
    title={`Order ${order.id}`}
    status={order.status}
    amount={formatPaise(order.totalPaise)}
  />
}

// Presenter: knows nothing about orders
function OrderCardView({ title, status, amount }: OrderCardViewProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <Badge variant={statusVariant(status)}>{status}</Badge>
      <p>{amount}</p>
    </div>
  )
}
```

- `OrderCardView` can be developed in Storybook without a running API
- `OrderCard` can be tested with mocked query responses without touching the DOM
