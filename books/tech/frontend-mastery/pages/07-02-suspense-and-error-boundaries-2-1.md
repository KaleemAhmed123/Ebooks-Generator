### Error Boundaries

A JavaScript error during render unmounts the whole React tree and leaves a blank white page. An Error Boundary is a component that catches errors from anywhere below it and renders a fallback instead.

There is still no hook for this. It requires a class component, because it relies on two lifecycle methods that have no hook equivalent.

```jsx
class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };                    // switches to the fallback UI
  }

  componentDidCatch(error, info) {
    reportToSentry(error, info.componentStack);   // logs the failure
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}
```

Most teams use `react-error-boundary` rather than writing this, because it adds a reset function so the user can retry without a full page reload.

### What a boundary does not catch

Error Boundaries only catch errors thrown during rendering, in lifecycle methods, and in constructors below them. They do not catch errors in event handlers, in `setTimeout`, in async code after an `await`, or in the boundary's own render. Those need ordinary `try/catch`.

React 19 added `onCaughtError` and `onUncaughtError` to `createRoot`, so you can log both kinds in one place.

```jsx
createRoot(el, {
  onCaughtError:   (error, info) => report(error, info, 'caught'),
  onUncaughtError: (error, info) => report(error, info, 'fatal'),
});
```
