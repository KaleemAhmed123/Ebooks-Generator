### The React Compiler

The React team declined to adopt Signals. Their objection is that Signals wrap values in getters and setters, so reading a value stops being a plain property access and the code no longer behaves like ordinary JavaScript. 

React's philosophy is that UI is simply a pure function of state: `UI = f(state)`.

To solve the performance problem without giving that up, they built the **React Compiler**, which shipped as 1.0 and was known during development as React Forget.

The React Compiler is a build-time tool (a Babel plugin) that deeply analyzes your JavaScript AST. It understands the flow of your data and automatically injects memoization at the lowest possible level.

**What you write:**
```jsx
export function VideoPlayer({ video, user }) {
  const isPremium = user.tier === 'premium';
  
  // You just write normal JavaScript. No useMemo, no useCallback.
  const formatTime = (seconds) => { ... };
  
  return (
    <div>
      <Video src={video.url} />
      <Controls timeFormatter={formatTime} premium={isPremium} />
    </div>
  );
}
```
