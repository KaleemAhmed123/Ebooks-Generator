## Zero-Runtime CSS-in-JS

"CSS-in-JS is dead" is the common summary and it is wrong. What happened is a
split, and knowing which half you are looking at is the useful part.

### The numbers

As of September 2026, npm reports roughly **11.5 million weekly downloads for
`styled-components`** and **126 million for `tailwindcss`**. Read both with
care: download counts include CI runs, mirrors and transitive installs, so they
measure how often a package is fetched, not how often a team chose it.

What they do show is that styled-components has not collapsed — it is not
shrinking. New projects overwhelmingly choose Tailwind, CSS Modules or a
zero-runtime tool, and `vanilla-extract`, Panda CSS and StyleX are all growing,
but the runtime tools kept the codebases they already had. The category did not
die. It split.

### Why the runtime kind lost

styled-components and Emotion generate CSS **while your application runs**. Every
styled component, on every render, serializes its styles, hashes them, and
injects a rule into a stylesheet the browser then has to re-parse.

Three costs follow:

1. **Work on every render.** Small per component, real across a page of hundreds.
2. **Bundle weight.** The engine ships to the browser, plus every style as a
   JavaScript string rather than as cacheable CSS.
3. **Server Components.** This is the one that decided it. A Server Component
   never runs in the browser, so there is no runtime available to inject the
   `<style>` tag. Runtime CSS-in-JS forces every styled component to be a Client
   Component, which defeats the point of the architecture.

Point 3 arrived at the same time as the App Router, and that timing is most of
the download graph above.
