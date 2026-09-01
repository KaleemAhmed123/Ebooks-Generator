### Error Handling with Try/Catch

Because `async / await` looks like synchronous code, you cannot use `.catch()` at the end of it. Instead, you use standard `try / catch` blocks.

```js
async function fetchDashboard() {
  try {
    const data = await fetch('/api/dashboard');
    if (!data.ok) throw new Error("API failed");
    return await data.json();
  } catch (error) {
    console.error("Dashboard failed to load:", error);
    // Show error state in React
  }
}
```
