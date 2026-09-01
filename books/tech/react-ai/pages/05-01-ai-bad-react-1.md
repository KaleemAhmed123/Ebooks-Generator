# Module 5 - Human-in-the-Loop Refactoring

## When AI writes bad React

- Spec-driven development with Claude or Cursor is a force multiplier, but the model has blind spots
- It will write working code, but it will often choose the easiest, oldest pattern it knows
- It prefers `useEffect` for data fetching instead of React Query
- It prefers `useState` for everything, ignoring URL state entirely
- It will happily drill props through ten layers instead of using composition
- Your job shifts from typing boilerplate to **architectural review**

### The three signs of AI-generated technical debt

1. **The God Effect**: A `useEffect` with five dependencies, doing three different things, and causing infinite loops if you look at it wrong
2. **State duplication**: A component that accepts a prop, copies it into local state with `useState`, and tries to keep them synced with `useEffect`
3. **Missing loading states**: The happy path works, but the model forgot that networks take time and fail
