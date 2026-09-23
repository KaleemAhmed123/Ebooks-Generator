## The Rest of the Hooks - continued

### `useMemo` and `useCallback`: skip work between renders

`useMemo` caches a computed value; `useCallback` caches a function identity so a
memoised child does not re-render.

```jsx
const sorted = useMemo(() => rows.sort(compare), [rows]);
const onSelect = useCallback((id) => setPicked(id), []);
```

Both are manual optimisation, and both cost something to maintain. The React
Compiler inserts this memoisation for you — once it is on, most hand-written
`useMemo` and `useCallback` calls become dead weight.

### `useId`: a stable id for accessibility attributes

Generates an id that matches between the server render and the client render, so
hydration does not complain. Use it to link a label to an input, never as a key
in a list.

```jsx
const id = useId();
return <><label htmlFor={id}>Email</label><input id={id} /></>;
```

### `useLayoutEffect`: measure before the browser paints

Identical to `useEffect`, except it runs synchronously after the DOM mutates and
*before* paint. That is what you want when you measure an element and immediately
reposition something based on the measurement, and it is why a tooltip written
with `useEffect` flickers. It blocks painting, so reach for it only when a
visible jump is the alternative.
