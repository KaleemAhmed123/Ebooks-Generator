### 2. Web Storage API & IndexedDB

Modern web apps need somewhere to keep data on the client.

- **`localStorage`**: Stores key-value string pairs persistently across sessions. Limited to ~5MB. Synchronous and blocking. Do not use for large data.
- **`sessionStorage`**: Same as localStorage, but data is cleared when the page session ends (when the tab is closed).
- **`IndexedDB`**: The heavy lifter. A low-level, asynchronous, transactional, object-oriented database running in the browser. It can store hundreds of megabytes of structured data, including Files and Blobs. It is essential for Offline-First applications and PWAs.

### 3. The Fetch API & AbortController

The modern replacement for `XMLHttpRequest`. It relies on Promises for a cleaner asynchronous flow.

A critical, often-missed feature of `fetch` is the ability to cancel requests using an **`AbortController`**. If a user navigates away from a page before a slow API request finishes, you should abort the request to free up network bandwidth and prevent memory leaks.

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('/api/heavy-data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch successfully canceled');
    }
  });

// Somewhere else, cancel the request:
controller.abort();
```
