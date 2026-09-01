## Virtualisation and large lists

- Rendering 10,000 DOM nodes is slow regardless of how cheap each component is
- **Virtualisation** renders only the rows currently visible in the viewport, plus a small buffer
- The DOM always has roughly the same number of nodes regardless of list size

```tsx
import { useVirtualizer } from '@tanstack/react-virtual'

function OrderList({ orders }: { orders: Order[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,  // estimated row height in px
  })

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(item => (
          <div
            key={item.key}
            style={{ position: 'absolute', top: item.start, height: item.size, width: '100%' }}
          >
            <OrderRow order={orders[item.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```
