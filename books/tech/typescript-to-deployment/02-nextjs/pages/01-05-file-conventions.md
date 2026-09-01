## The file conventions that matter here

- Routing is the folder structure. There is no route table to maintain
- A folder becomes a URL segment. A special filename gives it behavior

| File | What it is |
|---|---|
| `route.ts` | an HTTP endpoint. This is your API |
| `page.tsx` | a page. Can be async and fetch on the server |
| `layout.tsx` | shared shell around pages. Also runs on the server |
| `proxy.ts` | runs before a request reaches a route |
| `default.tsx` | required fallback for a parallel route slot |

```
app/
  api/
    orders/
      route.ts          ->  /api/orders
      [orderId]/
        route.ts        ->  /api/orders/:orderId
  sellers/
    page.tsx            ->  /sellers
proxy.ts                ->  runs before everything
```

- A folder with no special file inside it produces no route
- `route.ts` and `page.tsx` cannot live in the same folder. They both own the URL
