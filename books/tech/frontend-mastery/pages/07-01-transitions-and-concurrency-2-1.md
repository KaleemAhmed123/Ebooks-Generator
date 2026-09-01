### `useTransition`

`useTransition` marks an update as interruptible. React renders it in the background and throws the work away if a more urgent update arrives.

```jsx
import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value);            // urgent: the input must repaint now

    startTransition(() => {
      setResults(filterHugeList(e.target.value));  // interruptible
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      <ResultList items={results} dimmed={isPending} />
    </>
  );
}
```

`isPending` is `true` while the background render is in flight. Use it to dim the stale results rather than to show a spinner. A spinner says "your data is gone." Dimming says "this is last second's answer, a new one is coming."
