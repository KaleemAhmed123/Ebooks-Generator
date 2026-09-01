### Using the HOC
To use it, you wrap your component before exporting it.

```jsx
function Dashboard(props) {
  return <h1>Welcome to your Dashboard, {props.user}!</h1>;
}

// We "upgrade" the Dashboard. Now it magically has authentication checks!
export default withAuth(Dashboard);
```

### The "Wrapper Hell" Problem
HOCs were powerful, but they caused massive problems. 
If a component needed Authentication, Redux data, and React Router navigation, you had to wrap it multiple times:

```jsx
export default withRouter(connect(mapStateToProps)(withAuth(Dashboard)));
```
When you looked at this component in the React DevTools, you wouldn't see `<Dashboard>`. You would see `<WithRouter><Connect><WithAuth><Dashboard></WithAuth></Connect></WithRouter>`. This nested pyramid of doom, famously called **Wrapper Hell**, made debugging almost impossible. This is why React Hooks were invented.
