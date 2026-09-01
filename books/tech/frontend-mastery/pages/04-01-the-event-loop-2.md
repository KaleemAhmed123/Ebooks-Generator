### Async / Await

- Introduced in ES8, `async / await` is syntactic sugar over Promises. It allows you to write asynchronous code that *looks* synchronous
- Using `await` pauses the execution of that specific function until the Promise resolves, while leaving the main browser thread completely free to run the rest of the UI

```js
async function getUser() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### Parallel Execution

- A common mistake is awaiting independent promises sequentially, which doubles the loading time

```js
// BAD: Takes 4 seconds total (2s + 2s)
const user = await fetchUser(); 
const posts = await fetchPosts(); 

// GOOD: Takes 2 seconds total. They run at the same time
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```
