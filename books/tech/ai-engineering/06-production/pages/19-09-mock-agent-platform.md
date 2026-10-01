## Mock: autonomous agent platform — design

- **Prompt:** "Design a platform that runs autonomous agents on long tasks." **Clarify:** agents run minutes to hours, use tools, must survive restarts, cost must be bounded per run, actions can be consequential (so safety gates), thousands of concurrent runs.
- This composes Booklet 5 (agents) with Module 17's reliability. The defining shift from the chat mock: runs are **long, stateful, and side-effecting**, so the API is async and durability is the core requirement.

<svg viewBox="0 0 360 104" role="img" aria-label="Agent platform: submit to a queue, workers run the agent loop with durable checkpoints, tools in a sandbox, safety gate before consequential actions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="44" width="40" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="30" y="55" text-anchor="middle">submit</text>
  <rect x="60" y="44" width="40" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="80" y="55" text-anchor="middle">queue</text>
  <rect x="110" y="30" width="86" height="44" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="153" y="42" text-anchor="middle" font-size="6">agent worker</text><text x="153" y="53" text-anchor="middle" font-size="5.5">loop + LLM</text><text x="153" y="63" text-anchor="middle" font-size="5.5">durable checkpoints</text>
  <rect x="206" y="20" width="66" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="239" y="31" text-anchor="middle">tool sandbox</text>
  <rect x="206" y="44" width="66" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="239" y="55" text-anchor="middle">safety gate</text>
  <rect x="206" y="68" width="66" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="239" y="79" text-anchor="middle">checkpoint store</text>
  <rect x="286" y="44" width="64" height="16" rx="2" fill="#24405e"/><text x="318" y="55" text-anchor="middle" fill="#fff">observability</text>
  <path d="M50 52 L58 52" stroke="#888" marker-end="url(#ag)"/><path d="M100 52 L108 52" stroke="#888" marker-end="url(#ag)"/><path d="M196 40 L204 30" stroke="#888" marker-end="url(#ag)"/><path d="M196 52 L204 52" stroke="#888" marker-end="url(#ag)"/><path d="M196 60 L204 74" stroke="#888" marker-end="url(#ag)"/><path d="M272 52 L284 52" stroke="#888" marker-end="url(#ag)"/>
  <defs><marker id="ag" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The spine.** *Async submit → queue → agent workers* running the loop (Booklet 5), each step **checkpointed** to durable storage (17-17 durable execution) so a crash resumes mid-run without re-paying or re-firing side effects (idempotency). *Tools run in a sandbox*; a *safety gate* (Module 18) sits before consequential actions with human confirmation for irreversible ones.
- **Bounded cost per run** is a hard requirement: each run carries a token/step budget (Booklet 5's cost governors), and a governor kills a run that loops or overspends — a runaway agent is a financial incident (17-55).

:::interview
"What makes an agent platform harder than a chat service?"

Runs are **long, stateful, and side-effecting**, so three things chat doesn't need become core: **durable execution** (checkpoint each step so a crash resumes exactly-once, not from scratch re-firing emails), **cost governance** (per-run token/step budgets with a kill switch, because an agent can loop forever), and **action safety** (least-privilege sandboxed tools + confirmation gates before irreversible actions, since injection can hijack an agent — Module 18). The async job API and the checkpoint store fall out of "long and stateful"; the safety gate falls out of "side-effecting." That triad is the whole difference.
:::
