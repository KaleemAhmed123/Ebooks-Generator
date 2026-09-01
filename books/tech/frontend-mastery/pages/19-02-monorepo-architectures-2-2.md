### Micro-frontends (Module Federation)

When an engineering organization grows to hundreds of developers, even a heavily cached monorepo can become a bottleneck if everyone is deploying the exact same Next.js application simultaneously.

**Micro-frontends** slice a single application into independently deployable chunks, usually orchestrated via Webpack's **Module Federation** or modern equivalents in Rspack/Vite.

For example, Team A owns the "Shopping Cart" micro-frontend. Team B owns the "Product Page" micro-frontend.
- Team A can deploy an update to the Shopping Cart at 2:00 PM.
- The user's browser, when loading the main e-commerce site, dynamically fetches the latest JavaScript chunk for the Shopping Cart directly from Team A's CDN at runtime.
- The host application stitches these remote modules together into one application the user never sees the seams in.

:::note
Micro-frontends introduce massive complexity (shared dependency versioning, global state boundaries, tricky debugging). Only adopt them when organizational scaling (communication overhead between hundreds of developers) becomes a bigger problem than technical complexity. For 95% of companies, a standard Monorepo with Turborepo is the optimal architectural peak.
:::
