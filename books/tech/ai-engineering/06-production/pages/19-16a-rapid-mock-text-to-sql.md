## Rapid mock: text-to-SQL analytics

- Beyond the seven detailed designs, here are five more in compressed form — same framework, faster. **Prompt:** "Design a system that answers business questions from a data warehouse in natural language." **Clarify:** non-technical users, read-only, must be *correct* (a wrong number is worse than no answer), large schema.

<svg viewBox="0 0 360 62" role="img" aria-label="Text-to-SQL flow: question, schema retrieval, SQL generation, validation, execute, verify result" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="6" y="22" width="42" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="27" y="33" text-anchor="middle">question</text>
  <rect x="54" y="22" width="56" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="82" y="33" text-anchor="middle">schema RAG</text>
  <rect x="116" y="22" width="52" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="142" y="33" text-anchor="middle">gen SQL</text>
  <rect x="174" y="22" width="56" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="202" y="33" text-anchor="middle">validate</text>
  <rect x="236" y="22" width="48" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="260" y="33" text-anchor="middle">execute</text>
  <rect x="290" y="22" width="64" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="322" y="33" text-anchor="middle">check result</text>
  <path d="M48 30 L52 30 M110 30 L114 30 M168 30 L172 30 M230 30 L234 30 M284 30 L288 30" stroke="#888" marker-end="url(#ts)"/>
  <defs><marker id="ts" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The binding constraint is correctness**, so the design is built around *verification*, not generation. Retrieve the relevant tables/columns (the schema is too big to stuff), generate SQL with **guided decoding** (17-17a) against the dialect, **validate** it (parse, check tables/columns exist, forbid writes), run it **read-only** with a row/time limit, and sanity-check the result before presenting.
- **Show the SQL and the assumptions**, so a user can catch a misinterpretation — a natural-language question is ambiguous, and surfacing the query is the trust mechanism.

:::interview
"How do you make text-to-SQL trustworthy?"

Treat it as a correctness problem, not a generation one. Constrain generation (guided decoding to valid SQL, read-only, schema-grounded via retrieval), **validate** the query before running (tables/columns exist, no writes, cost limit), and **verify/expose** — show the SQL and the assumptions so a user catches a misread question. Evaluate on a labelled question→SQL set with *execution-match* (does the query return the right rows), not string match. The framing — a wrong number is worse than a refusal, so verification dominates — is the answer.
:::
