# Module 9 - Event sourcing and CQRS

## Store state or store events

- Two ways to persist a change: overwrite a row so it holds the latest value, or append a fact that explains what happened and derive the value by folding over every fact so far. `balance = 100` is state; `Deposited(50)`, `Deposited(50)` is events that fold to the same 100

<svg viewBox="0 0 460 110" role="img" aria-label="State versus events. State is a single row overwritten on every change. Events are appended facts folded down to the current value." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="80" y="15" text-anchor="middle" font-weight="bold">state</text>
  <rect x="30" y="25" width="100" height="24" fill="none" stroke="#333"/>
  <text x="80" y="41" text-anchor="middle" font-size="7">balance = 100</text>
  <text x="30" y="65" font-size="6.5" fill="#999">balance = 50 (overwritten)</text>
  <text x="30" y="78" font-size="6.5" fill="#999">balance = 0 (overwritten)</text>
  <line x1="200" y1="10" x2="200" y2="100" stroke="#ccc" stroke-dasharray="2 2"/>
  <text x="330" y="15" text-anchor="middle" font-weight="bold">events</text>
  <rect x="230" y="25" width="90" height="20" fill="none" stroke="#333"/>
  <text x="275" y="39" text-anchor="middle" font-size="7">Deposited(50)</text>
  <rect x="230" y="50" width="90" height="20" fill="none" stroke="#333"/>
  <text x="275" y="64" text-anchor="middle" font-size="7">Deposited(50)</text>
  <path d="M320 60 L370 60" stroke="#333" marker-end="url(#s9)"/>
  <rect x="370" y="45" width="70" height="24" fill="none" stroke="#bf4c28"/>
  <text x="405" y="61" text-anchor="middle" font-size="7" fill="#bf4c28">fold: 100</text>
  <defs><marker id="s9" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- State answers "what is true now" cheaply and throws away "how did it get here." Events answer both, at the cost of needing a fold — a function that replays every event in order — to get the current value at all
- Overwriting is not wrong by default; it is wrong the moment the system needs history it did not keep. Adding an audit trail after the fact is not a migration, it is a rewrite: the old rows never recorded the events that would explain them

### The failure

- "We'll add history later, once we need it." The row has always only held the latest value; there is no log to backfill from, because there was never one being written. History has to start being recorded before the day it is asked for
