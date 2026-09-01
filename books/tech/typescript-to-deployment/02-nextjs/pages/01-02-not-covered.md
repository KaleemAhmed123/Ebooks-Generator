## What this booklet leaves out

- Anything about building the user interface
- Hooks, component state, styling, animation, forms as UI
- Those belong to React, not to the server

### Why the split matters

- A Next.js app can be your entire backend, or none of it
- Teams get this wrong in both directions
  - shipping a marketing site with a full microservice architecture behind it
  - or putting a payment ledger inside a route handler that a deploy can restart mid-write
- The last page of this booklet is about that decision

:::note
Verified against Next.js 16.3.3 and React 19.2. Next.js changes its caching and routing rules often, so check the version number in your `package.json` before trusting any tutorial, including this one.
:::
