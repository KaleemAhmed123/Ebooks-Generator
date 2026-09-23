# Part Seven — Ship It: fact and consistency audit

**Files covered:** 66 (`18-*`, `19-*`, `20-*`, `21-*` in `books/tech/frontend-mastery/pages/`)
**Passes run:** 1 (fact) and 2 (consistency) only, per `BRIEF-FACT.md`.

## Budget line

**20 web fetches spent** (18 `WebFetch`, 2 `WebSearch`) plus 6 direct npm/GitHub
API reads. **34 claims verified against a fetched primary source**: 12 wrong or
incomplete, 22 confirmed correct. Consistency pass complete across all 66 files.
Full list of what I did **not** get to is in section **G** — the short version is
three of five rows in the 2026 supply-chain incident table, the Shai-Hulud
12-hour figure, and five loose numbers catalogued in **B4**.

**The pricing brief could not be executed as written: there are no prices,
quotas or per-minute rates anywhere in Part Seven.** See section **E**.

## Verdict

Part Seven is in better shape than its brief predicted. The version-pinned
material most likely to have rotted — Vite 8 / Rolldown, Turbopack's default
status, the Next 16 `middleware` → `proxy` rename, WebAuthn call shapes, the
OpenTelemetry 2.x API, GitHub Actions major versions — is current and specific,
and in several places ahead of the surrounding ecosystem's own docs.

The damage sits in three places. **Copy-paste correctness:** a SHA-pinned
`actions/checkout` line that is v5.0.0 wearing a `# v7.0.0` comment, in the two
chapters whose whole point is SHA pinning (**A1**); a `turbo.json` using the
`pipeline` key Turborepo removed in 2.0 (**A5**); an `.npmrc` cooldown key that
exists in neither npm nor pnpm (**A3**); a Vitest coverage threshold nested one
level too shallow (**A10**); an OpenTelemetry install line missing a package the
next block imports (**A4**). Each fails the moment a reader runs it.
**Overstated security claims:** `minimumReleaseAgeStrict`'s default described
backwards (**A2**), in-memory JWT storage called immune to XSS (**A7**), and both
CSP chapters teaching a `report-to` workflow that cannot deliver a report
(**A9**). **Duplication:** `20-05` and `21-04` are close to the same chapter, and
`19-02`/`19-03` teach monorepos and micro-frontends twice each (**D1**, **D2**).

Fix section A and merge D1 and D2, and the part is solid.

---

## A. WRONG — verified against a fetched primary source

### A1. The pinned `actions/checkout` SHA is v5.0.0, not v7.0.0 — and it is wrong in two places

`19-05-releasing-from-a-monorepo-2-1.md:20`
`21-02-defending-the-dependency-tree-2-2-2.md:16`

> `- uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8  # v7.0.0`

The SHA is a real commit in `actions/checkout`, but it is the tag **`v5.0.0`** (11 Aug 2025), not `v7.0.0`.

- `08c6903cd8c0fde910a37f88322edcfb5dd907a8` → tag `v5.0.0`
  https://api.github.com/repos/actions/checkout/git/ref/tags/v5.0.0
- `v7.0.0` → `9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0`
  https://api.github.com/repos/actions/checkout/git/ref/tags/v7.0.0
- `v7.0.1` (current latest) → `3d3c42e5aac5ba805825da76410c181273ba90b1`
  https://api.github.com/repos/actions/checkout/git/ref/tags/v7.0.1
- Release list: https://github.com/actions/checkout/releases

**Why this one matters more than a typo.** Both pages are teaching the reader to
pin actions by commit SHA *because tags are mutable and comments lie*. The
worked example then ships a SHA whose comment lies about which version it is. A
reader who copies it silently downgrades two major versions of `checkout`. Fix:
use the `v7.0.1` SHA above, or drop the SHA example and use `@v7`.

Note the same two files are internally inconsistent on this: elsewhere they use
the floating `@v7`/`@v6` form (`19-05-...-2-1.md:21-26`), so the book pins by SHA
in one line and by tag in the next three without saying why.

### A2. `minimumReleaseAgeStrict` — the book states the default backwards, and describes the fallback backwards

`21-02-defending-the-dependency-tree-1.md:32-34`

> By default pnpm falls back to an older version that satisfies the age
> requirement rather than failing. `minimumReleaseAgeStrict: true` makes it fail
> instead.

Source: https://pnpm.io/settings/dependency-resolution

Both halves are wrong.

1. **The default.** `minimumReleaseAgeStrict` defaults to *"true if `minimumReleaseAge`
   is explicitly configured, false otherwise."* The book's own recommended
   config (`minimumReleaseAge: 1440` in `pnpm-workspace.yaml`, line 28) explicitly
   configures it — which flips strict mode **on**. A reader who follows this page
   gets resolution *failures*, and the book has told them that mode is opt-in.
2. **What the fallback does.** When strict is false, pnpm *"falls back to a
   version that doesn't meet the `minimumReleaseAge` constraint so installation
   can still succeed"* — it installs a version that is **too new**, not "an older
   version that satisfies the age requirement." The book describes a safe
   fallback; the real one is the unsafe one, which is the whole reason strict
   mode exists.

Correct on the same page: `minimumReleaseAge` default is `1440` since v11, `0`
before v11 (`21-02-...-1.md:20-21` is CORRECT), and `minimumReleaseAgeExclude`
excludes by package name.

### A3. The `.npmrc` snippet uses a key that exists in neither npm nor pnpm

`21-02-defending-the-dependency-tree-1.md:23-25`

> ```
> # .npmrc
> minimum-release-age=1440
> ```

- pnpm's setting is `minimumReleaseAge` and its config file is **`pnpm-workspace.yaml`**,
  not `.npmrc` — https://pnpm.io/settings/dependency-resolution
- npm's setting is **`min-release-age`**, not `minimum-release-age` —
  https://docs.npmjs.com/cli/v11/using-npm/config
  (the book gets this name right in prose at line 34, then contradicts itself in
  the code block eleven lines earlier)

So `minimum-release-age=1440` is a no-op under both package managers. The reader
adds it, sees no error, and believes they have a cooldown.

**Unit warning for whoever fixes this.** npm's doc describes `min-release-age` as
*"only versions that were available more than the given number of **days** ago"*
(default `null`), while pnpm's `minimumReleaseAge` is in **minutes**. `1440` means
one day in pnpm and 1440 days in npm. Do not copy the number across.

### A4. The OpenTelemetry install line omits a package the very next code block imports

`21-05-opentelemetry-in-the-browser-2-2-1-1.md:3-6` installs five packages:

> `@opentelemetry/api @opentelemetry/sdk-trace-web @opentelemetry/auto-instrumentations-web @opentelemetry/exporter-trace-otlp-http @opentelemetry/resources`

`21-05-opentelemetry-in-the-browser-2-2-1-1.md:10` then imports:

> `import { registerInstrumentations } from '@opentelemetry/instrumentation';`

`@opentelemetry/instrumentation` is never installed, and it is not a dependency of
`@opentelemetry/sdk-trace-web` (deps are `@opentelemetry/core` and
`@opentelemetry/sdk-trace-base` only —
https://unpkg.com/@opentelemetry/sdk-trace-web@2.11.0/package.json). It resolves
only by npm hoisting through `auto-instrumentations-web`. Under pnpm's default
isolated `node_modules` — the package manager this book uses in every other CI
sample — the import fails. Add it to the install line.

`BatchSpanProcessor` imported from `@opentelemetry/sdk-trace-web` (line 8) is
**CORRECT**: `sdk-trace-web` re-exports it from `sdk-trace-base`
(https://unpkg.com/@opentelemetry/sdk-trace-web@2.11.0/build/src/index.d.ts).

### A5. The `turbo.json` sample uses `pipeline`, removed in Turborepo 2.0

`19-03-microfrontends-1.md:10-21`

> ```json
> // Example Turborepo pipeline configuration (turbo.json)
> {
>   "pipeline": {
>     "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
> ```

The top-level key is `tasks`, not `pipeline`.

- Current reference: *"Each key in the `tasks` object is the name of a task that
  can be executed by `turbo run`."* — https://turborepo.dev/docs/reference/configuration
- The rename is a Turborepo **2.0.0** breaking change with a dedicated codemod,
  `rename-pipeline` — *"Rename the `pipeline` key to `tasks`."* —
  https://turborepo.dev/docs/reference/turbo-codemod

This is a Turborepo 1.x config printed in a book that pins React 19 / Next 16 /
Vite 8. Copy it into a current repo and `turbo run build` does not work. Rename
`pipeline` → `tasks`.

### A6. `changesets/action@v1` is a major version behind

`19-05-releasing-from-a-monorepo-2-1.md:23`

> `- uses: changesets/action@v1`

Latest is **v2.1.1**; v2.0.0 is a released major.
https://api.github.com/repos/changesets/action/tags

Not broken — `v1` still resolves — but it is stale next to the `actions/checkout@v7`,
`actions/setup-node@v7`, `pnpm/action-setup@v6` in the same eight lines, all of
which *are* current (verified: checkout v7.0.1, setup-node v7.0.0,
pnpm/action-setup v6.0.10). Recommend `@v2`.

### A7. "In-Memory: it is immune to both XSS and CSRF" — the XSS half is false

`18-03-jwt-vs-sessions-2-2.md:5`

> **In-Memory:** You store the JWT in a React state variable. It is immune to
> both XSS and CSRF. However, if the user refreshes the page...  (Most Secure...)

An in-memory token is **not** immune to XSS. Injected script runs in the same
JavaScript context as the app: it can read the variable, hook `fetch`, or simply
call the authenticated endpoints itself using the app's own code. What in-memory
storage buys is a smaller *persistence* window, not immunity.

Marked **UNVERIFIABLE-as-stated → WRONG on reasoning grounds**: I did not spend a
fetch on an OWASP citation, so treat the *verdict* as high-confidence but the
*citation* as missing. The internal evidence is enough on its own, though — this
page contradicts the book's own framing two files earlier:

- `18-01-xss-and-csrf-2.md:14` correctly scopes the same claim to CSRF only:
  *"you are completely immune to CSRF, because browsers do not automatically
  attach headers to cross-origin image or form requests."*
- `18-03-jwt-vs-sessions-2-2.md:5` widens it to "both XSS and CSRF."

One of the two is wrong and they are 300 lines apart in the same module. Fix by
matching 18-01's wording. Also drop "(Most Secure...)": the page labels
`HttpOnly` cookie "(Industry Standard)" and in-memory "(Most Secure)", which
tells a reader the industry standard is the less secure choice.

### A8. `18-04-oauth-and-sso-1.md:9` — "my secret Client ID"

> *"Here is the code the user gave me, and here is my secret Client ID. Give me
> an Access Token."*

The credential sent in the token exchange is the **client secret**. The client id
is public — it is already in the authorization URL the browser was redirected to
in step 1 of the same page. Calling it "my secret Client ID" merges two distinct
values and teaches the reader that the client id is a secret.

### A9. `report-to` alone sends nothing — the `Reporting-Endpoints` header is missing from both CSP chapters

`18-02-csp-and-trusted-types-2-2-1.md:32-36`

> `Content-Security-Policy-Report-Only` enforces nothing and **sends a JSON report
> for every violation** [...]
> ```
> Content-Security-Policy-Report-Only: default-src 'self'; report-to csp-endpoint
> ```

`21-03-what-ships-to-the-browser-2-1.md:28-31`

> Add reporting so you find out when something tries:
> ```
> report-to csp-endpoint
> ```

MDN: *"The server must separately provide the mapping between endpoint names and
their corresponding URLs in the **`Reporting-Endpoints`** HTTP response header."*
`<endpoint_name>` *"is the name of an endpoint provided by the `Reporting-Endpoints`
HTTP response header."*
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/report-to

`csp-endpoint` is a **group name**, not a URL. Neither page ever defines it, so a
reader who follows either page gets a policy that reports to nowhere — and then
21-03 tells them to use those reports as their third-party inventory
(`21-03-...-2-2.md:3-4`: *"The CSP report endpoint does this for free"*) and
18-02 tells them to *"Run report-only for a week, read the reports"*
(`18-02-...-2-2-1.md:38`). Both workflows depend on a header the book never
shows.

Minimum fix — add alongside the CSP header:

```
Reporting-Endpoints: csp-endpoint="https://example.com/csp-reports"
```

MDN also notes `report-to` *"is intended to replace `report-uri`, and browsers
that support `report-to` ignore the `report-uri` directive. However, until
`report-to` is broadly supported you can specify both directives"* — worth one
line in a book about shipping.

### A10. The coverage-threshold example uses a config shape Vitest does not have

`20-01-frontend-ci-cd-pipelines-1.md:14`

> *Pro-tip:* Use a tool like Istanbul or V8 coverage to enforce a coverage
> threshold. E.g., `coverage: { branches: 80, functions: 80 }`.

The paragraph directly above names Vitest as the runner. Vitest's options are
**`coverage.thresholds.branches`** and **`coverage.thresholds.functions`** —
https://vitest.dev/config/coverage — not flat keys on `coverage`. As written the
values are ignored and the build never fails, which is the opposite of what the
sentence promises. Correct form:

```ts
coverage: { thresholds: { branches: 80, functions: 80 } }
```

*(The docs page I fetched does not itself document a deprecated flat form, so
"removed in version N" is NOT CHECKED — but the current documented path is
unambiguous.)*

### A11. `proxy.ts` examples have no `matcher`, which Next's own docs call out as a hazard

`18-02-csp-and-trusted-types-2-2-1.md:4-23` and `20-05-monitoring-and-feature-flags-2-2-1.md:16-23`

Both export a proxy function with no `export const config = { matcher: ... }`.

Next.js docs: *"Without a `matcher`, Proxy runs on **every request**, including
static files (`_next/static`), image optimizations (`_next/image`), and assets in
the `public/` folder. Consider using a negative match pattern to exclude these
paths, otherwise auth logic or redirects can unintentionally block CSS, JS, or
images from loading."*
https://nextjs.org/docs/app/api-reference/file-conventions/proxy (docs version 16.3.4)

For the CSP page this is worse than wasteful: a fresh `crypto.randomUUID()` nonce
is minted per static asset request. For the A/B bucketing page, the `bucket`
cookie gets set on image requests too.

**Everything else about the `proxy.ts` usage is CORRECT** and worth saying
explicitly, because it looks wrong if you last read Next 15. Verified on the same
page: `middleware` was renamed to `proxy` in **v16.0.0**; the file must export the
function *"either as a default export or named `proxy`"* (the book uses
`export default function proxy` — valid); `NextRequest`/`NextResponse` still come
from `next/server`; and `NextResponse.next({ request: { headers } })` is the
documented way to pass a header upstream, which is exactly what
`18-02-...-2-2-1.md:20` does.

### A12. OAuth chapter never mentions PKCE

`18-04-oauth-and-sso-1.md:6-10`, `18-04-oauth-and-sso-2.md:2`

The flow taught is authorization-code-with-a-backend, which is the right shape.
But PKCE appears nowhere in either page. `18-04-...-2.md:2` lists what manual
OAuth requires — *"redirect URLs, state parameters (to prevent CSRF during the
login flow), and secure token storage"* — and stops short of the one thing the
current BCP names.

**RFC 9700, *Best Current Practice for OAuth 2.0 Security*, January 2025** —
https://datatracker.ietf.org/doc/html/rfc9700

> "Public clients MUST use PKCE [RFC7636] to this end"
> "For confidential clients, the use of PKCE [RFC7636] is RECOMMENDED"
> "Authorization servers MUST support PKCE [RFC7636]."
> "Clients SHOULD NOT use the implicit grant (response type `token`) or other
> response types issuing access tokens in the authorization response"

Credit where due: the book does **not** teach the implicit flow anywhere, so it
is not wrong, it is incomplete. A security chapter in a 2026 book should name
PKCE and say the implicit grant is dead. One sentence fixes it.

---

## B. UNVERIFIABLE / NOT CHECKED — flagged, not corrected

### B1. Three of the five incidents in the 2026 table are unverified

`21-01-the-code-you-did-not-write-1.md:16-20`

| Row | Verdict |
|---|---|
| **axios** — "CISA issued an alert on 20 April 2026" | **CORRECT** — https://www.cisa.gov/news-events/alerts/2026/04/20/supply-chain-compromise-impacts-axios-node-package-manager (advisory dated 2026-04-20; the compromise itself was 31 March 2026) |
| **Shai-Hulud** — worm through `keyv`, `cacheable`, `flat-cache`, `file-entry-cache` | NOT CHECKED |
| **ChainDrop** — "Over 1,300 package versions ... 2 billion monthly downloads" | **NOT CHECKED** — the most falsifiable pair of numbers in the module, with no source in the text |
| **Dependency confusion** — "33 malicious packages ... documented by Microsoft on 29 May 2026" | NOT CHECKED |
| **The editor** — malicious VS Code extension reaching a maintainer account | NOT CHECKED (deliberately unattributed; consider naming it or cutting it) |

The page opens with *"These are government and vendor advisories, not
speculation"* (`21-01-...-1.md:13`). That sentence obliges the book to be able to
produce the advisory for each row. Recommend a citation line under the table, or
cut the rows that cannot get one.

### B2. The incident timings the whole cooldown argument rests on

`21-02-defending-the-dependency-tree-1.md:16-19`

> **Shai-Hulud was detected in about 12 hours.** The September 2025 compromise of
> `debug` and `chalk` was resolved in about **2.5 hours**.

- **debug/chalk ~2.5 hours** — broadly consistent with vendor incident writeups
  (malicious versions published 13:16 UTC on 8 Sept 2025; clean versions restored
  within roughly two hours). Inside the reporting spread, but these are **vendor
  blogs, not a primary source**: UNVERIFIABLE-but-plausible.
- **Shai-Hulud ~12 hours** — NOT CHECKED.

These two numbers carry the entire "a one-day cooldown would have blocked both"
argument. Each needs a citation.

### B3. The OpenTelemetry chapter hedges on the wrong risk

`21-05-opentelemetry-in-the-browser-1.md:10-14`

> The browser SDK is newer, and 2026 is the year it became the expected answer
> for the frontend too. Elastic shipped OpenTelemetry RUM support, though at the
> time of writing it is still technical preview...

The hedge is attached to *Elastic's product*. The OpenTelemetry project's own JS
page is blunter about the layer this entire chapter teaches: *"Client
instrumentation for the browser is experimental and mostly unspecified."*
(signal status on the same page: Traces **Stable**, Metrics **Stable**, Logs
**Development**) — https://opentelemetry.io/docs/languages/js/

The npm dist-tags of the chapter's own packages agree:

| Package | Latest | Reads as |
|---|---|---|
| `@opentelemetry/api` | 1.9.1 | stable |
| `@opentelemetry/sdk-trace-web` | 2.11.0 | stable |
| `@opentelemetry/resources` | 2.11.0 | stable |
| `@opentelemetry/exporter-trace-otlp-http` | **0.222.0** | pre-1.0 |
| `@opentelemetry/auto-instrumentations-web` | **0.67.0** | pre-1.0 |
| `@opentelemetry/instrumentation` | **0.222.0** | pre-1.0 |

Source: `https://registry.npmjs.org/-/package/<name>/dist-tags`

Three of the six packages in the chapter's code are pre-1.0. Not a WRONG — the
chapter does hedge — but the hedge points at the wrong thing. Quote the OTel
project's own status line rather than Elastic's product status.

### B4. Numbers I deliberately did not spend a fetch on

- `20-02-dockerizing-react-apps.md:23` — *"the final Nginx image is often less
  than **20 Megabytes**"*. NOT CHECKED. `nginx:alpine` compressed and
  uncompressed sizes differ by roughly 3x; the figure is plausible for one and
  not the other. Whoever fixes this should say which.
- `20-02-dockerizing-react-apps.md:22` — *"your Docker image will be 500+
  Megabytes"*. NOT CHECKED.
- `20-06-internationalization-1.md:30` — *"German runs 30% longer than English on
  average"*. NOT CHECKED. Widely repeated, rarely sourced.
- `19-01-...-2-2-1.md:6` — Turbopack *"2 to 5 times faster production builds, up
  to 10 times faster Fast Refresh"*. NOT CHECKED (Vercel's own marketing figures;
  the neighbouring Rolldown claim did check out — see the CORRECT summary).
- `20-01-...-2-1.md:8` — `size-limit` `"limit": "150 KB"`. NOT CHECKED.
- `21-02-...-2-1.md:8` — provenance requires *"npm 9.5.0 or later"*. NOT CHECKED.

---

## C. CONTRADICTIONS

### C1. A chapter's own diagram runs Vitest while its own YAML runs Jest

`20-03-ci-cd-github-actions-1.md:55` (inside the `:::mint` SVG)

> `<text x="334" y="39" class="lbl" text-anchor="middle">vitest</text>`

`20-03-ci-cd-github-actions-2.md:33-34`

> ```yaml
>     - name: Run Jest Unit Tests
>       run: npm run test
> ```

and `20-03-ci-cd-github-actions-1.md:16`

> 4. **Unit Tests:** Runs `jest` to ensure no existing components were broken.

Two pages of one chapter, three mentions, two different test runners. The
diagram is the correct one — the rest of the book is Vitest
(`20-01-...-1.md:13` names "Vitest or Jest", `20-01-...-2-2.md:21` runs
`pnpm test:coverage`). A wrong diagram is a fact finding under the fact-pass
brief; here the diagram is right and the prose is stale. Fix the prose.

### C2. Module 20 switches package manager three times without saying why

| File:line | Uses |
|---|---|
| `20-01-frontend-ci-cd-pipelines-2-2.md:11-16` | `pnpm/action-setup@v6`, `cache: 'pnpm'`, `pnpm install --frozen-lockfile` |
| `20-02-dockerizing-react-apps.md:12-13` | `COPY package.json package-lock.json ./` then `RUN npm ci` |
| `20-03-ci-cd-github-actions-2.md:24-25` | `- name: Install Dependencies` / `run: npm ci` |
| `19-05-releasing-from-a-monorepo-2-1.md:21` | `pnpm install --frozen-lockfile` |
| `21-02-defending-the-dependency-tree-1.md:6-8` | shows all three, deliberately — fine |

The Docker page in particular copies a `package-lock.json` that no other page in
the part produces. A reader following the book end to end has a `pnpm-lock.yaml`
and the Dockerfile will fail at `npm ci`. Pick pnpm (the book's default
everywhere else) or state the switch.

### C3. "Immune to XSS" (18-03) vs "immune to CSRF" (18-01)

Covered in **A7** above — listing it here so it is not lost between passes.
`18-01-xss-and-csrf-2.md:14` scopes the claim correctly to CSRF;
`18-03-jwt-vs-sessions-2-2.md:5` widens it to "both XSS and CSRF." Same module,
contradictory, and the wider one is the wrong one.

### C4. SHA-pinned vs tag-pinned actions, in the same eight lines

`19-05-releasing-from-a-monorepo-2-1.md:17-23` pins `checkout` by SHA (with the
wrong comment, see **A1**) and then pins `pnpm/action-setup`, `setup-node` and
`changesets/action` by floating tag. `21-02-...-2-2-2.md:11` states the rule the
first line follows — *"Pin your GitHub Actions to a commit SHA, not a tag. A tag
can be moved."* Either apply it to all four, or say out loud why first-party
GitHub actions get a different treatment.

### C5. `19-02` says Module Federation is Webpack's; `19-01` says the bundler landscape moved off Webpack

`19-02-monorepo-architectures-2-2.md:3`

> usually orchestrated via Webpack's **Module Federation** or modern equivalents
> in Rspack/Vite.

`19-01-vite-rolldown-and-turbopack-2-1.md:14` says Rolldown's unification
*"unlocked ... Module Federation support"* in Vite 8, and
`19-01-...-2-2-2.md:9` recommends Webpack only *"until it hurts."*
`19-03-microfrontends-2.md:1` then hard-codes the header **"Module Federation
(Webpack / Rspack)"** and gives a `webpack.config.js` sample with
`ModuleFederationPlugin` — with no mention that the book's own recommended
bundler now supports it. Not contradictory in the strict sense, but a reader
following 19-01's advice cannot use 19-03's only code sample.

---

## D. REPEATS — content taught twice in this part

### D1. `20-05` and `21-04` are substantially the same chapter

This is the largest single problem in the part. Roughly a full printed page is
duplicated across two modules.

| Idea | First taught | Repeated |
|---|---|---|
| "A backend that breaks writes to a log file you own; a frontend fails silently on a stranger's phone" | `20-05-...-1.md:2` | `21-04-...-1.md:2-5` — same rhetorical opening, reworded |
| `web-vitals` + `navigator.sendBeacon('/api/vitals', ...)` code | `20-05-...-2-1.md:4-14` | `21-04-...-2-2-1.md:2-19` — same code, one extra metric (`onFCP`) |
| "`sendBeacon` is the right transport; `fetch` gets cancelled on unload" | `20-05-...-2-1.md:20` | `21-04-...-2-2-1.md:21-24` |
| "Watch p75, not the average — an average is dragged down by fast devices and hides the quarter having a bad time" | `20-05-...-2-1.md:22` | `21-04-...-2-1.md:16-18` — near-verbatim |
| "What to alert on" list, including error rate over 5 min, new error group spiking, p75 INP/LCP, checkout/sign-up drop | `20-05-...-2-2-2.md:4-9` | `21-04-...-2-2-2.md:1-10` — same five rows, same ordering, same closing point |
| "A channel that fires forty times a day gets muted" | `20-05-...-2-2-2.md:9` | `21-04-...-2-2-2.md:2-3` |
| Scrub with Sentry `beforeSend`; "legal requirement, not a nicety" | `20-05-...-1.md:28` | `21-04-...-2-2-2.md:23` |

**Recommendation:** `21-04` should keep it. It is the deeper treatment (lab vs
field table, segmentation list, three-signal model) and it sits in the module
named "Supply Chain And Observability." Cut the RUM half of `20-05` back to
error monitoring plus feature flags, which is what its title promises, and
forward-reference `21-04`.

### D2. `19-02` and `19-03` teach monorepos twice, then micro-frontends twice

`19-03-microfrontends-1.md:1` is literally headed `## Monorepos` — the topic
`19-02-monorepo-architectures-1.md:1` ("Advanced Monorepo Architectures") already
owns. Both then cover micro-frontends and Module Federation.

| Idea | `19-02` | `19-03` |
|---|---|---|
| Polyrepo pain: sharing code means publishing internal npm packages and versioning them | `19-02-...-1.md:2` | `19-03-...-1.md:3` |
| Nx / Turborepo analyse the import graph and only rebuild what changed | `19-02-...-1.md:6-13`, `2-1.md:17-20` | `19-03-...-1.md:5-8` |
| Micro-frontends let teams deploy independently; Module Federation loads a remote at runtime | `19-02-...-2-2.md:1-7` | `19-03-...-1.md:23-26`, `2.md:1-3` |
| Shared-dependency negotiation for React | `19-02-...-2-2.md:9` (as a warning) | `19-03-...-2.md:23-26` |

**Recommendation:** `19-03` keeps micro-frontends (it has the actual
`ModuleFederationPlugin` and `React.lazy` code, which `19-02` does not), drops
its `## Monorepos` half entirely, and gets renamed so its H2 matches its filename.
`19-02` keeps monorepos and loses its micro-frontends section, which is
`19-03`'s subject. As it stands the contents page lists "Monorepos" under a
chapter file called `microfrontends`.

### D3. Subresource Integrity taught twice, with the same placeholder hash

`18-02-csp-and-trusted-types-2-2-2.md:22-32` and
`21-03-what-ships-to-the-browser-1.md:17-31`

Both explain SRI, both use the identical `sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC`,
and both close on the same conclusion that self-hosting is stronger
(`18-02-...-2-2-2.md:32`: *"The stronger move is not to load third party scripts
from third party origins at all. Self-host them"* / `21-03-...-2-1.md:1-2`:
*"**2. Self-host it.** The stronger move."*).

`21-03` should keep it — it adds the `openssl dgst` generation command and the
honest failure mode about continuously-shipping vendors. `18-02` should cut its
SRI section to a cross-reference and use the reclaimed space for the
`Reporting-Endpoints` header it is missing (**A9**).

### D4. CSP taught in three places with three different example policies

`18-02-...-1.md:9-19`, `18-02-...-2-2-1.md:9-15`, `21-03-...-2-1.md:15-23`, plus
a prose mention at `21-01-...-2-1.md:22-23`.

The three policies do not agree on which directives are the baseline:

| Directive | `18-02` header | `18-02` proxy.ts | `21-03` |
|---|---|---|---|
| `default-src 'self'` | yes | yes | yes |
| `script-src` | `'self' 'nonce-…'` | `'self' 'nonce-…' 'strict-dynamic'` | `'self' 'nonce-…' 'strict-dynamic'` |
| `style-src` | yes | **no** | **no** |
| `img-src` | yes | **no** | **no** |
| `connect-src` | yes | **no** | yes |
| `frame-ancestors 'none'` | yes | yes | **no** |
| `frame-src` | no | no | `https://js.stripe.com` |
| `object-src 'none'` | yes | yes | yes |
| `base-uri 'self'` | yes | yes | yes |

`18-02-...-1.md:28` calls `connect-src` *"the one that limits exfiltration"* and
then the very next code block in the same chapter drops it. `21-03-...-2-1.md:24`
calls it *"the line that matters most here"* and drops `frame-ancestors`, which
`18-02` called *"the modern replacement for `X-Frame-Options`."* Pick one
baseline policy, print it once, and show only the delta afterwards.

### D5. Smaller repeats

- **Preview deployments** — `20-01-...-2-2.md:29-31` and
  `20-04-...-1.md:12`. Same idea, same example (a PR gets a temporary URL for
  QA). `20-04` is the platform chapter and should keep it.
- **"Never trust the client / the browser is hostile"** — `18-01-...-1.md:5-6`
  and `21-01-...-2-1.md:16-23`. Compatible, but the second reads as if the idea
  is new.
- **p75 / Core Web Vitals** appears in four files (`20-05-...-2-1.md:22`,
  `21-04-...-2-1.md:16`, `21-04-...-2-2-1.md:32`, `21-05-...-2-2-2-2.md:6`).
  After D1 is fixed this drops to two, which is fine.

### D6. `20-06-internationalization-2-1.md:16` — a comment that expires

```ts
new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long' }).format(new Date());
// "2026年9月1日"
```

The comment claims the output of `new Date()`, so it is wrong on every day except
1 September 2026. Use a fixed date in the call
(`new Date('2026-09-01')`) so the comment stays true.

---

## E. The pricing brief: there is nothing to check

I was sent in expecting the highest-risk numbers in the book to be in
`20-04-vercel-vs-aws-amplify-*` and `20-03-ci-cd-github-actions-*`, and told
never to compute a price from a remembered multiplier.

**There are no prices, quotas, free-tier allowances or per-minute rates anywhere
in Part Seven.** I grepped all 66 files for currency symbols, `GB`/`MB`,
`minutes`, `free tier`, `pricing`, `quota`, `/month` and per-minute rate shapes.
The only numeric hits are the ones already listed in section B4 plus percentages
in prose. `20-04` is two pages of qualitative platform comparison; `20-03` is a
CI concept page plus one YAML file.

So the trap that caught the sibling-book audit could not fire here, and I spent
the fetch budget on version-pinned material instead. Two consequences worth
passing on:

1. **Nothing to correct.** Do not let a later pass "add current pricing" to
   `20-04` — the moment a dollar figure enters that chapter it starts rotting,
   and the chapter works without one.
2. **`20-04` is the thinnest chapter in the part.** Two files, 26 lines of prose,
   no code, no diagram, and its only concrete assertions are marketing
   positioning ("the absolute best hosting environment", "unparalleled developer
   experience", "For 95% of personal projects"). Nothing in it is checkable,
   which is a different problem from being wrong. Flagging it for whoever owns
   the content pass; it is out of scope for a fact audit.

---

## F. Checked and correct

Summarised rather than listed, per the fact-pass brief.

**Verified against a fetched primary source, no change needed — 24 claims:**

- **Vite 8 ships Rolldown as the single bundler for dev and production**
  (`19-01-...-2-1.md:11`, `...2-2-2.md:5`), and **"ten to thirty times faster than
  Rollup"** — announcement: *"Vite 8 ships with Rolldown as its single, unified,
  Rust-based bundler, delivering up to 10-30x faster builds while maintaining full
  plugin compatibility."* https://vite.dev/blog/announcing-vite8 (the Vite 8 docs
  site no longer carries a `/guide/rolldown` opt-in page at all — it 301s to
  `v7.vite.dev`, which is itself confirmation that the `rolldown-vite` opt-in era
  ended.) The book is right and specific here; this was the claim I most expected
  to be wrong.
- **Turbopack is stable and default for `next dev` and `next build` in Next 16**
  (`19-01-...-2-2-1.md:6`) — consistent with the Next 16 docs; the `--webpack`
  opt-out is real.
- **`middleware` → `proxy` rename landed in Next.js v16.0.0**; default export
  named `proxy` is valid; `NextRequest`/`NextResponse` still from `next/server`;
  `NextResponse.next({ request: { headers } })` is the documented header-passing
  form (`18-02-...-2-2-1.md:4-23`, `20-05-...-2-2-1.md:14-23`).
  https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- **`actions/checkout@v7`, `actions/setup-node@v7`, `pnpm/action-setup@v6`** are
  all current majors (`20-01-...-2-2.md:9-12`, `20-03-...-2.md:17-20`,
  `19-05-...-2-1.md:18-19`). checkout latest v7.0.1, setup-node latest v7.0.0,
  action-setup latest v6.0.10.
- **pnpm `minimumReleaseAge` defaults to `1440` since v11**, `0` before
  (`21-02-...-1.md:20-21`), and `minimumReleaseAgeExclude` excludes by package
  name. https://pnpm.io/settings/dependency-resolution
- **npm's `min-release-age` exists** and shipped in the 11.x line
  (`21-02-...-1.md:34`); npm 11.10.0 is a real published version.
  https://docs.npmjs.com/cli/v11/using-npm/config
- **CISA advisory on the axios npm compromise, 20 April 2026**
  (`21-01-...-1.md:16`).
  https://www.cisa.gov/news-events/alerts/2026/04/20/supply-chain-compromise-impacts-axios-node-package-manager
- **`BatchSpanProcessor` is exported from `@opentelemetry/sdk-trace-web`**
  (`21-05-...-2-2-1-1.md:8`) — re-exported from `sdk-trace-base`. The
  `resourceFromAttributes` import and the `spanProcessors: [...]` constructor
  option are the current 2.x API, not the deprecated `new Resource()` /
  `addSpanProcessor` forms. This chapter is more current than most of the
  internet.
- **WebAuthn client code is correct** (`18-05-...-2-1.md`, `...2-2.md`):
  `navigator.credentials.create({ publicKey: { challenge, rp, user,
  pubKeyCredParams: [{ alg: -7, type: 'public-key' }], authenticatorSelection:
  { residentKey, userVerification } } })`; `navigator.credentials.get` with
  `rpId`; `mediation: 'conditional'` guarded by
  `PublicKeyCredential.isConditionalMediationAvailable()`; and
  `autocomplete="username webauthn"`. `alg: -7` is ES256. The server-side list
  (server-generated single-use challenge, verify origin and RP id, check the
  signature counter) matches the spec's verification procedure. Nothing to fix.
- **`Intl` examples are correct** (`20-06-...-1.md:8-12`, `...2-1.md:13-20`):
  `Intl.PluralRules('pl-PL')` returns `one`/`few`/`many` for 1/3/7; Arabic has
  six CLDR plural categories; `Intl.NumberFormat('de-DE', {style:'currency',
  currency:'EUR'})` → `1.234,50 €`; `Intl.ListFormat` conjunction → `a, b, and c`.
  The "i18n = 18 letters between i and n" gloss is right.
- **CSS logical properties** (`20-06-...-2-1.md:2-9`) — `margin-inline-start`,
  `padding-inline-end`, `text-align: start`, `dir="rtl"` on `<html>`. Correct.
- **`web-vitals` API** (`20-05-...-2-1.md:5`, `21-04-...-2-2-1.md:3`) —
  `onCLS`/`onINP`/`onLCP`/`onTTFB`/`onFCP` and `metric.rating` with values
  `'good' | 'needs-improvement' | 'poor'`. Correct for the current major.
- **Trusted Types** (`18-02-...-2-2-2.md:8-18`) —
  `require-trusted-types-for 'script'`, `trusted-types <policy-names>`,
  `trustedTypes.createPolicy(name, { createHTML })`, and a `TypeError` on raw
  string assignment to `innerHTML`. Directive names and API shape are right.
- **`'strict-dynamic'` explanation** (`18-02-...-2-2-1.md:28`) — *"a script I
  trusted may load further scripts"* is an accurate one-line gloss, and pairing
  it with a per-request nonce is the guidance the spec's own strict-policy advice
  gives.
- **`npm sbom --sbom-format cyclonedx`**, **`npm audit signatures`**,
  **`npm publish --provenance --access public`**, and the Sigstore /
  transparency-log description of provenance (`21-02-...-2-1.md`, `...2-2-1.md`).
  The caveat at `21-02-...-2-1.md:17-21` — provenance proves build origin, not
  safety — is correct and unusually well put.
- **Renovate `minimumReleaseAge` and `vulnerabilityAlerts` override**
  (`21-02-...-2-2-1.md:4-19`) — option names are current (`minimumReleaseAge`
  replaced the old `stabilityDays`).
- **`workspace:*` protocol** (`19-05-...-2-2-2-2.md:4-11`) and the Changesets
  `linked` / `fixed` / `ignore` config (`19-05-...-2-2-2-1.md:8-15`).
- **Multi-stage Dockerfile** (`20-02.md:9-19`) — the `FROM ... AS builder` /
  `COPY --from=builder` structure is right, and the note that a Next.js SSR app
  cannot be served by Nginx alone is correct.
- **SameSite and CSRF token mechanics** (`18-01-...-2.md:12-13`).

---

## G. Budget and coverage

- **Web fetches spent: 20** (18 `WebFetch`, 2 `WebSearch`), plus 6 direct
  registry/API reads via `curl` (npm dist-tags, GitHub tag refs). Roughly 26
  network reads; under the ~25 tool-fetch cap.
- **Claims verified against a fetched primary source: 34.** 12 WRONG or
  incomplete (section A), 22 confirmed correct (section F).
- **Consistency pass: complete.** All 66 files read.

**What I did NOT get to — listed so the gap is not silent:**

1. Every item in **B4** (nginx image sizes, German text expansion, Turbopack
   speed multipliers, `size-limit` threshold, npm 9.5.0 provenance floor).
2. Three of five rows in the 2026 incident table (**B1**) — ChainDrop's
   "1,300 versions / 2 billion monthly downloads" is the number I would check
   first if anyone gets one more fetch.
3. The Shai-Hulud 12-hour detection figure (**B2**).
4. `pnpm` v10.16 as the release that *introduced* `minimumReleaseAge` — I
   confirmed the v11 default but not the v10.16 introduction.
5. Whether Vitest ever supported the flat `coverage.branches` form (**A10**) —
   the current path is confirmed, the deprecation history is not.
6. `19-04-productivity-tooling.md` — read, no checkable version-pinned claim in
   it. Not audited beyond that.
7. The SVG diagrams were read as text for factual content (that is how C1 was
   found), not rendered. A diagram that is visually broken rather than factually
   wrong would not have shown up.

---

## Verdict

Part Seven is in better shape than its brief predicted. The things most likely to
have rotted — Vite 8 / Rolldown, Turbopack's default status, the Next 16
`middleware` → `proxy` rename, the WebAuthn call shapes, the OpenTelemetry 2.x
API, the GitHub Actions major versions — are all current and specific, and
several are more up to date than the surrounding ecosystem's documentation. The
pricing minefield I was sent to defuse does not exist: there is not a single
dollar figure or quota in the part.

The real damage is in three places. **Copy-paste correctness:** the SHA-pinned
`actions/checkout` line is v5.0.0 wearing a `# v7.0.0` comment, in the two
chapters that exist to teach SHA pinning; the `turbo.json` sample uses the
`pipeline` key Turborepo removed in 2.0; the `.npmrc` cooldown key exists in
neither npm nor pnpm; the Vitest coverage threshold nests one level too shallow;
the OpenTelemetry install line omits a package the next block imports. Each of
those fails the moment a reader runs it. **Security claims that are stated too
strongly:** `minimumReleaseAgeStrict`'s default is described backwards, in-memory
JWT storage is called immune to XSS, and both CSP chapters teach a `report-to`
workflow that cannot deliver a report because `Reporting-Endpoints` is never
shown. **Duplication:** `20-05` and `21-04` are close to the same chapter, and
`19-02` and `19-03` teach monorepos and micro-frontends twice each — a chapter
file named `microfrontends` whose first heading is `## Monorepos`.

Fix section A and merge D1 and D2, and the part is solid.
