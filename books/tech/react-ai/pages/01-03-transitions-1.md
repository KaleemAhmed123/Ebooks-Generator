## Transitions and deferred updates

- A **transition** is a hint to React that a state update is low priority
- High-priority updates — typing in an input, clicking a button — should never wait for low-priority ones
- Mark low-priority updates with `startTransition`

```tsx
import { useState, startTransition } from 'react'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // high priority: update the input instantly
    setQuery(e.target.value)

    // low priority: filter the list, can be interrupted
    startTransition(() => {
      setResults(filterResults(e.target.value))
    })
  }
}
```

- The input stays responsive even if `filterResults` is slow
- `useTransition` returns `[isPending, startTransition]` — `isPending` is `true` while the transition is in progress
- Use `isPending` to show a skeleton or dim the stale list, not a spinner that blocks interaction
