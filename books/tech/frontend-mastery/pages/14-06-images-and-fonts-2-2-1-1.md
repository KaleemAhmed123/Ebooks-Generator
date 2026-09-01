### Warm the connection

A resource on another origin costs a DNS lookup, a TCP handshake and a TLS
handshake before the first byte. On a mobile network that is easily 300ms.

```html
<link rel="preconnect" href="https://images.example-cdn.com" crossorigin>
<link rel="dns-prefetch" href="https://images.example-cdn.com">
<link rel="preload" as="image" href="/hero.avif" fetchpriority="high">
```

Use `preconnect` sparingly, for two or three origins at most. Each one holds
open a connection, and a page that preconnects to twelve domains has made
itself slower.

### Fonts

A web font blocks text from painting until it arrives, or paints in a fallback
and then swaps, which shifts the layout. Both hurt.

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-var.woff2") format("woff2-variations");
  font-weight: 100 900;          /* one file covers every weight */
  font-display: swap;
  font-style: normal;
  /* stop the browser downloading glyphs nobody on this page needs */
  unicode-range: U+0000-00FF, U+2000-206F;
  /* pull the fallback to the same metrics so the swap does not shift */
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
}
```

The five decisions:
