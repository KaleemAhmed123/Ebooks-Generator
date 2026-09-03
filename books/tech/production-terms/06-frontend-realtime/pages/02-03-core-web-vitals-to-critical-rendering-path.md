## Core Web Vitals

*LCP / INP / CLS*

Google's user-experience metrics: how fast the main content paints, how fast the
page responds to input, and how much it moves while loading.

| Metric | Measures | Threshold |
|---|---|---|
| LCP | largest contentful paint | under 2.5s |
| INP | interaction to next paint | under 200ms |
| CLS | cumulative layout shift | under 0.1 |

**These are measured on real users, not in a lab.** A local Lighthouse run on a
fast machine is a development tool; the number that affects ranking comes from
field data. The gap between them is large and always in the same direction.

## Critical Rendering Path

The sequence from HTML to pixels: parse the HTML, build the CSSOM, lay out,
paint. Render-blocking resources stall the whole thing.

A 90KB stylesheet in the head blocks first paint until it has downloaded and
parsed — even though only 6KB of it applies above the fold.

HTML becomes the DOM, CSS becomes the CSSOM, and the render tree needs both.
That is why a stylesheet on a slow connection gives a blank screen rather than
an unstyled one.

**The fix is ordering, not size.** Inline what the first screen needs, load the
rest asynchronously, and keep blocking scripts out of the head entirely.
