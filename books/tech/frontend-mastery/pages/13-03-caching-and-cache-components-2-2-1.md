### Partial Prerendering, which is what this buys you

Before this, Next.js had to pick one strategy per URL. Static meant fast but stale. Dynamic meant fresh but slow, including the parts of the page that never change.

Cache Components remove the choice. The static shell is prerendered and served from the edge instantly. The dynamic holes, wrapped in `<Suspense>`, stream in behind it.

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
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

  <text x="6" y="12" class="sm">ONE RESPONSE, TWO SPEEDS</text>

  <rect class="bx" x="6" y="24" width="220" height="106" rx="4"/>
  <text x="116" y="38" class="lbl" text-anchor="middle">prerendered shell</text>
  <rect class="soft" x="18" y="48" width="196" height="20" rx="2"/>
  <text x="116" y="62" class="sm" text-anchor="middle">header, nav, product copy</text>
  <rect class="hotbx" x="18" y="74" width="94" height="24" rx="2"/>
  <text x="65" y="89" class="hot" text-anchor="middle">hole</text>
  <rect class="hotbx" x="120" y="74" width="94" height="24" rx="2"/>
  <text x="167" y="89" class="hot" text-anchor="middle">hole</text>
  <rect class="soft" x="18" y="104" width="196" height="18" rx="2"/>
  <text x="116" y="117" class="sm" text-anchor="middle">footer</text>

  <text x="248" y="42" class="sm">served from the edge</text>
  <text x="248" y="54" class="tiny">no server work, first byte at once</text>

  <text x="248" y="80" class="hot">each hole is a &lt;Suspense&gt;</text>
  <text x="248" y="92" class="tiny">live price, cart, personalization</text>
  <text x="248" y="104" class="tiny">streams into the same response</text>

  <line class="ar" x1="230" y1="58" x2="244" y2="50" marker-end="url(#a)"/>
  <line class="ar" x1="230" y1="86" x2="244" y2="86" marker-end="url(#a)"/>

  <text x="6" y="146" class="sm">the old choice was static OR dynamic per URL. this is both, per region of the page.</text>
</svg>
:::

```tsx
export default function ProductPage({ params }) {
  return (
    <>
      <Header />                              {/* cached, instant */}
      <ProductDetails id={params.id} />       {/* cached, instant */}
      <Suspense fallback={<PriceSkeleton />}>
        <LivePrice id={params.id} />          {/* per request, streams in */}
      </Suspense>
      <Suspense fallback={<CartSkeleton />}>
        <CartWidget />                        {/* per user, streams in */}
      </Suspense>
    </>
  );
}
```

One HTML response. The parts that can be prepared in advance are, and the parts that cannot arrive a moment later.

The old `experimental.ppr` flag and the `export const experimental_ppr` route export are both **removed**. This is what replaced them.
