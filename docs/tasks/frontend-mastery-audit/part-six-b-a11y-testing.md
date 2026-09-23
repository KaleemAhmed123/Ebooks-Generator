# Part Six B — Accessibility and Testing (fact + consistency audit)

**Files covered:** 31 — `16-01`…`16-04` (ARIA, focus management, WCAG/motion/testing,
accessibility and the law) and `17-01`…`17-05` (Vitest, React Testing Library,
Playwright, MSW, Storybook). `14-` and `15-` deliberately not read.

**Budget line:** _(updated as the pass runs — see bottom for the final count)_

Findings are appended in the order they were verified. WRONG first within each
section is not possible in an append-only log, so each finding carries an explicit
verdict tag: **WRONG**, **UNVERIFIABLE**, **CONTRADICTION**, **REPEAT**, **CORRECT**.
Read the summary table at the bottom for the ordered view.

---

## FACT PASS — findings as verified

### 1. WRONG — three Level **A** criteria are presented as "the AA criteria" (twice)

Source: <https://www.w3.org/TR/WCAG22/> (fetched; the spec's own level labels).

Verified levels: 1.4.3 Contrast (Minimum) **AA**, 1.4.11 Non-text Contrast **AA**,
2.4.7 Focus Visible **AA**, 2.1.1 Keyboard **A**, 4.1.2 Name, Role, Value **A**,
1.3.1 Info and Relationships **A**.

`16-03-wcag-motion-and-testing-2-1.md:1` — heading reads:

> `### The AA criteria that fail most often`

and the table under it (lines 8, 9, 10) lists:

> `| 2.1.1 Keyboard | every function works from a keyboard | …`
> `| 4.1.2 Name, role, value | every control exposes all three | …`
> `| 1.3.1 Info and relationships | structure is in the markup | …`

All three are **Level A**, not AA.

Same error repeated verbatim at `16-04-accessibility-and-the-law-2-2-1.md:7`:

> `The AA criteria that fail most often in audits:`

with 2.1.1, 4.1.2 and 1.3.1 in the table at lines 14, 15, 16.

**Fix:** either retitle to "the criteria that fail most often" (AA conformance
requires all Level A criteria too, so the list is still correct as a to-do list),
or add a Level column. The current wording states a false thing about the spec.

### 2. CORRECT — the WCAG numbers themselves

Verified against <https://www.w3.org/TR/WCAG22/>:

- 1.4.3 — 4.5:1 normal text, 3:1 large text. **CORRECT** in both files.
- 1.4.11 — 3:1. **CORRECT.**
- 2.4.11 Focus Not Obscured (Minimum) — Level **AA**. **CORRECT** in both files.
- 2.5.8 Target Size (Minimum) — Level **AA**, **24 by 24 CSS pixels**. **CORRECT.**
- "WCAG 2.2 added nine criteria" (`16-03-…-2-1.md:12`, `16-04-…-2-2-1.md:18`) —
  **CORRECT**, 9 new SC.

Note for a later pass (not a finding, an omission): WCAG 2.2 also **removed**
4.1.1 Parsing. Neither page mentions it, and the book keeps teaching 4.1.2 from
the same section, so a reader may assume 4.1.x is untouched.

### 3. WRONG / UNVERIFIABLE — the EAA penalty figure

`16-04-accessibility-and-the-law-1.md:25` —

> `**The penalty** reaches **100,000 euro or 4% of annual revenue**, set per member`
> `state.`

Sources fetched:
- Directive (EU) 2019/882 full text — <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882>
- Article 30 (Penalties) text, via <https://eur-lex.europa.eu/eli/dir/2019/882/oj/eng>

**Article 30 names no amount and no percentage.** It says only that penalties
"shall be effective, proportionate and dissuasive", that they "shall take into
account the extent of the non-compliance … the number of units of non-complying
products or services concerned, as well as the number of persons affected", and
that Member States set and notify the rules.

- The **"4% of annual revenue"** figure appears nowhere in the Directive. 4% of
  global annual turnover is the **GDPR** (Regulation 2016/679, Art. 83(5)) upper
  tier. This looks like a GDPR number imported into an EAA sentence. I found no
  primary source for a 4%-of-revenue EAA penalty in any member state within
  budget. **UNVERIFIABLE — and, presented as an EAA figure, WRONG.**
- The **100,000 euro** figure is plausibly one national ceiling (several member
  states set six-figure maxima in their implementing acts) but the page does not
  say which state, and I did not verify it against any national statute.
  **UNVERIFIABLE.**

**Recommended fix:** replace with what the Directive actually says — penalties are
set by each member state and must be effective, proportionate and dissuasive —
or cite one named national implementing act with its own URL. Do not print a
euro amount or a percentage without the statute behind it.

### 4. CORRECT — the EAA facts that do check out

Sources: <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882>
and <https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en>

- `16-04-…-1.md:12` "became enforceable on **28 June 2025**" — **CORRECT**
  (Article 2 / the applicability date; national transposition deadline was
  28 June 2022).
- `16-04-…-1.md:14-16` microenterprise exemption, "at least **10 employees** and
  **2 million euro** in annual turnover or balance sheet total" — **CORRECT** in
  substance. Article 3 defines a microenterprise as one that "employs fewer than
  10 persons and which has an annual turnover not exceeding EUR 2 million **or**
  an annual balance sheet total not exceeding EUR 2 million". Minor precision
  note: the exemption is not a flat exemption — under Article 4(5) micro-
  enterprises are exempt from the **services** obligations; micro-enterprises
  dealing in **products** get relief from documentation burdens, not from the
  accessibility requirements. The page's flat "Micro-enterprises below that are
  exempt" is looser than the Directive.
- `16-04-…-1.md:14` scope list (e-commerce, banking, transport ticketing,
  e-books, telecoms) — **CORRECT**, matches the Commission's own list.
- `16-04-…-1.md:18-20` applies to companies based anywhere selling into the EU —
  **CORRECT** in effect (obligations attach to importers and distributors placing
  products/services on the EU market).

### 5. CORRECT-FOR-NOW, but rots before this book does — EN 301 549 / WCAG 2.1 AA

`16-04-accessibility-and-the-law-1.md:22-23` and the table row at
`16-04-accessibility-and-the-law-2-1.md:5`:

> `**The standard** is EN 301 549 … which incorporates **WCAG 2.1 level AA**.`

**CORRECT** for the currently harmonised version, EN 301 549 **V3.2.1** (2021-03),
which references WCAG 2.1 AA.

**Caveat the book should carry:** ETSI has a draft **V4.1.0 (2025-11)** that moves
the standard to **WCAG 2.2** —
<https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.00_20/en_301549v040100ev.pdf>
(ETSI's own directory listing returns 403 to automated fetches, so I could not
confirm the final V4.1.1 publication date or its OJEU citation date from ETSI
itself — search results disagreed between September and October 2026).
**The V4.1.1 date is NOT CHECKED / UNVERIFIABLE.** Do not print a date for it.

This makes the book's own advice at `16-04-…-2-1.md:15` ("build to WCAG 2.2 AA")
better founded than the page realises — worth one sentence saying EN 301 549 is
moving to 2.2, without a date.

