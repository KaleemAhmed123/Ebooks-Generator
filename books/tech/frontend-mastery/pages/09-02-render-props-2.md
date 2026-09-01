### Using the Render Prop
Now, any component in our application can instantly get access to the mouse coordinates without having to rewrite the `onMouseMove` logic.

```jsx
// 2. The Consumer
function App() {
  return (
    <MouseTracker 
      // We pass a function that receives the state, and returns JSX
      render={(mouseState) => (
        <h1>The mouse position is {mouseState.x}, {mouseState.y}</h1>
      )} 
    />
  );
}
```

### Why it was replaced by Hooks
The Render Props pattern solved the "Wrapper Hell" problem of HOCs, but it introduced a new problem: **Callback Hell**. 

If you needed Mouse tracking, Authentication, and Window Resize logic all in the same component, you had to nest the render functions inside each other, creating a massive, deeply indented pyramid of code. 

Today, you would just write three clean lines:
```jsx
const { x, y } = useMouse();
const { user } = useAuth();
const { width } = useWindowSize();
```
You still need to recognize Render Props, because widely used libraries (like `Formik` or `React Router` v5) heavily rely on this pattern under the hood.
