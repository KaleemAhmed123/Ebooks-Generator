# Module 3 - Server Components and Server Actions

## Server Components, the backend view

- In the App Router every component is a **Server Component** unless you say otherwise
- A Server Component runs on the server, renders to HTML, and never ships its code to the browser
- Adding `"use client"` at the top of a file makes it and everything it imports a Client Component

### The only consequence that matters here

- A Server Component can be `async` and can query your database directly

```tsx
// app/sellers/page.tsx

export default async function SellersPage() {
  const sellers = await db.sellers.findMany()

  return <ul>{sellers.map((s) => <li key={s.id}>{s.name}</li>)}</ul>
}
```

- No API route, no fetch, no loading state
- The database credentials stay on the server because this file never reaches the browser

### What a Server Component cannot do

- No `useState`, no `useEffect`, no event handlers
- No `window`, no `localStorage`
- Anything interactive needs a Client Component underneath it
