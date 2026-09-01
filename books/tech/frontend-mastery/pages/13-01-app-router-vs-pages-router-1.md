# Module 13: Next.js 16

## App Router vs Pages Router

Next.js 13 introduced the **App Router**, the largest change the framework has made. It did not delete the old `pages/` directory. Both routers still work in version 16, and they work side by side in the same project, which is how large codebases migrate a route at a time. New work goes in `app/`. `pages/` is in maintenance, not removal.

### The Pages Router (The Old Way)
In the old Pages Router, routing was strictly tied to filenames. If you created `pages/about.js`, it instantly became the `/about` URL.
Data fetching was handled by two massively complex functions:
1. `getServerSideProps` (For Server-Side Rendering on every request)
2. `getStaticProps` (For Static Site Generation at build time)

These functions could ONLY be exported from the top-level page component. If a deeply nested `<Sidebar />` component needed data from the database, it couldn't fetch it itself. The top-level Page had to fetch it, and then drill it down through 5 layers of props.
