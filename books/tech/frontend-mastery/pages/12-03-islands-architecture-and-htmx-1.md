## Islands Architecture and HTMX

The industry loves a pendulum swing. For the last ten years, the pendulum swung hard toward massive Single Page Applications (SPAs). We shipped megabytes of JavaScript to the browser to render everything from highly interactive dashboards to completely static blog posts.

By 2026, the pendulum has swung back. We have realized that sending massive JavaScript bundles just to render static text is a catastrophic waste of battery, bandwidth, and CPU cycles.

This realization birthed two architectural movements: **Islands Architecture** and the **Hypermedia (HTMX)** approach.

### Islands Architecture (Astro)

If you are building a marketing site, an e-commerce storefront, or a documentation site, 90% of your page is completely static. The only interactive parts are the image carousel, the "Add to Cart" button, and the dark mode toggle.

Frameworks like **Astro** pioneered the Islands Architecture.

By default, Astro renders your entire site on the server into pure, static HTML and sends **zero JavaScript** to the browser. 

When you need an interactive component (an "Island"), you explicitly tell Astro to hydrate just that component.

```astro
---
// This runs on the server during build or SSR.
import Header from '../components/Header.jsx';
import StaticText from '../components/StaticText.jsx';
import InteractiveCarousel from '../components/InteractiveCarousel.jsx';
---

<html>
  <body>
    <!-- Renders as pure HTML, zero JS sent to client -->
    <Header />
    <StaticText />
```
