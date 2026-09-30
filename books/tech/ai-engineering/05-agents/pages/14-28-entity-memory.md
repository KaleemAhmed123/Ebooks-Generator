## Entity memory

- **Entity memory** organizes what the agent knows *around the things it knows about* — people, projects, companies, files. Instead of a flat list of facts, it keeps a record per **entity**, accreting attributes and relationships over time.

<svg viewBox="0 0 360 100" role="img" aria-label="Entity records for people and projects, linked by relationships, each accreting attributes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="70" cy="40" r="24" fill="#e8f4fd" stroke="#24405e"/><text x="70" y="38" text-anchor="middle" font-size="6.5">Sam</text><text x="70" y="48" text-anchor="middle" font-size="5" fill="#6b6b6b">eng · Pacific</text>
  <circle cx="200" cy="40" r="24" fill="#eaf6ea" stroke="#1a3a2a"/><text x="200" y="38" text-anchor="middle" font-size="6.5">Project X</text><text x="200" y="48" text-anchor="middle" font-size="5" fill="#6b6b6b">CLI · Python</text>
  <circle cx="310" cy="40" r="22" fill="#fdeef2" stroke="#a03050"/><text x="310" y="42" text-anchor="middle" font-size="6">AcmeCorp</text>
  <path d="M94 40 L176 40" stroke="#888" marker-end="url(#en)"/><text x="135" y="34" text-anchor="middle" font-size="5" fill="#6b6b6b">owns</text>
  <path d="M224 40 L288 40" stroke="#888" marker-end="url(#en)"/><text x="256" y="34" text-anchor="middle" font-size="5" fill="#6b6b6b">for</text>
  <text x="180" y="88" text-anchor="middle" font-size="6" fill="#6b6b6b">facts attach to entities; entities link to each other</text>
  <defs><marker id="en" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it works:** the agent extracts entities from conversation and maintains a record for each — Sam (a person: role, timezone, preferences), Project X (a project: language, status), their **relationships** (Sam *owns* Project X). New information updates the right entity's record rather than appending to a transcript.
- **Why organize by entity:** retrieval becomes precise. Asked about "Sam's project," the agent looks up Sam, follows the `owns` link to Project X, and pulls its facts — a targeted graph traversal, not a fuzzy similarity search over everything. It also naturally resolves references ("he," "that project") to the right entity.
- Entity memory is often backed by a **knowledge graph** (nodes = entities, edges = relationships) — the structured end of memory, strong exactly where flat vector memory is weak: multi-hop questions and relationships (next page).

:::note
Entity memory shines for relational, long-lived domains — a personal assistant tracking your people and projects, a support agent tracking accounts and tickets. It answers "what do I know about *this thing*, and what's it connected to?" far better than a pile of embedded snippets. Frameworks like CrewAI expose entity memory as a first-class type for exactly this reason; the tradeoff is the extraction and maintenance cost of keeping the graph accurate.
:::
