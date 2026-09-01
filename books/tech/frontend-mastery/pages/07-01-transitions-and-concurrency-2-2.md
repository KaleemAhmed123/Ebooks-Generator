### `useDeferredValue`

`useTransition` needs you to own the state setter. When the expensive value arrives as a prop from a parent you do not control, `useDeferredValue` does the same job from the receiving end.

```jsx
import { useDeferredValue } from 'react';

function ResultList({ query }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  // This heavy render runs against the deferred value, not the live one
  return <List items={filterHugeList(deferredQuery)} dimmed={isStale} />;
}
```

React keeps handing you the old value until the new render finishes in the background. React 19 added a second argument, the value to use on the very first render, before any real value exists.

```jsx
const deferred = useDeferredValue(value, '');
```

### When neither helps

Transitions make a slow render feel smooth. They do not make it fast. If filtering 50,000 rows takes 900ms, a transition keeps the input responsive but the results still arrive 900ms late. The real fix is virtualization or moving the work to the server. Reach for a transition when the work is genuinely necessary and merely heavy, not when the work should not be happening at all.
