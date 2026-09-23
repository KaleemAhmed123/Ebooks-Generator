# Part Four — State And Style

**Passes run:** 1 (fact) and 2 (consistency) only, per `BRIEF-FACT.md`. Voice and
structure skipped by instruction.

**Files covered:** 40 — `10-00` through `10-05`, `11-01` through `11-07`. 7,470
words total.

## Budget line

- **Web fetches spent: 27** (25 WebFetch + 2 WebSearch). Slightly over the ~25
  cap; two were retries after a 404 and a 400.
- **Claims checked against a live primary source: 41.**
- **WRONG: 7. UNVERIFIABLE: 6. Contradictions: 4. Repeats: 3.**

### NOT CHECKED — explicitly

1. **TanStack Query `refetchOnWindowFocus` default.** The important-defaults page
   describes window-focus refetching as default behaviour but the fetch did not
   return an explicit boolean. `10-03-2.md:32` is therefore **unconfirmed**, not
   verified.
2. **Whether `gql` is still exported from `@apollo/client` root in v4.** The v4
   migration guide covers the React entry-point split but is silent on `gql`.
   See finding W-2.
3. **Apollo Client v4 `InMemoryCache` / normalization API.** The migration guide
   returned nothing specific. `10-05-1.md:34` (normalization behaviour) is
   plausible and unchanged in principle but was **not** verified against a v4
   source.
4. **Zustand's current recommended selector shape** (`useShallow` for
   object/array selectors). Confirmed v5.0.15 is current; did not fetch the
   selector docs. See U-5.
5. **React Router mode taxonomy detail.** Confirmed v8 is current and the
   `react-router` package name is correct; did **not** verify whether
   `useSearchParams` behaviour changed in v8, or check the v8 middleware/future
   flags against anything the book says (the book says nothing about them).
6. **Tailwind v4.1+ built-in `text-shadow-*` utilities.** Relevant to W-4 but
   not separately fetched.
7. **CVA, clsx, tailwind-merge current versions and APIs** (`11-04`). Not
   fetched — spent the budget on the six priorities named in the brief.
8. **`11-02-1.md:53` "Development stylesheets ran past 10MB"** — see U-1.

---

## WRONG

### W-1 — The download figures in `11-07` are wrong by an order of magnitude

`11-07-zero-runtime-css-in-js-1.md:8-11`:

> "Between 2023 and 2026, **styled-components fell from roughly 8.5 million to 6.8
> million weekly downloads**, about a 20% decline, while **Tailwind doubled from 6
> million to 12 million**."

Live npm registry, week of **2026-08-23 to 2026-08-29**:

| Package | Book says (2026) | Actual weekly downloads |
|---|---|---|
| `styled-components` | 6.8 million | **11,459,678** |
| `tailwindcss` | 12 million | **125,634,238** |

Sources:
- https://api.npmjs.org/downloads/point/last-week/styled-components
- https://api.npmjs.org/downloads/point/last-week/tailwindcss

Both numbers are wrong, and the styled-components number is wrong **in
direction as well as magnitude** — it is higher today than the "before" figure
the book uses. The whole "### The numbers" section, and the claim that it is
"about a 20% decline", rests on figures no primary source supports. The
qualitative point (new projects pick Tailwind; runtime CSS-in-JS lost ground to
RSC) survives; the arithmetic does not. **Cut the numbers or re-source them.**

### W-2 — The Apollo Client code sample uses a v3 import that is invalid in v4

`10-05-apollo-graphql-client-2.md:6`:

> `import { useQuery, gql } from '@apollo/client';`

Apollo Client's current major is **4.2.12** (released 2026-08-13,
https://api.github.com/repos/apollographql/apollo-client/releases/latest). In
v4 all React exports moved out of the root entry point:

> "All React-related exports have been moved to the `@apollo/client/react`
> entrypoint and out of the main `@apollo/client` entrypoint, which prevents the
> need to install React in order to use the core client."
> — https://www.apollographql.com/blog/announcing-apollo-client-4-0

The migration guide states the change directly: `import { useQuery } from
"@apollo/client"` becomes `import { useQuery } from "@apollo/client/react"`
(https://github.com/apollographql/apollo-client/blob/main/docs/source/migrating/apollo-client-4-migration.mdx).

The sample as written does not run on the current major. **`gql`'s entry point
was not covered by the guide — NOT CHECKED (see budget note 2), so split the
import only after confirming where `gql` now lives.**

Same guide, second issue for this chapter:

> "Apollo Client 4 unifies all errors into a single `error` property."

The book's destructure `{ loading, error, data }` (`10-05-...-2.md:18`) is still
correct after that change. No action there.

### W-3 — "the generated CSS file remains exactly the same size" is false, and contradicts `11-02` and `11-05`

`11-01-the-utility-first-paradigm-2.md:18`:

> "**Your CSS stops growing.** Whether you have 10 pages or 10,000 pages, the
> generated CSS file remains exactly the same size."

Tailwind v4 emits **only the classes it finds in your source**, so output scales
with the number of *distinct* utilities used, not with page count — it does not
stay "exactly the same size":

> "Tailwind will scan every file in your project for class names..." — and only
> matched classes are emitted.
> — https://tailwindcss.com/docs/detecting-classes-in-source-files

The book itself says the opposite twice:
- `11-02-tailwind-under-the-hood-1.md:3` — "generates only the CSS those class names need"
- `11-02-...-1.md:46` (in the SVG) — "nothing you did not literally type gets emitted"
- `11-05-utilities-variants-and-plugins-1.md:7` — every arbitrary value "generates a one-off rule for it", i.e. new CSS per new value

The honest version of the claim is *sublinear* growth (the file plateaus as the
utility vocabulary saturates), not constant size.

### W-4 — The `@utility` functional example uses the wrong namespace and has a syntax error

`11-05-utilities-variants-and-plugins-2-1.md:20-22`:

```css
@utility text-shadow-* {
  text-shadow: --value(--shadow- *);
}
```

Two defects against https://tailwindcss.com/docs/adding-custom-styles :

1. **Stray space.** The documented form is `--value(--tab-size-*)` — one token,
   no space before the `*`. `--value(--shadow- *)` will not parse.
2. **Wrong namespace.** `--value()` takes the theme namespace matching the
   utility. A `text-shadow-*` utility reads `--value(--text-shadow-*)`;
   `--shadow-*` is the box-shadow namespace (confirmed on
   https://tailwindcss.com/docs/theme — `--shadow-*` → `shadow-md`, `shadow-lg`).

Documented reference example, verbatim:

```css
@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

Additional risk: **Tailwind is at v4.3.3** (2026-07-16,
https://api.github.com/repos/tailwindlabs/tailwindcss/releases/latest) and
`text-shadow-*` has been a built-in utility since the 4.1 line, so this example
would now shadow a first-party utility. **UNVERIFIED — see NOT CHECKED item 6.**
Pick a different example name regardless.

### W-5 — "Oxide" is not what the v4 documentation calls the engine, and the Rust claim is too broad

`11-02-tailwind-under-the-hood-1.md:57`:

> "**Oxide (v4).** The scanner and the parser were rewritten in Rust."

Two problems.

**(a) The name.** The official v4.0 release post never uses "Oxide". It says only
"**new high-performance engine**"
(https://tailwindcss.com/blog/tailwindcss-v4). "Oxide" was the *codename* during
development — it survives publicly only as the npm package `@tailwindcss/oxide`
and the PR title (tailwindlabs/tailwindcss#10252). Presenting it as the engine's
name, as a peer of "Ahead of time" and "Just in time", is not how the project
names it today.

**(b) The scope of the rewrite.** From the v4 alpha post
(https://tailwindcss.com/blog/tailwindcss-v4-alpha), Tailwind Labs "migrated some
of the most expensive and parallelizable parts of the framework to Rust, **while
keeping the core of the framework in TypeScript** for extensibility." The
**scanner** is the Rust part. The CSS parser is not — and the SVG on the same
page gets this right at line 47 ("v4 does this in Rust", of scanning), so the
prose contradicts the book's own diagram.

### W-6 — The `bg-blue-500` design-system example contradicts the token-naming rule taught two chapters earlier

`11-03-the-css-first-theme-2-2-2-1.md:3` sets the rule:

> "Name a color for what it does, not what it looks like... Name it
> `bg-blue-500` and you are renaming classes in four hundred files."

`11-04-building-a-design-system-1.md:25`, labelled **"GOOD: The component
encapsulates the design"**:

```tsx
<button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
```

The page endorsed as correct uses exactly the class the previous chapter names
as the mistake. `11-04-...-2-1-2.md:10` then switches to `bg-primary` /
`bg-destructive` with no comment on the change. Make `11-04-...-1.md` use role
tokens.

### W-7 — "four escape hatches", then five are listed

`11-05-utilities-variants-and-plugins-1.md:3`:

> "Tailwind gives you **four** escape hatches, in increasing order of commitment."

The chapter numbers four (arbitrary values, arbitrary variants, `@utility`,
`@custom-variant`), then `11-05-...-2-2.md:1-11` adds **JavaScript plugins** as a
fifth, and the chapter's own closing decision table
(`11-05-...-2-2.md:27-33`) has **five rows**, the last being "Needs to read data
or loop → a JavaScript plugin". Say five, or exclude plugins from the table.

---

## UNVERIFIABLE

### U-1 — "Development stylesheets ran past 10MB"

`11-02-tailwind-under-the-hood-1.md:53`. No primary source fetched supports a
10MB figure for v1/v2 development builds. The v4 blog gives build *times*, not
pre-JIT file sizes. Either source it or drop the number and keep the shape of the
claim ("multi-megabyte development builds, purged for production").

### U-2 — The stated reason `@layer utilities` was replaced by `@utility`

`11-05-utilities-variants-and-plugins-2-1.md:3`:

> "In v3 this meant `@layer utilities`, which had a subtle problem: **those rules
> did not respond correctly to variants.**"

The v4 upgrade guide instructs the swap but gives no such reason
(https://tailwindcss.com/docs/upgrade-guide). In v3, `@layer utilities` rules
*did* pick up variants — that was the directive's purpose. The real v4 driver is
the move to native cascade layers. **I am reasoning from memory on the v3
behaviour, so the verdict is UNVERIFIABLE, not WRONG** — but the sentence needs a
source before it prints.

### U-3 — "you have no guarantee that `px-8` will beat `px-4`"

`11-04-building-a-design-system-2-2-1.md:16`. The first two sentences of that
paragraph are correct CSS (attribute order is irrelevant; source order in the
stylesheet decides). The third is imprecise: Tailwind's utility output order is
deterministic and stable, so which of two same-group utilities wins is
predictable — it just is not *the consumer's* choice. "No guarantee" overstates
it. Not fetched against a source; flagging rather than asserting.

### U-4 — "React Query replaces 50% of your legacy Redux code"

`10-03-react-query-server-state-2.md:35`:

> "It is so powerful that it is often said that React Query replaces 50% of your
> legacy Redux code completely."

A hedged, attributed-to-nobody statistic. No primary source. Per the brief, a
claim no primary source backs gets cut.

### U-5 — Zustand chapter never mentions the object-selector footgun

`10-02-zustand-global-state-2-2.md`. Confirmed Zustand is at **v5.0.15**
(2026-08-13, https://api.github.com/repos/pmndrs/zustand/releases/latest) and
`import { create } from 'zustand'` plus `create<T>()(...)`-style usage is current.
The two selectors shown (`state.items.length`, `state.addItem`) both return
stable primitives/references and are correct. But the chapter's headline promise
("Selectors (The Performance Secret)") is incomplete without the case where a
selector returns a **new object or array every render** and re-render suppression
silently stops working — the `useShallow` case. **NOT CHECKED against the current
selector docs**, flagged as a gap rather than an error.

### U-6 — "React Query caches responses based on unique string keys"

`10-05-apollo-graphql-client-1.md:8` calls `['user', 1]` a "unique string key".
It is an array, hashed deterministically — the book's own `10-03-...-2.md:18`
shows `queryKey: ['user', userId]`. Minor internal wording mismatch; low severity.

---

## CONTRADICTIONS

### C-1 — `staleTime` and `gcTime` appear only inside a diagram, never defined

`10-03-react-query-server-state-1.md:57` and `:67` — the SVG labels transitions
`staleTime expires` and `gcTime expires`, and `:70` says "remounts before
gcTime". Neither term appears in the prose of `10-03-...-1.md` or
`10-03-...-2.md`. The book's own rule is that every term gets a one-line meaning
where it first appears. Two version-sensitive TanStack Query options are
introduced undefined, in an image.

Worth doing while fixing: **`gcTime` is the correct v5 name** (v4's `cacheTime`
was renamed;
https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5),
so the diagram is right — it just needs prose. Default `gcTime` is
`1000 * 60 * 5` (5 minutes), per
https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults.

### C-2 — `isLoading` is taught with no mention of `isPending`

`10-03-react-query-server-state-2.md:17,22` destructures `isLoading` and branches
on it. This still works in v5, but v5 redefined it:

> "a new derived `isLoading` flag has been added to the queries that is
> implemented as `isPending && isFetching`."
> — https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5

TanStack Query is at **v5** (`5.102.8`, release train 2026-08-27;
v6 exists only for Svelte Query and Vue Query Devtools —
https://api.github.com/repos/TanStack/query/releases/latest). A chapter that
teaches the v5 hook without naming `isPending`, or the `status: "loading"` →
`"pending"` rename, leaves the reader unable to read any v5 codebase or error
message. Not wrong; incomplete in a way that reads as v4.

### C-3 — `@apply` is condemned in `11-04` with no forward reference to `@utility` in `11-05`

`11-04-building-a-design-system-1.md:12`:

> "/* BAD: Do not do this. You are just writing semantic CSS again. */"

`11-05-utilities-variants-and-plugins-2-2.md:31` then puts "Same declaration in
five or more places → `@utility`" in its decision table — the legitimate,
v4-native answer to the exact need `@apply` was being reached for. `11-04` never
mentions that an alternative exists, so a reader who stops at `11-04` concludes
the only escape is a React component. One sentence in `11-04` pointing forward
fixes it.

### C-4 — Two different vanilla-extract idioms for the same thing, no explanation

- `11-06-css-modules-and-vanilla-extract-2-2-2.md:15-17` — top-level pseudo key:
  ```typescript
  ':hover': { backgroundColor: vars.color.primaryHover },
  ```
- `11-07-zero-runtime-css-in-js-2-2-1.md:14-16` — `selectors` block:
  ```ts
  selectors: { '&:hover': { background: vars.color.primaryHover } },
  ```

Both are valid vanilla-extract. Showing both, one chapter apart, for an
identically-shaped hover style, with no note, reads as an inconsistency rather
than a choice. Pick one.

Related naming split: `11-06` writes **"Vanilla Extract"** (title and body);
`11-07` writes **"vanilla-extract"** (`11-07-...-2-2-1.md:1`). The project's own
name is `vanilla-extract`. Same term, two spellings, adjacent chapters.

---

## REPEATS

### R-1 — `11-06` and `11-07` teach the same three chapters of material twice

This is the largest redundancy in the part. Overlapping content:

| Content | In `11-06` | In `11-07` |
|---|---|---|
| Why runtime CSS-in-JS lost, as 3 numbered costs | `2-2-1.md:15-18` | `1.md:22-30` |
| The RSC sentence, near-verbatim | `2-2-1.md:18` | `1.md:27-29` |
| vanilla-extract intro + `button.css.ts` sample | `2-2-2.md:1-23` | `2-2-1.md:1-28` |
| "build step extracts to static CSS, zero runtime" | `2-2-2.md:21-23` | `2-1.md:62-63` |

The RSC line is almost word-for-word:

> `11-06-...-2-2-1.md:18` — "Because Server Components never run in the browser,
> there is no runtime available to inject the `<style>` tag."
>
> `11-07-...-1.md:28-29` — "A Server Component never runs in the browser, so there
> is no runtime available to inject the `<style>` tag."

**Recommendation: `11-07` keeps it.** It is the deeper treatment (build-time vs
runtime framing, the comparison table, Panda and StyleX). `11-06` should shrink
to its unique material — the three limits of Tailwind, and CSS Modules — and end
by handing off to `11-07` rather than previewing it.

### R-2 — The "URL is the ultimate state manager" claim, three times in near-identical words

- `10-01-the-state-taxonomy-2.md:17` — "State that a user might want to bookmark,
  share with a friend, or use the 'Back' button to navigate."
- `10-01-...-2.md:20` — "**Rule:** The URL is the most powerful state manager in
  your app. Use it heavily."
- `10-04-react-router-url-state-1.md:10-12` — "If a user might want to bookmark a
  page, share the link with a friend, or use the browser's Back/Forward buttons...
  The URL is the most resilient, sharable, and globally accessible state manager
  in your application."

`10-01` is a taxonomy page and is entitled to a one-line rule. `10-04` restating
the same three-item list and the same superlative in full is the repeat. **`10-04`
should drop the restatement** and open on the mechanism instead.

### R-3 — The Tailwind scanner rule, stated twice

`11-02-tailwind-under-the-hood-2-2-1.md:16` explains it in full; `11-06-css-modules-and-vanilla-extract-1.md:7` repeats it as "(Remember: the Tailwind scanner matches static strings, it does not execute your JavaScript)". This one is **fine** — it is explicitly flagged as a callback and is load-bearing for the argument on that page. Noting it only so a later pass does not "fix" it.

---

## Gaps worth a line each (not errors)

1. **Lightning CSS is never mentioned.** `11-02` is titled "Tailwind Under the
   Hood" and describes the engine, but omits that v4 bundles Lightning CSS.
   Direct from the release post: "we bundle `@import` rules for you out of the
   box, and use **Lightning CSS** under the hood for vendor prefixing and modern
   syntax transforms" (https://tailwindcss.com/blog/tailwindcss-v4). For a
   chapter whose whole job is the pipeline, this is the missing half.

2. **`11-02-...-2-2-1.md:5` — "It starts at the project root".** The docs say
   "Tailwind uses **the current working directory** as its starting point"
   (https://tailwindcss.com/docs/detecting-classes-in-source-files). The same
   sentence lists three exclusions; the docs list five — **CSS files** and
   **package manager lock files** are also skipped. Small, but this is the
   paragraph readers debug against.

3. **`@variant` exists in v4 and is not the same as `@custom-variant`.** The book
   uses `@custom-variant` correctly everywhere (`11-02-...-2-2-2-2.md:13`,
   `11-05-...-2-1.md:30,31,41`). It never mentions `@variant`, which applies an
   existing variant *inside* a custom CSS block
   (https://tailwindcss.com/docs/functions-and-directives). Not an error — a
   plausible one-line addition given `11-05`'s subject.

4. **shadcn/ui star count is stale.** `11-04-building-a-design-system-2-2-2.md:18`
   says "crossed **75,000** GitHub stars". Current `stargazers_count` is
   **123,059** (https://api.github.com/repos/shadcn-ui/ui). "Crossed 75,000" is
   technically still true and so is not filed as WRONG, but it reads as a current
   figure and understates by 40%. Star counts rot; consider cutting the number.

---

## Checked and correct

**31 claims verified clean**, concentrated in the Tailwind chapters:

- `11-02-...-2-1.md` — all three install commands (`@tailwindcss/vite`,
  `@tailwindcss/postcss`, `@tailwindcss/cli`), the `@import "tailwindcss"` entry
  point replacing the three `@tailwind` directives. *(upgrade guide)*
- `11-02-...-2-2-1.md` — automatic content detection replacing the `content`
  array; `.gitignore` / `node_modules` / binaries skipped; `@source "..."`;
  `@source inline("...")` as the `safelist` replacement; the
  `bg-${color}-500` failure and the complete-string rule. *(detecting-classes docs)*
- `11-02-...-2-2-2-1.md` — the browser floor, exactly: **"Targets Safari 16.4+,
  Chrome 111+, and Firefox 128+"**, and the `@property` / `color-mix()`
  dependency. *(upgrade guide)*
- `11-02-...-2-2-2-2.md` — the whole v3→v4 table except the `@custom-variant` row
  wording: config → `@theme`, content → automatic + `@source`, PostCSS plugin
  rename, Vite plugin, CLI rename, `@layer utilities` → `@utility`,
  `addVariant` → `@custom-variant`, `plugins: []` → `@plugin`,
  `safelist` → `@source inline()`, `!flex` → `flex!`, `resolveConfig()` removed,
  browser floor. *(upgrade guide)*
- `11-02-...-1.md:57` — v4 build-speed characterisation. Blog: full build
  378ms → 100ms, incremental with no new CSS 35ms → **192µs**. "Microseconds" is
  accurate.
- `11-03-...-1.md` — `@theme` emitting utilities *and* `:root` custom properties;
  `@theme` vs `:root` distinction; **`@theme` must be top level, cannot be
  nested**. *(theme docs)*
- `11-03-...-2-1.md` — every namespace row in the table matches the docs
  (`--color-*`, `--font-*`, `--text-*`, `--font-weight-*`, `--tracking-*`,
  `--leading-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--breakpoint-*`,
  `--container-*`, `--animate-*`, `--ease-*`). Presented as a subset, which it
  correctly is.
- `11-03-...-2-2-1.md` — extend-by-adding, override-by-reusing-a-name,
  `--color-*: initial` to wipe a namespace, `--*: initial` to wipe everything.
  The `--breakpoint-sm: 30rem` example matches the docs' own example.
- `11-03-...-2-2-2-2.md` — `@theme inline` and why (`var()` resolves where the
  property is **defined**, not where used, so fallbacks fire early — the docs'
  `--font-inter` / `next/font` example is the same case); `@config` as the legacy
  bridge; `corePlugins`, `safelist`, `separator`, `resolveConfig()` all confirmed
  removed.
- `11-05-...-2-2.md` — `@plugin "@tailwindcss/typography"` load syntax; the
  `flex!` important-modifier move.
- `11-04-...-2-2-2.md` — **Base UI** "from the Material UI and Radix teams" is
  exact. GitHub description: "Unstyled UI components... **From the creators of
  Radix, Floating UI, and Material UI.**"
  (https://api.github.com/repos/mui/base-ui)
- `10-02` — Zustand v5.0.15 current; `create` import and store shape valid.
- `10-04-...-2.md:12` — `import { useSearchParams } from "react-router"` is the
  **correct current import**. React Router is at **v8.3.1** (2026-08-28), and v8
  removes the `react-router-dom` re-export entirely — the book already teaches
  the post-v7 package name. No Remix reference anywhere in the chapter, so the
  sibling audit's Remix-v3 finding does not apply here.
- `10-03-...-2.md:33` — default retry is **3, with exponential backoff**.
  *(important-defaults)*
- `11-06` / `11-07` library health — **no sunset library cited.** All three are
  actively maintained as of this week:
  - `vanilla-extract` — latest release 2026-08-27, no deprecation notice
  - **Panda CSS** — 6,181 stars, not archived, last push **2026-09-04**
  - **StyleX** — 10,142 stars, not archived, last push **2026-09-05**

---

## Verdict

The Tailwind block — the largest and highest-risk part of this assignment — is in
good shape. Twenty of the twenty-five Tailwind-4 API claims checked came back
clean, including the browser floor, the whole v3→v4 migration table, the theme
namespaces, and the `@theme` / `@source` / `@utility` / `@custom-variant`
directive set. Someone wrote these chapters against the real v4 docs.

The damage is concentrated elsewhere. **The npm download figures in `11-07` are
wrong by roughly 10x and wrong in direction for styled-components (W-1)** — that
section is currently the least trustworthy page in the part and should be cut or
re-sourced before anything else. **The Apollo sample does not run on the current
major (W-2).** Two Tailwind items need correction: the `--value()` example is
syntactically invalid and points at the wrong namespace (W-4), and the engine is
named after a codename the project's own release post never uses, with the Rust
rewrite overstated in a way that contradicts the page's own diagram (W-5). The
"CSS never grows" claim in `11-01` is contradicted by two later chapters (W-3).

On consistency, the one structural problem is `11-06` and `11-07`: they teach
runtime CSS-in-JS's three failure modes and vanilla-extract twice, one chapter
apart, with near-verbatim sentences and two competing code idioms (R-1, C-4).
`11-06` should be cut back to Tailwind's limits and CSS Modules. `10-03` needs
`staleTime`, `gcTime` and `isPending` in prose — right now two v5-specific option
names appear only as labels inside an SVG (C-1, C-2).
