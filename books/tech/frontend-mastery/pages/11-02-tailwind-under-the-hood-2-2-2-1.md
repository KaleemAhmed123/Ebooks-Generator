### What v4 requires from the browser

v4 is built on `@property`, `color-mix()`, and native cascade layers. Those are not polyfillable, so the baseline moved: **Safari 16.4, Chrome 111, Firefox 128**. A project that must support older browsers stays on v3.

That baseline is what buys the new capabilities: real cascade layers instead of a simulated `@layer`, opacity modifiers like `bg-blue-500/50` computed with `color-mix()` rather than pre-generated, and a color palette expressed in `oklch()` so the colors stay vivid on wide gamut displays.

### The v3 to v4 cheat sheet

Plenty of production codebases are still on v3. This is what moves.
