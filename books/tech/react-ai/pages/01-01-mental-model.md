# Module 1 - The mental model

## What React 18 actually is

- React is a **UI runtime**, not a framework
- It takes a tree of components, figures out what changed, and applies the minimum set of DOM mutations to match
- React 18 adds one new idea on top: work can now be **interrupted**
- In React 17 and earlier, every render was synchronous — once started it ran to completion regardless of how long it took
- React 18 introduces the **concurrent renderer**: it can start a render, pause it when something more urgent arrives, then resume or discard it
- That single change is what makes Suspense, Transitions, and streaming SSR possible

### The two things that change in practice

- `createRoot` replaces `render` — that is the only required migration step
- Everything else is opt-in: you do not need to use `useTransition` or `Suspense` immediately
- Legacy `render` still works, but it runs the old synchronous renderer and gets none of the new features

```tsx
// before
import { render } from 'react-dom'
render(<App />, document.getElementById('root'))

// after
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')!).render(<App />)
```

### What the runtime is not

- React is not a state manager, a router, a data fetching library, or a build tool
- It composes with all of them, but it is responsible only for the tree
- The boundary matters because when something is slow, you need to know which layer caused it
