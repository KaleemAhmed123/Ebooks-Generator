# Module 2 - Route Handlers

## Your first route handler

- A page returns HTML. Plenty of things a backend serves are not HTML: JSON for a mobile app, a CSV export, a webhook receipt, an RSS feed
- A **Route Handler** is Next.js's way of writing those. One file owns one URL, and you export a function per HTTP method
- The Pages Router had one default-export handler that had to branch on `req.method` itself, which meant every API file started with a switch statement
- Exporting `GET` and `POST` separately removes that branching, and gives Next.js enough information to answer `OPTIONS` for you
- The bigger change is what you receive. These are the Web standard `Request` and `Response` objects, not Node's `req` and `res`
- That means the same handler body reads identically in Deno, Bun, a Cloudflare Worker or a service worker

```ts
// app/api/orders/route.ts

export async function GET() {
  return Response.json({ orders: [] })
}
```

- Visit `/api/orders` and you get `{"orders":[]}`
- `Response.json` is a Web API, not a Next.js invention. It sets the content type for you
