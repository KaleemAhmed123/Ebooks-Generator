## Discovery and progressive disclosure

- An agent might have hundreds of skills. Loading all of them into context would blow the budget and bury the model in irrelevant instructions. **Progressive disclosure** solves this: reveal only what is needed, when it is needed.

<svg viewBox="0 0 360 104" role="img" aria-label="Three levels: always-loaded names, then the loaded skill body, then on-demand deep files" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="20" y="14" width="320" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="28" text-anchor="middle" font-size="6.5">level 1 · always in context: every skill's name + description</text>
  <rect x="60" y="42" width="240" height="22" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="180" y="56" text-anchor="middle" font-size="6.5">level 2 · when relevant: load that skill's SKILL.md body</text>
  <rect x="100" y="70" width="160" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="84" text-anchor="middle" font-size="6.5">level 3 · if needed: deep files, scripts</text>
</svg>

- **Level 1 — always loaded, tiny.** Just the `name` + `description` of every available skill. This is cheap (a line each) and lets the model *know what exists* without the detail.
- **Level 2 — loaded on relevance.** When the model judges a skill applies (from its description), the agent loads that skill's full `SKILL.md` body — the actual instructions. Only the relevant skill's body enters context.
- **Level 3 — loaded on demand.** If the skill references deeper files (a long reference doc, a script), those load only when the task reaches them. A big skill stays cheap until its depths are actually needed.

- The result: an agent can have vast latent knowledge (hundreds of skills) while its *active* context holds only a short menu plus the one or two skills in play. This is the same context-economy principle as RAG and tool retrieval — **don't pay for what you're not using.**

:::interview
"How can an agent have hundreds of skills without exhausting its context?"

Progressive disclosure. Keep only each skill's name and one-line description in context at all times (cheap). Load a skill's full instructions only when the model decides it is relevant, and load the skill's deep reference files or scripts only when the task actually reaches them. Active context stays small — a menu plus the one skill in use — while total available knowledge is unbounded.
:::
