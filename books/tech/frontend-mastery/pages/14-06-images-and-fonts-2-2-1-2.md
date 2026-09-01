## Continued - continued

1. **`woff2` only.** Every browser you support reads it. Shipping `woff`, `ttf`
   and `eot` alongside it is dead weight.
2. **Variable fonts.** One file that covers weight 100 to 900 usually beats
   three static files, and always beats five.
3. **`font-display: swap`.** Text paints immediately in the fallback and swaps
   when the font arrives. `optional` is stricter: if the font is not ready
   almost immediately, the page uses the fallback for that visit and never
   swaps, which costs you the design and buys you a guaranteed zero layout
   shift.
4. **Subset.** A Latin-only subset of a font with full Cyrillic and Greek
   coverage is often a quarter of the size.
5. **Match the metrics.** `size-adjust`, `ascent-override` and
   `descent-override` make the fallback occupy the same space as the real font,
   so the swap does not move anything. This is what turns a font swap from a
   layout shift into an invisible change.

**Self-host.** Fetching from a third-party font host costs a whole extra
connection, and browsers no longer share font caches between sites, so the old
argument for a shared CDN copy is gone.

```html
<link rel="preload" as="font" type="font/woff2"
      href="/fonts/inter-var.woff2" crossorigin>
```

`crossorigin` on a font preload is mandatory even for a same-origin font. Fonts
are always fetched in CORS mode, and omitting it makes the browser fetch the
file twice.

### The checklist for an LCP problem
