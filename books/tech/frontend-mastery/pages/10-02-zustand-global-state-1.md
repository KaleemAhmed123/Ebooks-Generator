## Global UI State: Zustand

If you need Global UI state (like a shopping cart or user preferences), you have many choices: Redux, MobX, Recoil, Jotai, Zustand, and React Context.

**The modern industry standard is Zustand.**

Zustand (German for "State") is a small, incredibly fast, and unopinionated state management library. It solves all the historical problems of Redux without any of the massive boilerplate.

### Why not React Context?
React Context is built into React. Why use a third-party library?
Context has a fatal flaw: **Performance.** 
If you put a complex object (like `{ theme: 'light', user: { name: 'Bob' } }`) into a Context Provider, any time *any* part of that object changes, *every single component* that consumes that context will re-render, even if they didn't care about the part that changed.

If the `theme` changes, a component that only displays the `user.name` will re-render. In a large app, this destroys performance.
