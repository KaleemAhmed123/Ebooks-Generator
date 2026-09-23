## Choosing a Framework

This module taught Next.js because it is the default at most companies and the
one you are most likely to be hired onto. It is not the only reasonable answer,
and being able to say why you would pick something else is an interview question
and an architecture conversation.

### The map, as of late 2026

**Next.js** holds the enterprise default position, with the largest share of
production React applications. Turbopack is stable, Cache Components landed, and
the hosting story on Vercel is the smoothest available. Its costs are real: the
caching model has changed three times, and the framework has opinions that are
hard to opt out of.

**React Router v7** in framework mode is what the old Remix became: the two
projects merged, and the result shipped under the React Router name. It leans on
web standards, `Request` and `Response` and real form submissions, rather than
framework abstractions. That makes it the lower-risk full-stack React choice for
a new project, because there is less framework between you and the platform.

**Remix v3** is a different thing and no longer a React framework. Shopify
restarted it on a fork of Preact with its own component model. Do not reach for
it expecting React.

**TanStack Start** is the interesting entrant. Vite-native, and built for
**end-to-end type safety**: routes, search parameters and loader data are all
typed, so a renamed route parameter is a compile error in every component that
reads it. Deliberate early-adopter territory, and the strongest choice if that
particular guarantee is what you want.

**Astro** ships zero JavaScript by default and hydrates only the interactive
islands. **Cloudflare acquired the Astro team in January 2026** and committed to
keeping it open source, which pairs the framework with an edge platform as a
first-party stack. It is the clear pick for content: marketing sites,
documentation, blogs, anything mostly text.

**SvelteKit** and **Nuxt** are the equivalents outside React, and are chosen
because the team already knows Svelte or Vue rather than on technical grounds.

**Qwik** is the most different idea in the list. Instead of hydrating, it
**resumes**: the server serializes the application state into the HTML, and the
client picks up from there without re-running the component tree. Startup cost
stays roughly constant no matter how large the application is. Small ecosystem,
and the right answer only when time-to-interactive is the thing you are being
judged on.
