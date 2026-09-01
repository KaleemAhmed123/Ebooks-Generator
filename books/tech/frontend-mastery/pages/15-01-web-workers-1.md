# Module 15: Browser APIs

## The Single-Threaded Bottleneck

- JavaScript is strictly single-threaded. It has one "Main Thread" that must handle parsing the DOM, listening for user clicks, and executing your logic
- If you run an intense CPU task (like parsing a massive CSV file or encrypting data), the Main Thread is blocked. The user cannot scroll, click buttons, or type in inputs. The page appears frozen
- **The Solution:** Web Workers

### Web Workers

- A Web Worker allows you to spawn a completely separate background thread in the browser
- You hand the heavy computation off to the worker. It runs the math in the background, and when it is finished, it passes the result back to the main thread via a `postMessage` event
- **Limitation:** Workers cannot access the DOM. They are strictly for computation and data processing

```js
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ command: 'processHugeArray', data: hugeArray });

worker.onmessage = function(e) {
  console.log('Result from background thread:', e.data);
};
```

## Storage APIs

- Cookies are sent to the server on every request. They are strictly for authentication and session management
- For client-side data persistence, modern browsers provide two main APIs:
