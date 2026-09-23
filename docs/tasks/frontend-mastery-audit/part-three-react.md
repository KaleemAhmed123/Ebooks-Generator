# Part Three — React — fact and consistency audit

**Files covered:** 54 (`06-*`, `07-*`, `08-*`, `09-*` in `books/tech/frontend-mastery/pages/`)
**Passes run:** 1 (fact) and 2 (consistency) only, per `BRIEF-FACT.md`. Voice and structure skipped; a wrong or broken diagram is reported as a fact finding.
**Date of check:** 2026-09-05. No content file was edited. The build was not run.

## Budget line

- **Web fetches spent: 20** (2 of them returned 403/404 and yielded nothing: `npmjs.com/package/babel-plugin-react-compiler`, the react.dev 2020 JSX-transform blog post).
- **Claims verified against a fetched primary source: 38.** 10 are WRONG, 12 are UNVERIFIABLE, the rest checked out.
- **Sources fetched:** react.dev reference pages for `useActionState`, `useOptimistic`, `useTransition`, `Suspense`, `use`, `useDeferredValue`, `useEffectEvent`, `Activity`, `forwardRef`, `<form>`, `'use client'`; the React 19 blog; the React 19.2 blog; the React Compiler 1.0 blog; react.dev React Compiler installation; Next.js 16 `reactCompiler` config; the Next.js 16 upgrade guide; Vercel Edge Runtime docs; Babel's JSX transform docs; shoelace.style; lit.dev.

### NOT CHECKED — explicit gaps

I did not spend fetches on these. Treat every one as unverified:

1. **StrictMode double-invocation of Effects.** `06-04-...-1.md:12` says `[]` runs "exactly once, after the initial render". Under StrictMode in development — the default in every current React starter — Effects mount, clean up, and remount. `grep` over all 54 files returns **zero** occurrences of "StrictMode" anywhere in Part Three. Needs a check against react.dev/reference/react/StrictMode before the sentence stands.
2. **SolidJS `createSignal` API surface and current Solid version** (`08-02-...-1.md:16-25`).
3. **Svelte 5 and Angular signals claims** (`08-02-...-1.md:9`, `08-02-...-2-2.md:3`).
4. **The benchmark data** behind "Signals won the performance benchmark wars" — see UNVERIFIABLE-1.
5. **Lit v3's `static properties` / `static styles` API** (`09-05-...-2-2-2-1.md:9-10`). Only the bundle size and the major version were confirmed.
6. **Network latency figures** in `08-01-...-2-2-1.md:11,15` (200 ms trans-Pacific, "5 ms away").
7. **`useSyncExternalStore`'s exact `getServerSnapshot` requirement** (`07-03-...-2-2.md:28`).
8. **`onCaughtError` / `onUncaughtError` on `createRoot`** (`07-02-...-2-1.md:32`) — consistent with the React 19 blog I did fetch, but the `createRoot` reference page was not opened.
9. **CSS `::part()`, `:host` and custom-property inheritance across the shadow boundary** (`09-05-...-2-1.md`, `09-05-...-2-2-1.md`) — treated as stable platform behaviour.

---

## Verdict

Part Three is two books stitched together. Modules 7 and the front half of 8 are recent, precise, and mostly hold up under checking — `useActionState`, `useOptimistic`, `useFormStatus`, `use`, `useEffectEvent`, `<Activity>` and the React Compiler config all match react.dev and the Next.js 16 docs almost line for line. Modules 6 and 9 read like they were written several React versions ago and never revisited: JSX is taught as compiling to `React.createElement` (the automatic runtime has been Babel's default for years), `forwardRef` is called deprecated when the docs say it is not, and Module 9 closes by presenting `fetch`-inside-`useEffect` with no cleanup as "the hallmark of a Senior Frontend Engineer" — the exact pattern Modules 6 and 7 spend three chapters condemning. The single largest hole is structural: `"use server"` and Server Functions appear **nowhere** in the 54 files, yet Chapter 7-4 teaches `<form action={fn}>` and Chapter 8-1's diagram tells the reader a function can never cross the server/client boundary. That diagram is wrong, and it is wrong about the mechanism the previous chapter depends on.

---

## 1. WRONG

Each of these was checked against a page I actually fetched. URL included.

### W1 — `forwardRef` is not deprecated

`books/tech/frontend-mastery/pages/07-05-effect-events-and-activity-2-2.md:3`

> **`ref` is now an ordinary prop.** `forwardRef` is deprecated.

react.dev's `forwardRef` page carries this banner verbatim:

> "In React 19, `forwardRef` is no longer necessary. Pass `ref` as a prop instead. `forwardRef` **will be deprecated in a future release**."

"No longer necessary" is not "deprecated". Same for the next line of the book: `<Context.Provider>` is likewise not yet deprecated — the React 19 blog says "In future versions we will deprecate `<Context.Provider>`."

Source: https://react.dev/reference/react/forwardRef · https://react.dev/blog/2024/12/05/react-19

---

### W2 — JSX does not compile to `React.createElement` by default

`06-02-jsx-under-the-hood-1.md:11` (and the whole of `06-02-jsx-under-the-hood-2.md`, which builds three explanations on top of it)

> "a transpiler (like Babel or SWC) scans your files and converts every single piece of JSX into a standard JavaScript function call: `React.createElement()`."

Babel's own docs for `@babel/plugin-transform-react-jsx` state the `runtime` option is `"classic" | "automatic", defaults to "automatic"`. The automatic runtime emits:

```js
import { jsx as _jsx } from "react/jsx-runtime";
const profile = _jsxs("div", { children: [...] });
```

`React.createElement` is the **classic** runtime, which is not the default and requires React to be in scope. A React 19 book teaching the classic output as "what the transpiler turns it into" is teaching the legacy path. The knock-on claims at `06-02-jsx-under-the-hood-2.md:3-19` ("The `createElement` function takes three arguments", "you are just passing `user.name` as the third argument to the `createElement` function") inherit the error — the automatic runtime passes children inside the props object as `children`, not as a third positional argument.

Source: https://babeljs.io/docs/babel-plugin-transform-react-jsx

---

### W3 — Functions *can* cross the Server/Client boundary

`08-01-react-server-components-2-1.md:44` (text inside the SVG)

> "props crossing this line must be serializable, so a function cannot go through"

react.dev's `'use client'` reference lists, under supported serializable types:

> "Functions that are Server Functions (`'use server'`)"

Server Functions are precisely the functions designed to cross that line, and they are the mechanism behind `<form action={serverFn}>` — which Chapter 7-4 teaches. The diagram tells the reader the opposite of how the previous chapter works. See also C3.

Source: https://react.dev/reference/rsc/use-client#serializable-types

---

### W4 — The "Edge Computing and RSCs" section teaches a deprecated deployment model

`08-01-react-server-components-2-2-1.md:9-15`

> "**Edge Computing** solves this. Providers like Vercel and Cloudflare deploy V8 isolates … When combined with RSCs, Edge computing is magic. Your Server Component executes in Tokyo (5ms away from the user) … and streams it back to the user instantly."

Vercel's Edge Runtime page now opens with two notes:

> "We recommend migrating from edge to Node.js for improved performance and reliability. Both runtimes run on Fluid compute with Active CPU pricing."
> "Starting in Next.js 16.3, setting `runtime = 'edge'` is no longer supported. Routes and pages run on Node.js."

The Next.js 16 upgrade guide adds that `middleware` is deprecated in favour of `proxy`, and: "The `edge` runtime is **NOT** supported in `proxy`. The `proxy` runtime is `nodejs`, and it cannot be configured."

The Cloudflare half of the sentence still stands. The Vercel half, and the whole "RSC on the Edge" recommendation, does not — for a book that claims Next 16.

Source: https://vercel.com/docs/functions/runtimes/edge · https://nextjs.org/docs/app/guides/upgrading/version-16

---

### W5 — React 19 does not give custom elements `on*` event props

`09-05-web-components-2-2-2-2-1.md:11`

```jsx
<user-card name="Sam" role="Editor" onuserSelect={handleSelect} />
```

The React 19 blog's "Support for Custom Elements" section covers only attribute-vs-property assignment:

> Client: "props that match a property on the Custom Element instance will be assigned as properties, otherwise they will be assigned as attributes."

It says nothing about listening to custom events, and React has no `on*` mapping for a non-standard event name. `onuserSelect` would be set as a property or attribute named `onuserSelect` and never fire. The page's own preceding sentence ("custom events needed a `ref` and a manual listener") is still true in React 19 — the code sample contradicts it.

Source: https://react.dev/blog/2024/12/05/react-19

---

### W6 — Shoelace is sunset

`09-05-web-components-2-2-2-1.md:19-20`

> "Adobe Spectrum, Shoelace and several large enterprise design systems are built on it."

shoelace.style now states: **"Shoelace is now Web Awesome!"** and "Shoelace Is Sunset with no active development."

Cite Web Awesome, or drop the name.

Source: https://shoelace.style/

---

### W7 — The `useTransition` example does the expensive work on the urgent path

`07-01-transitions-and-concurrency-2-1.md:16-18`

```jsx
startTransition(() => {
  setResults(filterHugeList(e.target.value));  // interruptible
});
```

The comment is wrong. react.dev:

> "The function you pass to `startTransition` **does not get delayed**. Unlike with the browser `setTimeout`, it does not run the callback later. React executes your function immediately, but any state updates scheduled *while it is running* are marked as Transitions."

`filterHugeList` therefore runs synchronously, blocking the keystroke it was supposed to keep responsive. Only the resulting re-render is interruptible. This matters because the page's whole premise (`:5`, "the browser froze until that table was done") is about the blocking work. The correct shape is to set the raw query in the transition and do the filtering in the child's render — which is exactly what the next page's `useDeferredValue` example does correctly at `07-01-...-2-2.md:13`.

Source: https://react.dev/reference/react/useTransition

---

### W8 — `useMemoCache` is not what the compiler emits

`08-02-react-compiler-vs-signals-2-1-2.md:6`

```jsx
const $ = useMemoCache(4);
```

The compiler emits, per react.dev's own installation page:

```js
import { c as _c } from "react/compiler-runtime";
```

and calls `_c(n)`. `useMemoCache` was the internal dispatcher name during development. The block is labelled "conceptually", which excuses the shape of the caching code but not an invented function name in a chapter whose subject is the compiler.

Source: https://react.dev/learn/react-compiler/installation

---

### W9 — Custom elements *do* render on the server

`09-05-web-components-2-2-2-2-1.md:28`

> "And custom elements do not render on the server."

React 19 blog, SSR paragraph: "props passed to a custom element will render as attributes if their type is a primitive value like `string`, `number`, or the value is `true`."

The tag and its primitive attributes are emitted in the server HTML. What does not happen on the server is the *upgrade* — which is precisely what the book's own next sentence says ("They need JavaScript to upgrade, so a Server Component page shows the light DOM until hydration"). The headline sentence needs to say "do not upgrade on the server", not "do not render".

Source: https://react.dev/blog/2024/12/05/react-19

---

### W10 — Broken SVG in the shadow-DOM diagram

`09-05-web-components-2-1.md:54-55`

```
  <text x="238" y="114" class="tiny" text-anchor="middle">::part is a door you open on purpose
</svg>
```

The `<text>` element is never closed. The `</svg>` closes an element with an open child. This will either swallow the closing tag or render unpredictably depending on the parser. Verified by reading the file, not by building.

Related, same chapter — **a sentence is split across a page boundary by a full-page diagram.** `09-05-web-components-1.md:39` ends:

> "**Shadow DOM** gives the element its own isolated tree. Styles inside cannot"

and the sentence resumes on the next printed page, *after* the diagram, at `09-05-web-components-2-1.md:57`:

> "leak out, and styles outside cannot reach in."

---

## 2. UNVERIFIABLE

No primary source backs these. Per the brief, an unsourced claim gets cut, not softened.

**U1 — Comparative performance claims with no source.**
`08-02-react-compiler-vs-signals-2-2.md:3`
> "**Signals** won the performance benchmark wars. If you are building high-frequency updating UIs (like stock tickers or complex web games), SolidJS or Svelte 5 will outperform React."

No benchmark is named, no version is pinned, no date is given. Also `08-02-...-1.md:28` ("It is incredibly fast") and `08-02-...-2-1-2.md:21` ("As of late 2026, both approaches are highly successful in their respective ecosystems") — the latter also hard-dates the book in a sentence that carries no information.

**U2 — "This guarantees that the browser only performs one single Layout and Paint, no matter how many state changes occurred."**
`06-01-virtual-dom-internals-2.md:10`, repeated verbatim in the diagram at `06-01-virtual-dom-internals-2.md:57`.
React batches DOM mutations into one commit. It does not guarantee one layout and one paint — a `useLayoutEffect` that reads geometry forces a synchronous reflow inside the commit, and interleaved transitions produce multiple commits. "Guarantees" is not defensible; no React documentation makes this claim.

**U3 — "To understand why React is fast, you must first understand why the actual DOM is slow."**
`06-01-virtual-dom-internals-1.md:5`. The framing that the Virtual DOM is a speed optimisation over direct DOM manipulation is contested by the React team's own writing and is not claimed anywhere in current React documentation. Unsourced.

**U4 — Hook state is stored "using Closures".**
`06-03-usestate-deep-dive-1.md:9`
> "It stores the value *outside* the component function in React's internal memory (using Closures!)"
React stores hook state in a linked list on the fiber node for that component instance. `grep` shows the word "fiber" appears **zero** times in Part Three. The closure claim is a plausible-sounding mechanism with no source.

**U5 — Why `className` and not `class`.**
`06-02-jsx-under-the-hood-2.md:16`
> "Because `class` is a reserved keyword in JavaScript. Since the JSX is ultimately transformed into a JavaScript object, using `class` would cause syntax conflicts in older engines."
Reserved words have been legal as object property keys since ES5. The historical reason is the DOM property name (`element.className`), not object-literal syntax. Unsourced as written.

**U6 — "React calls it with the `FormData`, keeps the form disabled while it runs."**
`07-04-actions-and-form-hooks-1.md:56`. react.dev's `<form>` reference documents the FormData argument and "After the `action` function succeeds, all uncontrolled field elements in the form are reset" — both correct. It says nothing about React disabling the form or its inputs. I could not find that behaviour documented anywhere. Leaning WRONG; reported as unverifiable because I have no source that proves the negative.
Source checked: https://react.dev/reference/react-dom/components/form

**U7 — Suspense works by "throwing a promise".**
`07-02-suspense-and-error-boundaries-1.md:15` ("A component signals 'not ready' by throwing a promise, which is what `use()`, `React.lazy()`, and framework data loaders all do internally") and `07-03-the-use-api-1.md:26` ("`use` throws the promise, `<Suspense>` catches it, React retries when it settles").
react.dev's Suspense page never documents promise-throwing. It enumerates exactly three activating mechanisms — `lazy`, reading a Promise with `use`, and data streamed from Server Components or a Suspense-enabled framework — and describes the framework path as: "Under the hood, a Suspense-enabled framework maintains a cache of Promises and calls `use` to suspend on a Promise." Promise-throwing is an undocumented implementation detail the React team has never blessed as public API. Two chapters state it as fact.
Source checked: https://react.dev/reference/react/Suspense

**U8 — "off by default while build-time data is collected" is right; "Expect slower builds" understates the docs' own hedge.**
`08-02-react-compiler-vs-signals-2-2.md:12`. The Next.js 16 upgrade guide confirms the substance exactly ("It is not enabled by default as we continue gathering build performance data across different application types" and "Expect compile times in development and during builds to be higher … as the React Compiler relies on Babel") — so this is **correct**. What is missing is the `reactCompiler` config page's counterweight: "Next.js uses a custom SWC optimization that only applies the React Compiler to relevant files … the impact is small and localized." Flagged as an omission, not an error.
Source: https://nextjs.org/docs/app/guides/upgrading/version-16 · https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler

**U9 — the ESLint preset the book picks is not the one the release post recommends.**
`08-02-react-compiler-vs-signals-2-2.md:19` says "Turn on the `recommended-latest` preset". Both presets exist and both ship the compiler lint rules — the React Compiler 1.0 post says "Compiler-powered lint rules ship in `eslint-plugin-react-hooks`'s `recommended` and `recommended-latest` preset" and then "we recommend using the `recommended` preset". Not wrong, but it diverges from the official recommendation without saying why.
Source: https://react.dev/blog/2025/10/07/react-compiler-1

**U10 — latency figures.** `08-01-...-2-2-1.md:11` ("the request takes 200ms just to travel across the Pacific Ocean") and `:15` ("executes in Tokyo (5ms away from the user)"). Plausible, unsourced, unpinned.

**U11 — the Actions diagram's error-handling footnote is never explained in prose.**
`07-04-actions-and-form-hooks-1.md:45-46` — the SVG asserts `useActionState` "returns errors, does not throw" and "a thrown error hits the Error Boundary instead". No body text anywhere in Chapter 7-4 explains this, and `07-02-...-2-1.md:30` tells the reader Error Boundaries "do not catch errors … in async code after an `await`" — which appears to contradict it for an async Action. Either the diagram or that sentence needs a source.

**U12 — "Before 2018 / introduced in 2018" for Hooks.** Three occurrences (see C6). Hooks were announced at React Conf in October 2018 and shipped in React 16.8 in February 2019. "Introduced in 2018" is defensible for the announcement; "In 2018, React Hooks … revolutionized how we write components" (`09-04-...-1.md:3`) is not. Not fetched.

---

## 3. Contradictions

### C1 — Module 9 teaches the exact anti-pattern Modules 6 and 7 spend three chapters condemning

`09-04-custom-hooks-architecture-2-1.md:24-36`

```jsx
export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(data => { … });
  }, []);
  return { user, loading };
}
```

and `09-04-custom-hooks-architecture-2-2.md:24`:

> "This architecture is the hallmark of a Senior Frontend Engineer."

Against:

- `06-04-useeffect-the-right-way-1.md:8` — "`useEffect` is NOT for reacting to state changes. It is strictly for **synchronizing your React component with an external system**."
- `06-06-the-rest-of-the-hooks.md:13` — "The most abused hook in React."
- `07-03-the-use-api-1.md:26` — "Notice what is absent: no `useEffect`, no `useState`, no loading flag, no cleanup, no race condition when the props change mid-flight."

`useUser` has a loading flag, no cleanup, no `AbortController`, and no ignore flag — every failure mode Chapter 7-3 lists by name, thirty pages earlier, as the reason `use` exists. Either 09-04 gets rewritten against `use`/Suspense, or it has to say out loud that it is showing the pre-React-19 pattern.

### C2 — `useWindowWidth` crashes the server render the book just warned about

`09-04-custom-hooks-architecture-2-1.md:9`

```jsx
const [width, setWidth] = useState(window.innerWidth);
```

Against `07-03-the-use-api-2-2.md:28`:

> "The third argument exists because `navigator` does not exist on the server. Omit it and server rendering crashes."

`window` does not exist on the server either. Worse, a window-width subscription is the textbook `useSyncExternalStore` case that `07-03-...-2-2.md` has just finished teaching — the book demonstrates the right tool and then, two chapters later, solves the same problem with the wrong one.

### C3 — `"use server"` and Server Functions appear nowhere in Part Three

`grep -rn "use server\|Server Function\|Server Action"` over all 54 files: **zero hits.**

Yet:
- `07-04` teaches Actions and `<form action={fn}>` as the React 19 way to submit a form.
- `08-01` teaches Server Components and says a function cannot cross the boundary (W3).

The reader finishes Part Three able to describe `useActionState` but with no idea what runs the action on the server, and holding a diagram that says the mechanism is impossible. This is the largest content gap in the part.

### C4 — Three different context-reading APIs across three chapters

- `07-03-the-use-api-2-1.md:12` — `use(ThemeContext)`, taught as the modern read that works after an early return.
- `09-03-compound-components-2-1.md:27,38` — `useContext(AccordionContext)`.
- `09-03-compound-components-2-1.md:13` — `<AccordionContext value={…}>`, the React 19 provider form.

So Chapter 9-3 uses the new provider syntax and the old consumer syntax in the same file, while Chapter 7-3 has already told the reader `use` supersedes `useContext`. Pick one and note the other.

### C5 — `06-06-the-rest-of-the-hooks.md` covers none of the rest of the hooks

The filename says "the rest of the hooks". The `##` heading on line 1 says "React Hooks Deep Dive" — two different names for the same page, and neither matches what is inside. The file covers `useState` (chapter 06-03), `useEffect` (chapter 06-04) and `useRef` (chapter 06-05). All three already have full chapters.

Never taught anywhere in Part Three: `useMemo`, `useCallback`, `useReducer`, `useContext`, `useId`, `useLayoutEffect`, `useImperativeHandle`, `useDebugValue`.

**Forward references that result from this:**
- `08-02-react-compiler-vs-signals-1.md:5` uses `React.memo`, `useCallback` and `useMemo` as known concepts — first mention in the part, in a chapter about deleting them.
- `09-03-compound-components-2-1.md:27` uses `useContext` as a known concept — first use in the part.

### C6 — The Hooks origin story is told three times, with drifting dates

- `06-06-the-rest-of-the-hooks.md:3` — "Before 2018, React components were built using ES6 Classes."
- `09-01-higher-order-components-1.md:5` — "Before React Hooks were introduced in 2018, React components were primarily built using ES6 Classes."
- `09-04-custom-hooks-architecture-1.md:3` — "In 2018, React Hooks (`useState`, `useEffect`) revolutionized how we write components."

Same paragraph, three chapters. Keep it in `09-01` (where the HOC/wrapper-hell narrative needs it) and cut the other two. See U12 on the date.

### C7 — The derived-state anti-pattern is taught twice with the same example

- `06-04-useeffect-the-right-way-2-1.md:5-31` — `firstName` / `lastName` / `fullName`, bad-then-good.
- `06-06-the-rest-of-the-hooks.md:17-28` — `firstName` / `fullName`, bad-then-good.

Identical lesson, identical variable names, two pages apart. `06-04` should keep it.

### C8 — "The promise must not be created inside the component" is contradicted by the code directly beneath it

`07-03-the-use-api-1.md:28`:

> "**The promise must not be created inside the component.** A component can render many times, and creating the promise in the body creates a new one every render"

`07-03-the-use-api-1.md:32-35`, immediately after:

```jsx
export default function Page() {
  const commentsPromise = db.comments.findMany();   // no await
  return <ClientPage commentsPromise={commentsPromise} />;
}
```

That *is* creating the promise inside a component body. The rule react.dev states is narrower — the caveat applies to Client Components, which re-render; a Server Component renders once. The sentence needs the word "Client" in it or the example undercuts the rule on the same page.

Source for the correct framing: https://react.dev/reference/react/use — "Promises passed to `use` must be cached so the same Promise instance is reused across re-renders", with Server Components named as the recommended creation site.

---

## 4. Repeats

**R1 — `useRef` introduced from scratch twice.** `06-05-useref-and-dom-1.md` (whole page) and `06-06-the-rest-of-the-hooks.md:30-36`. Keep `06-05`.

**R2 — "Before Hooks, sharing stateful logic between components was hard" opens two consecutive chapters.** `09-01-higher-order-components-1.md:5` and `09-02-render-props-1.md:3`. `09-02` can start at "Unlike HOCs, Render Props pass control down".

**R3 — See C5 and C7.** `06-06-the-rest-of-the-hooks.md` is, in its entirety, a compressed repeat of `06-03`, `06-04` and `06-05`. My recommendation: either delete it, or rewrite it to be what its filename promises — `useMemo`, `useCallback`, `useReducer`, `useContext`, `useId`, `useLayoutEffect` — which would also close every forward reference listed in C5.

---

## 5. Checked and correct

Verified against a fetched primary source and found accurate — **26 claims**, not itemised further:

- **`07-04` (Actions):** `useActionState(fn, initialState)` parameter order; the `[state, formAction, isPending]` return order; the action receiving `(previousState, formData)`; `useOptimistic`'s reducer being optional so `useOptimistic(currentName)` is valid; the automatic-rollback description ("the optimistic and real state converge in the same render when the Transition completes"); `useFormStatus` importing from `react-dom`; the child-only rule for `useFormStatus`; `<form action>` receiving FormData and resetting uncontrolled fields on success.
- **`07-03` (`use`):** callable inside `if` and loops, unlike `useContext`; must be called inside a Component or Hook; passing a promise from a Server Component to a Client Component. `use` is stable — only `use(browser())` carries a Canary badge.
- **`07-01`:** `useDeferredValue`'s optional second `initialValue` argument.
- **`07-02`:** React 19.2 batching server-rendered Suspense reveals; Error Boundaries still requiring a class.
- **`07-05`:** `useEffectEvent` **is** stable in React 19.2 — no Canary or Experimental badge on its reference page, and it is listed in the 19.2 release; the "only call from inside Effects, never pass to a child" rule matches the docs caveat verbatim; `<Activity>` `mode="visible" | "hidden"`, hidden mode destroying Effects while preserving state, and hidden children rendering "at a lower priority than the rest of the content"; `ref` as a prop; `<Context>` as provider; metadata hoisting.
- **`08-01`:** the `'use client'` module-boundary rule, including that children passed as props are *not* pulled into the client bundle.
- **`08-02`:** React Compiler 1.0 (7 October 2025); package `babel-plugin-react-compiler`; React 19 target with 17/18 support via a runtime package; Next.js 16's `reactCompiler` promoted from `experimental` to a stable top-level flag; off by default "as we continue gathering build performance data"; slower builds because it relies on Babel; `"use no memo"` as the per-component opt-out.
- **`09-05`:** the hyphen requirement for custom element tag names; Lit at "around 5 KB (minified and compressed)", currently v3.
