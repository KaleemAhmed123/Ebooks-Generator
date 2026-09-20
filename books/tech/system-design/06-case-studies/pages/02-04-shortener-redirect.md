## The redirect and the cache

- When a user visits the short URL, the server responds with a 3xx HTTP status and a `Location` header. The choice of status code dictates the load on the system
- **301 Moved Permanently:** The browser caches the redirect forever. The next time the user clicks the short link, the browser goes straight to the long URL without hitting your server. This drastically reduces load, but you lose all analytics for repeat clicks
- **302 Found (or 307 Temporary Redirect):** The browser hits your server every single time. This increases load, but ensures you track every click for analytics. For a URL shortener, tracking clicks is usually a core business requirement, making 302 the correct default
- Because reads outnumber writes 100:1, we use a **cache-aside** pattern. The server checks Redis; on a miss, it reads the database, writes to Redis, and returns the redirect

```typescript
async function handleRedirect(code: string, res: Response) {
  let url = await redis.get(`url:${code}`);
  if (!url) {
    const row = await db.query('SELECT long_url FROM urls WHERE code = ?', [code]);
    if (!row) return res.status(404).send('Not Found');
    url = row.long_url;
    await redis.set(`url:${code}`, url, 'EX', 86400); // 1-day TTL
  }
  res.setHeader('Location', url);
  res.status(302).send();
}
```

### The failure

- The failure mode is choosing a 301 redirect while also promising accurate click analytics. You cannot have both. If the browser caches the redirect, the server never sees the click
- RFC 9110 specifies that 301 (Permanent) and 308 (Permanent, preserves method) are heuristically cacheable. 302 (Found) and 307 (Temporary, preserves method) are not cacheable by default

:::interview
**The HTTP protocol test**
Interviewers use URL shorteners to test your knowledge of HTTP. If you do not know the difference between a 301 and a 302, they will assume you lack fundamental web development experience.
:::
