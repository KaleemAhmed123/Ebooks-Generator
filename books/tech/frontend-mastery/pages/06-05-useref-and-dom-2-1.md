### Use Case 1: Storing Mutable Values

A classic example of `useRef` is storing the ID of a `setInterval`. You want to start a timer when the component mounts, and you need to remember the timer ID so you can stop it later. If you stored the timer ID in state, calling `setTimerId(id)` would cause a completely unnecessary re-render just to save a background ID.

```jsx
export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const timerIdRef = useRef(null);

  const start = () => {
    // We save the ID into the ref. No re-render triggered.
    timerIdRef.current = setInterval(() => {
      setSeconds(s => s + 1); // State update triggers re-render
    }, 1000);
  };

  const stop = () => {
    // We read the ID from the ref to clear it.
    clearInterval(timerIdRef.current);
  };

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```
