### What installing v4 looks like

There is no longer a single `tailwindcss` PostCSS plugin. Pick the integration that matches your build.

```bash
# Vite, the fastest path
npm install tailwindcss @tailwindcss/vite

# PostCSS, for Next.js and anything else
npm install tailwindcss @tailwindcss/postcss

# Standalone CLI, no bundler at all
npm install tailwindcss @tailwindcss/cli
```

```js
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default { plugins: [tailwindcss()] };
```

Your stylesheet is now one line. The three `@tailwind` directives are gone.

```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import "tailwindcss";
```
