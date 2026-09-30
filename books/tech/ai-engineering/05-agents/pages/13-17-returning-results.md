## Returning results the model can use

- Half of tool design is the *input* schema; the other half is what you hand *back*. The model reads your result as text and reasons over it, so a badly-shaped result is as damaging as a badly-shaped call.

<svg viewBox="0 0 360 84" role="img" aria-label="A raw dump wastes tokens and confuses, a shaped result is compact and clear" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="16" width="168" height="56" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">raw dump</text><text x="92" y="44" text-anchor="middle" font-size="5.5">2,000-row JSON, every field,</text><text x="92" y="54" text-anchor="middle" font-size="5.5">nested, unpaginated</text><text x="92" y="66" text-anchor="middle" font-size="5.5" fill="#6b6b6b">burns context, buries the answer</text>
  <rect x="184" y="16" width="168" height="56" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="268" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">shaped result</text><text x="268" y="44" text-anchor="middle" font-size="5.5">top 5 rows, key fields,</text><text x="268" y="54" text-anchor="middle" font-size="5.5">"...42 more, refine query"</text><text x="268" y="66" text-anchor="middle" font-size="5.5" fill="#6b6b6b">cheap, clear, actionable</text>
</svg>

- **Return only what the model needs.** A database tool that dumps 2,000 rows floods the context, costs a fortune (every row is re-billed each turn), and buries the answer. Return the top-k, the relevant fields, and a note like *"42 more results — refine the query."*
- **Keep it structured and compact.** Clean JSON or a small table beats a wall of prose. The model parses structure reliably.
- **Say when there's nothing.** An empty result should say *"no orders found"*, not `[]` — the explicit message stops the model guessing whether the tool failed or the answer is genuinely empty.
- **Include actionable errors** (13-10), and **paginate or summarize** large outputs rather than truncating mid-record (a half-JSON confuses the model more than a summary).

:::warn
The silent cost sink in agents is fat tool results. Because the whole transcript — including every tool result — is resent to the model each turn, a single 50 KB result returned early sits in the context and is re-billed on *every* subsequent step of the run. Shape results at the tool boundary; do not make the model pay to re-read a giant blob it only needed once.
:::
