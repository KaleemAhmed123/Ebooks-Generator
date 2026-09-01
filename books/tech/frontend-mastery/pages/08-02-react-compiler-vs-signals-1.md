## React Compiler vs. The Signals Revolution

For years, the most difficult part of writing performant React was managing re-renders. Because React's reactivity model is top-down, a state change high up in the component tree forces every child component to re-render, even if their props didn't change.

Developers were forced to manually wrap components in `React.memo` and meticulously cache functions and objects with `useCallback` and `useMemo`. If you missed one dependency in an array, your app either slowed to a crawl or suffered from stale state bugs.

Two frameworks-scale answers to that emerged, built on opposite ideas: **Signals** and the **React Compiler**. Both aim at the same target, which is removing hand-written memoization from application code.

### The Signals Revolution (Solid, Svelte 5, Angular)

Frameworks like SolidJS realized that React's Virtual DOM diffing was inherently inefficient. Instead of re-rendering a whole component to see what changed, they introduced **Fine-Grained Reactivity** via Signals.

A Signal is essentially a wrapper around a value that can notify subscribers when it changes.

```javascript
// A conceptual look at Signals (similar to SolidJS)
import { createSignal } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);

  // When count changes, ONLY this specific DOM node updates.
  // The Counter component function NEVER runs again!
  return <button onClick={() => setCount(c => c + 1)}>Count: {count()}</button>;
}
```

Because Signals track exactly where they are used in the JSX, the framework can surgically update the real DOM without a Virtual DOM at all. There are no dependency arrays, no stale closures, and no manual memoization. It is incredibly fast.
