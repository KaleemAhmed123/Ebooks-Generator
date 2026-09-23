## Render Props Pattern

Before Hooks, the other major way to share stateful logic between React components was the **Render Props** pattern. 

Unlike HOCs (which wrap components from the outside), Render Props pass control *down* to a component via a function.

### The Concept
A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```jsx
// 1. The Logic Component
// This component manages the state (mouse X and Y coordinates)
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/* Instead of hardcoding what to render, it calls a function passed as a prop. */}
        {this.props.render(this.state)}
      </div>
    );
  }
}
```
