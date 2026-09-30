## Dialogue state tracking

- A task-oriented assistant (booking a flight, ordering food) must remember what the user has specified *so far*, across turns. **Dialogue state tracking (DST)** is that memory — a running structured record of the conversation's facts.
- The state is a set of **slots** the task needs filled: `{from: "NYC", to: "London", date: null, passengers: 2}`. Each user turn updates slots; the system asks about whichever are still empty.

<svg viewBox="0 0 360 78" role="img" aria-label="Each user turn updates a slot table until all required slots are filled" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="12" width="130" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="20" y="24" text-anchor="start">"flight to London"</text>
  <rect x="10" y="44" width="130" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="20" y="56" text-anchor="start">"for two people"</text>
  <path d="M144 20 L182 30" stroke="#1a1a1a" marker-end="url(#d)"/><path d="M144 52 L182 40" stroke="#1a1a1a" marker-end="url(#d)"/>
  <rect x="186" y="14" width="164" height="50" rx="3" fill="#fff" stroke="#24405e"/>
  <text x="196" y="28">to: London ✓</text><text x="196" y="42">passengers: 2 ✓</text><text x="196" y="56" fill="#c0392b">date: ___ (ask next)</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Classic DST used dedicated classifiers per slot. Modern LLM agents often keep the state implicitly in the conversation, or explicitly as a JSON object the model reads and rewrites each turn (structured outputs, page 05-28).

:::warn
The hard cases are **corrections and context switches**. *"Actually, make that Paris"* must overwrite the `to` slot, not add a second destination; *"and a hotel too"* opens a new task while the flight state stays alive. Systems that only ever *add* to the state, never revise it, produce the maddening bot that keeps the value you already told it to change. Explicit state you can inspect and edit beats hidden state you cannot.
:::
