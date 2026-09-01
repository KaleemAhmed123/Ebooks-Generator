## Continued - continued

| Thing | v3 | v4 |
|---|---|---|
| Stylesheet entry | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Config | `tailwind.config.js` | `@theme` in CSS |
| Extend vs override | `theme` vs `theme.extend` | adding extends, reusing a name overrides |
| Content paths | `content: [...]` | automatic, `@source` for the rest |
| PostCSS plugin | `tailwindcss` | `@tailwindcss/postcss` |
| Vite | via PostCSS | `@tailwindcss/vite` |
| CLI | `tailwindcss` | `@tailwindcss/cli` |
| Custom utility | `@layer utilities` | `@utility` |
| Custom variant | plugin `addVariant` | `@custom-variant` |
| Load a plugin | `plugins: []` in config | `@plugin "name"` |
| Safelist | `safelist: []` | `@source inline(...)` |
| Important modifier | `!flex` | `flex!` |
| Read tokens in JS | `resolveConfig()` | `getComputedStyle` on the CSS variable |
| Browser floor | evergreen | Safari 16.4, Chrome 111, Firefox 128 |
