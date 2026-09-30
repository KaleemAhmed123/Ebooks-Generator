## Procedural memory: skill libraries

- **Procedural memory** stores *how to do things* — learned skills the agent can reuse. Its landmark is **Voyager** (Wang et al., 2023), an agent that plays Minecraft by writing code for each new skill and saving it to a growing **skill library**. **[VERIFY]**

<svg viewBox="0 0 360 100" role="img" aria-label="Voyager writes a skill as code, verifies it works, stores it, and reuses it later" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="34" width="66" height="26" rx="3" fill="#24405e"/><text x="45" y="46" text-anchor="middle" fill="#fff" font-size="6">write skill</text><text x="45" y="55" text-anchor="middle" fill="#cdd" font-size="5">(code)</text>
  <rect x="98" y="34" width="66" height="26" rx="3" fill="#f4f4f4" stroke="#888"/><text x="131" y="50" text-anchor="middle" font-size="6">verify it works</text>
  <rect x="184" y="34" width="80" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="224" y="46" text-anchor="middle" font-size="6">store in library</text><text x="224" y="55" text-anchor="middle" font-size="5" fill="#6b6b6b">craftAxe(), mineOre()</text>
  <rect x="284" y="34" width="66" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="317" y="50" text-anchor="middle" font-size="6">reuse later</text>
  <path d="M78 47 L96 47" stroke="#888" marker-end="url(#vy)"/><path d="M164 47 L182 47" stroke="#888" marker-end="url(#vy)"/><path d="M264 47 L282 47" stroke="#888" marker-end="url(#vy)"/><path d="M317 60 Q317 84 45 80 L45 62" stroke="#bbb" fill="none" stroke-dasharray="3,2" marker-end="url(#vy)"/>
  <text x="180" y="94" text-anchor="middle" font-size="5.5" fill="#6b6b6b">skills compose: mineOre uses craftAxe</text>
  <defs><marker id="vy" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The mechanism:** when Voyager solves a new task, it writes the solution as a reusable **function** (code), verifies it works in the environment, and stores it — indexed by a description — in its library. Later tasks **retrieve and compose** stored skills: `mineIronOre` calls the earlier `craftStonePickaxe`. The agent bootstraps ever-more-complex abilities from ones it already learned.
- **Why it is powerful:** skills are *verified and executable*, not vague recollections. A retrieved skill is code that provably worked, so reuse is reliable — unlike recalling a fuzzy episode. The library grows monotonically; the agent gets more capable over time without any weight updates.
- This is the direct ancestor of the **Agent Skills** of Module 13 — packaged, reusable know-how — and of the self-improvement systems in Module 15. Procedural memory turns an agent from a solver into a *learner that accumulates capability*.

:::interview
**"How did Voyager keep getting better without fine-tuning?"** Procedural memory — a skill library. Each time it solved a task, it wrote the solution as verified, reusable code and stored it indexed by description. New tasks retrieved and *composed* existing skills into more complex ones, so capability compounded over time with no weight changes. The key is that stored skills are executable and pre-verified, making reuse reliable — the ancestor of today's Agent Skills.
:::
