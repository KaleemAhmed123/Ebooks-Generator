### Client Components (`"use client"`)

To add interactivity (like `useState`, `useEffect`, or `onClick`), you must explicitly declare a component as a Client Component using the `"use client"` directive at the very top of the file.

:::mint
**Push Client Components down the tree.** Do not put `"use client"` at the top of your page. If you do, every single component imported underneath it becomes a Client Component, completely defeating the purpose of RSCs. Keep your interactive bits (buttons, forms, modals) as small leaf nodes in your component tree.
:::

### Edge Computing and RSCs

Traditionally, "the server" meant a Node.js process running in a datacenter in `us-east-1` (Virginia). If a user in Tokyo requests your site, the request takes 200ms just to travel across the Pacific Ocean.

**Edge Computing** solves this. Providers like Vercel and Cloudflare deploy V8 isolates (extremely lightweight, fast-booting JavaScript environments) to hundreds of data centers globally.

When combined with RSCs, Edge computing changes the shape of the request. Your Server Component executes in Tokyo (5ms away from the user), fetches personalized data from a distributed Edge Database, renders the HTML, and streams it back to the user instantly.
