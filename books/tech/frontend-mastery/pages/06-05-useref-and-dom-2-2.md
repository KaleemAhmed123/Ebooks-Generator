### Use Case 2: Accessing Native DOM Nodes

Sometimes, React's declarative system isn't enough. You might need to directly interact with a native HTML element to call an imperative browser API, like forcing a `<video>` to `.play()` or forcing an `<input>` to `.focus()`.

You can pass a ref directly to a JSX element using the special `ref={}` attribute. After the component renders, React will automatically attach the actual DOM node to the `current` property of your ref.

```jsx
export default function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Once the component mounts, we directly call the native focus() API
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} placeholder="I focus instantly" />;
}
```

**Warning:** Do not use refs to manually change the text or styles of an element (e.g., `inputRef.current.style.color = "red"`). That is React's job. Only use refs for non-destructive APIs like focus, media playback, or measuring element dimensions.
