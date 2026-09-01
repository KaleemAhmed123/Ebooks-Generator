### The Cleanup Function

If your effect creates a persistent connection, a setInterval, or an event listener on the `window`, you MUST clean it up. Otherwise, when the component unmounts (e.g., the user navigates to another page), that interval will keep running forever in the background, causing a Memory Leak.

You clean up an effect by `return`ing a function from inside the effect. React will automatically run this return function right before the component unmounts (or right before the effect re-runs).

```jsx
useEffect(() => {
  const handleScroll = () => console.log(window.scrollY);
  window.addEventListener('scroll', handleScroll);

  // The Cleanup Function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```
