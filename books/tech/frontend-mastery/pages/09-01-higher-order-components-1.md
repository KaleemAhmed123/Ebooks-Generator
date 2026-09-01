# Module 9: Component Patterns

## Higher-Order Components (HOCs)

Before React Hooks were introduced in 2018, React components were primarily built using ES6 Classes. Sharing stateful logic between two different Class components was incredibly difficult.

To solve this, the community adopted a pattern called the **Higher-Order Component (HOC)**. 
A Higher-Order Component is a function that takes a component and returns a new, "upgraded" component.

*Note: While Custom Hooks have largely replaced HOCs, you will still encounter them in legacy codebases and specific libraries like Redux (`connect()`).*

### The Pattern
Imagine you have three different components (`<Dashboard />`, `<Profile />`, `<Settings />`) that all require the user to be logged in. You don't want to write the authentication check three times.

```jsx
// 1. The HOC (Usually prefixed with 'with')
function withAuth(WrappedComponent) {
  // It returns a brand new component
  return function EnhancedComponent(props) {
    const isAuthenticated = checkAuthToken();

    // If not authenticated, render a fallback
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    // If authenticated, render the original component and pass through ALL props
    return <WrappedComponent {...props} />;
  };
}
```
