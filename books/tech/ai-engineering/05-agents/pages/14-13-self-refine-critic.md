## Self-refine and critic

- **Self-refine** (Madaan et al., 2023) is the simplest quality booster: the model produces an answer, **critiques its own output**, and revises it — iterating a few rounds. Same model, three roles: generate, critique, improve.

<svg viewBox="0 0 360 92" role="img" aria-label="Generate, then critique, then refine, looping until the critique is satisfied" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="20" y="34" width="72" height="24" rx="3" fill="#24405e"/><text x="56" y="49" text-anchor="middle" fill="#fff" font-size="6.5">generate</text>
  <rect x="140" y="34" width="72" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="176" y="49" text-anchor="middle" font-size="6.5">critique</text>
  <rect x="260" y="34" width="80" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="300" y="49" text-anchor="middle" font-size="6.5">refine</text>
  <path d="M92 46 L138 46" stroke="#888" marker-end="url(#sr)"/><path d="M212 46 L258 46" stroke="#888" marker-end="url(#sr)"/><path d="M300 58 Q300 80 56 76 L56 60" stroke="#888" fill="none" marker-end="url(#sr)"/>
  <text x="180" y="88" text-anchor="middle" font-size="6" fill="#6b6b6b">loop a few times, or until critique says "good"</text>
  <defs><marker id="sr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it differs from Reflexion:** self-refine critiques *one output* to polish it (no external success signal needed); Reflexion learns from *task failures* across attempts (needs an evaluator). Self-refine is "make this draft better"; Reflexion is "don't repeat that mistake."
- **The critic can be separate.** A dedicated **critic** — a second prompt, or a second model tuned to find flaws — often catches more than self-critique, because a model critiquing its *own* work shares its blind spots. Splitting generator and critic (even same model, different prompt) is the reliable version.
- **Where it helps:** writing, code, plans — anything with room to improve and criteria to check against ("is this correct? complete? clear?"). It reliably lifts quality for a few extra calls.

:::warn
Self-refine has a ceiling and a trap. The ceiling: a model cannot critique a flaw it cannot see — if it doesn't know a fact is wrong, no amount of self-review fixes it. The trap: over-refining can *degrade* output, second-guessing correct answers into worse ones, or looping forever. Cap the rounds, give the critic concrete criteria, and prefer a **grounded** check (run the tests, verify against a source) over pure self-judgment where you can.
:::
