## The 45 minutes

- The round has a fixed shape. Two published frameworks agree on it within a few minutes: Hello Interview gives requirements ~5, entities ~2, API ~5, high level 10–15, deep dives ~10; Alex Xu's book gives scope 3–10, high level 10–15, deep dive 10–25, wrap 3–5. This booklet uses the split below and every case study follows it in page order

<svg viewBox="0 0 460 128" role="img" aria-label="A 45-minute timeline in five phases: requirements and numbers 0 to 5, API and entities 5 to 10, high-level design 10 to 25, deep dive 25 to 40, wrap-up 40 to 45. A marker at minute 10 shows the failure: still asking questions with no box drawn." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="44" height="26" fill="#e6f2ff" stroke="#333"/>
  <rect x="64" y="30" width="44" height="26" fill="#fff" stroke="#333"/>
  <rect x="108" y="30" width="132" height="26" fill="#e6f2ff" stroke="#333"/>
  <rect x="240" y="30" width="132" height="26" fill="#fff" stroke="#333"/>
  <rect x="372" y="30" width="44" height="26" fill="#e6f2ff" stroke="#333"/>
  <text x="42" y="26" text-anchor="middle" font-size="7.5">requirements</text>
  <text x="42" y="47" text-anchor="middle" font-size="7.5">numbers</text>
  <text x="86" y="42" text-anchor="middle" font-size="7.5">API +</text>
  <text x="86" y="52" text-anchor="middle" font-size="7.5">entities</text>
  <text x="174" y="42" text-anchor="middle" font-size="7.5">high-level design</text><text x="174" y="52" text-anchor="middle" font-size="7.5">one path per requirement</text>
  <text x="306" y="42" text-anchor="middle" font-size="7.5">deep dive</text><text x="306" y="52" text-anchor="middle" font-size="7.5">the hardest non-functional</text>
  <text x="394" y="47" text-anchor="middle" font-size="7.5">wrap</text>
  <line x1="20" y1="70" x2="416" y2="70" stroke="#333"/>
  <text x="20" y="82" text-anchor="middle" font-size="7.5">0</text>
  <text x="64" y="82" text-anchor="middle" font-size="7.5">5</text>
  <text x="108" y="82" text-anchor="middle" font-size="7.5">10</text>
  <text x="240" y="82" text-anchor="middle" font-size="7.5">25</text>
  <text x="372" y="82" text-anchor="middle" font-size="7.5">40</text>
  <text x="416" y="82" text-anchor="middle" font-size="7.5">45 min</text>
  <line x1="108" y1="8" x2="108" y2="30" stroke="#bf4c28"/>
  <text x="112" y="14" font-size="7.5" fill="#bf4c28">✕ minute 10: still asking questions, no box drawn</text>
  <text x="20" y="104" font-size="7.5">pages in every case study below: requirements → API and data → high level → deep dives → failure → what is probed</text>
  <text x="20" y="118" font-size="7.5">the deep dive is chosen, not stumbled into: page 7</text>
</svg>

- Requirements and numbers, 0–5: three functional requirements in, everything else named as out; non-functional ones as numbers (page 3, page 4)
- API and entities, 5–10: nouns, then one endpoint per requirement, with idempotency and pagination decided (page 5)
- High level, 10–25: the simplest design that serves every endpoint, one request traced per requirement, then buy-in (page 6)
- Deep dive, 25–40: the one non-functional requirement that is hardest to meet, chosen out loud (page 7), then failure on every arrow (page 8)
- Wrap, 40–45: what was cut, what would change at 10× the numbers

### The failure

- Losing the clock. Minute 12, no box on the board, the interviewer interrupts to move things on. The pacing signal is gone and cannot be earned back. The candidate ends each phase, not the interviewer: "that is enough scope, moving to the API"
