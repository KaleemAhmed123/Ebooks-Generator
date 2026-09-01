## App Router vs Pages Router

- Next.js has two routing systems and both still work
- **Pages Router** lives in `pages/`. The original one
- **App Router** lives in `app/`. The current one, and the only one being developed

### What changed for the backend

| Pages Router | App Router |
|---|---|
| `pages/api/orders.ts` | `app/api/orders/route.ts` |
| one default export handler | one export per HTTP method |
| `req` and `res` from Node | Web `Request` and `Response` |
| `getServerSideProps` | async Server Components |
| no server functions | Server Actions |
| `middleware.ts` | `proxy.ts` |

- The App Router uses Web standard `Request` and `Response` objects
- That means the same handler code reads the same as it would in any modern runtime
