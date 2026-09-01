### Advanced Pattern: Concurrent Execution

One of the most dangerous mistakes junior developers make is "Sequential Awaiting." 

If you need to fetch User data and Product data for a dashboard, and they do not depend on each other, you should **never** await them one after the other.

```js
// BAD: the anti-pattern: Sequential Awaiting
// If user takes 2 seconds and products takes 3 seconds, the user stares at a spinner for 5 seconds.
async function loadPage() {
  const user = await fetch('/api/user');
  const products = await fetch('/api/products'); 
}
```

Instead, you must trigger the network requests immediately, and use `Promise.all()` to await them concurrently.

```js
// GOOD: the modern pattern: Concurrent Awaiting
// Total wait time is only 3 seconds (the longest single request)!
async function loadPage() {
  const userPromise = fetch('/api/user');
  const productsPromise = fetch('/api/products');

  const [user, products] = await Promise.all([userPromise, productsPromise]);
}
```
In modern React Server Components, this pattern streams data to the client in parallel, which improves Largest Contentful Paint (LCP) performance.
