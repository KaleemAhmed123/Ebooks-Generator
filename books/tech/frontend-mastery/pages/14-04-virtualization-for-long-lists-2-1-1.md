### Example using `@tanstack/react-virtual`

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualizedList({ items }) {
  // 1. We need a ref to the scrolling container
  const parentRef = useRef(null);

  // 2. We pass the container and the data length to the hook
  const rowVirtualizer = useVirtualizer({
    count: items.length, // Even if this is 100,000
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35, // Estimate each row is 35px tall
  });
```
