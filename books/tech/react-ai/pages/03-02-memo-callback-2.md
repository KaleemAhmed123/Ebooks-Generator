### The rules

- `useMemo` is worth it when: the calculation is measurably slow (array sort of thousands of items, heavy transformation), or the result is a reference that needs to be stable for a memoised child
- `useCallback` is worth it only when: the function is passed as a prop to a `React.memo` component, or is a dependency of a `useEffect` that should not re-run on every render
- Adding them to every component to "be safe" makes code harder to read and adds allocation overhead

### Measuring before optimising

- Open React DevTools Profiler before changing any code
- Record a slow interaction, then check which components took longest
- A component that renders in 0.3ms does not need memo regardless of how often it renders
- Optimise the components the profiler marks as expensive, in the order the profiler shows
