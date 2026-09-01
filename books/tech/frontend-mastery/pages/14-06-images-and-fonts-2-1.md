### Pick the format on evidence

| Format | Use it for |
|---|---|
| **AVIF** | photographs. Typically 30 to 50% smaller than WebP at the same quality |
| **WebP** | the fallback for AVIF, universally supported |
| **SVG** | logos, icons, anything geometric |
| **PNG** | only when you need lossless with transparency and SVG will not do |
| **JPEG** | the last fallback, and rarely needed now |

```html
<picture>
  <source srcset="/hero.avif" type="image/avif">
  <source srcset="/hero.webp" type="image/webp">
  <img src="/hero.jpg" width="1600" height="900" alt="...">
</picture>
```

In practice a framework image component or an image CDN does this for you.
`next/image` generates the `srcset`, negotiates the format from the `Accept`
header, and enforces `width` and `height`. Use it rather than hand-writing the
above, and understand the above so you can tell when it is misconfigured.

### Tell the browser what matters

The browser guesses at priority from position in the document. It guesses badly
for anything the CSS moves.

```html
<!-- the LCP image: load it first, do not lazy-load it -->
<img src="/hero.avif" fetchpriority="high" loading="eager" width="1600" height="900" alt="...">

<!-- below the fold: do not load it until it is near -->
<img src="/gallery-7.avif" loading="lazy" width="800" height="600" alt="...">
```

**Never put `loading="lazy"` on your LCP image.** It is the single most common
self-inflicted LCP regression. Lazy loading defers the fetch until the browser
has done layout, which pushes the most important image on the page behind
everything else.
