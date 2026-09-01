## So when do you still write a route handler

- If a Server Component can query the database, a lot of API routes stop being necessary
- You still need `route.ts` for these

| Reason | Example |
|---|---|
| A caller that is not your own page | a mobile app, a partner integration |
| A webhook | Razorpay or Stripe calling you |
| A non-HTML response | a CSV export, an RSS feed, a signed URL |
| Streaming | an LLM answer, a long report |
| A public API you version | `/api/v1/orders` |

### The rule of thumb

- Rendering your own page, reach for a Server Component
- Anything else talking to your server, write a route handler

- A route handler that exists only to feed your own page is usually a leftover habit from the Pages Router
