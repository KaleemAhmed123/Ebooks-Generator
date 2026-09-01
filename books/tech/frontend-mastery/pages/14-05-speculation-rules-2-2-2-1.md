### Eagerness, and how to choose

| Value | Fires when | Default for |
|---|---|---|
| `immediate` | as soon as the rule is seen | list rules |
| `eager` | 10ms pointer hold on desktop, 50ms after a link enters the viewport on mobile | |
| `moderate` | 200ms pointer hold or `pointerdown` on desktop, 500ms after scrolling stops on mobile | |
| `conservative` | on pointer or touch down | document rules |

Chrome caps how many run at once, and the cap is the reason eagerness matters:

| Eagerness | Prefetch limit | Prerender limit |
|---|---|---|
| `immediate` | 50 | 10 |
| everything else | 2, first in first out | 2, first in first out |

**Start at `moderate`.** A 200ms pointer hold is a strong signal of intent and
still buys most of the time back. `immediate` on a page full of links wastes
bandwidth on people's phone plans and CPU on your server.

### Chrome 144 added a middle setting

January 2026 introduced **prerender until script**: the browser fetches the HTML
and begins loading subresources, then **pauses at the first blocking script
tag**. You get the CSS, images and fonts preloaded, with none of the JavaScript
side effects. It is the sensible default for pages you are not confident are
prerender-safe.
