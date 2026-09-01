### The RSC Solution

:::mint
<svg viewBox="0 0 470 160" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotbx { fill: #ffffff; stroke: #ef476e; stroke-width: 1.2; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">WHERE THE BOUNDARY FALLS</text>

  <rect class="bx" x="6" y="22" width="222" height="122" rx="4"/>
  <text x="117" y="36" class="lbl" text-anchor="middle">Server Component</text>
  <text x="16" y="54" class="sm">reads the database directly</text>
  <text x="16" y="68" class="sm">keeps secrets and API keys</text>
  <text x="16" y="82" class="sm">its code never ships</text>
  <text x="16" y="102" class="hot">no useState, no useEffect</text>
  <text x="16" y="114" class="hot">no onClick, no browser APIs</text>
  <text x="16" y="134" class="tiny">renders once, on the server</text>

  <rect class="bx" x="248" y="22" width="216" height="122" rx="4"/>
  <text x="356" y="36" class="lbl" text-anchor="middle">Client Component</text>
  <text x="258" y="54" class="sm">"use client" at the top</text>
  <text x="258" y="68" class="sm">state, effects, event handlers</text>
  <text x="258" y="82" class="sm">ships in the bundle</text>
  <text x="258" y="102" class="hot">everything below it is client</text>
  <text x="258" y="114" class="hot">too, unless passed as children</text>
  <text x="258" y="134" class="tiny">renders on the server once, then hydrates</text>

  <line class="ar" x1="232" y1="82" x2="244" y2="82" marker-end="url(#a)"/>
  <text x="238" y="72" class="tiny" text-anchor="middle">props</text>

  <text x="6" y="158" class="sm">props crossing this line must be serializable, so a function cannot go through</text>
</svg>
:::

React Server Components allow you to split your component tree across the network.

```tsx
// This is a Server Component (default in Next.js App Router)
// It runs on the server. Its dependencies stay on the server.
import db from '@/lib/db';
import { MarkdownParser } from 'massive-2mb-library';
import { LikeButton } from './LikeButton'; // Client Component

export default async function Article({ id }) {
  // Direct database access inside a component!
  const article = await db.article.findUnique({ where: { id } });

  return (
    <article>
      <h1>{article.title}</h1>
      {/* The markdown library executes here on the server, generating static HTML */}
      <MarkdownParser content={article.content} /> 
      
      {/* We pass data down to the interactive client component */}
      <LikeButton initialCount={article.likes} />
    </article>
  );
}
```

In the example above, the `massive-2mb-library` is **never sent to the browser**. The server renders the markdown into HTML and sends a special serialized format over the wire.
