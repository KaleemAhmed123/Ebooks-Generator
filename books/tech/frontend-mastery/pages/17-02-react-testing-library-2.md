### Writing an RTL Test

```jsx
// Counter.jsx
export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(c + 1)}>Increment</button>
    </div>
  );
}
```

```jsx
// Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

test('it increments the counter when the button is clicked', () => {
  // 1. Render the component in a fake DOM (jsdom)
  render(<Counter />);

  // 2. Find the elements exactly how a screen-reader or user would find them
  // We don't query by class name (e.g. document.querySelector('.btn')). We query by TEXT!
  const button = screen.getByRole('button', { name: /increment/i });
  const countText = screen.getByText(/current count: 0/i);

  // Assert initial state
  expect(countText).toBeInTheDocument();

  // 3. Simulate a human interaction
  fireEvent.click(button);

  // 4. Assert the result on the screen
  expect(screen.getByText(/current count: 1/i)).toBeInTheDocument();
});
```

Because this test relies on what is visually printed to the DOM (and Accessibility roles like `button`), you could completely rewrite the `<Counter />` component in vanilla JavaScript, and this test would still pass! That is the power of React Testing Library.
