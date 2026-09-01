# Module 4 - State Management at Scale

## The state management problem

- State management in large React applications fails in a predictable way
- It starts with `useState`. Then a sibling needs the same value, so it gets lifted. Then a cousin needs it, so it goes to context. Then a different page needs it, so it goes to a global store
- At each step, the decision was locally correct and globally expensive
- The result is a store that owns half the application's state, mixes server data with UI state, and re-renders components that have nothing to do with the change

### The principle

- State should live as close to where it is used as possible
- Only escalate when two components that cannot share a parent both need the same piece of state
- That is a rarer situation than it appears
