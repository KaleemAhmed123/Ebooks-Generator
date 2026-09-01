## `useEffect`: The Right Way

If `useState` is the most important hook, `useEffect` is the most misunderstood.

When Hooks were introduced, many developers treated `useEffect` as a direct replacement for the old Class lifecycle methods (`componentDidMount`, `componentDidUpdate`). This led to massive, tangled dependency arrays and infinite render loops.

**The Golden Rule of useEffect:**
`useEffect` is NOT for reacting to state changes. It is strictly for **synchronizing your React component with an external system** (e.g., the browser DOM, a network request, a third-party mapping library like Leaflet, or a WebSocket connection).

### The Dependency Array
The second argument to `useEffect` is an array of dependencies. It tells React when to re-run the effect.
- `[]` (Empty array): Run exactly once, after the initial render. Perfect for setting up a WebSocket connection.
- `[id]` (With variables): Run on initial render, AND re-run whenever `id` changes.
- *No array at all:* Run after EVERY single render. You almost never want this.
