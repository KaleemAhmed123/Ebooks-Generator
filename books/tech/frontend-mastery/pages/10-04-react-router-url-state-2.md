### Using Search Parameters
Instead of using `useState`, modern React applications use the Router (like React Router or Next.js) to read and write to the URL's query string (the part after the `?`).

```jsx
// BAD: the anti-pattern
function ProductList() {
  const [category, setCategory] = useState("shoes");
  // ...
}

// GOOD: the modern pattern (Using React Router)
import { useSearchParams } from "react-router";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // We read the 'category' from the URL (e.g., ?category=shoes)
  // If it doesn't exist, we default to "shoes"
  const category = searchParams.get("category") || "shoes";

  // When the user clicks a filter, we update the URL, not local state.
  const updateFilter = (newCategory) => {
    setSearchParams({ category: newCategory });
  };

  return (
    <div>
      <button onClick={() => updateFilter("hats")}>Show Hats</button>
      <p>Currently showing: {category}</p>
    </div>
  );
}
```

### Benefits of URL State
1. **Link sharing.** Copy the URL into Slack and a coworker sees the same filtered table.
2. **Browser history.** Each parameter change is a history entry, so Back works with no code.
3. **No global store.** Any component can read the URL, so no Zustand or Context is needed.
