## Case study: coding swarms and beyond

- Beyond research, three 2026 multi-agent applications show the pattern's range — and its honest limits.

<svg viewBox="0 0 360 84" role="img" aria-label="Three multi-agent applications: coding teams, agent simulations, and competitive game AI" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="64" y="32" text-anchor="middle" font-size="6.5">coding teams</text><text x="64" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">planner·coder·</text><text x="64" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tester·reviewer</text>
  <rect x="126" y="16" width="108" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="32" text-anchor="middle" font-size="6.5">simulations</text><text x="180" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">societies, markets,</text><text x="180" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">org modeling</text>
  <rect x="242" y="16" width="108" height="52" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="32" text-anchor="middle" font-size="6.5">game AI (MARL)</text><text x="296" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">StarCraft, Dota</text><text x="296" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">team play</text>
</svg>

- **Coding teams** — a planner, coder, tester, and reviewer collaborating on a feature (the roles of 16-10). It *can* beat a single coding agent on complex, multi-file work — but the honest finding is *often it does not*: a single strong agent with good context management (14-86) and a verifier (tests) handles most coding tasks, and the multi-agent version adds coordination cost and failure modes for marginal gain. Coding teams win mainly on *large, decomposable* work where roles genuinely divide (a big feature across subsystems), not everyday tasks.
- **Simulations** (16-21) — modeling societies, markets, or organizations with populations of agents. A genuine multi-agent-*native* use: the point *is* the interaction, so there is no single-agent alternative. Growing in social science, economics, and product testing.
- **Competitive game AI** (MARL, 16-24) — teams of agents mastering StarCraft, Dota, or robotic soccer through multi-agent RL. Distinct from LLM systems (16-27): the agents are *trained*, and the multi-agent structure is intrinsic to the game.
- **The pattern across the range:** multi-agent is *transformative* where the task is natively multi-agent (simulation), *strong* where it is natively parallel and decomposable (research, big features), and *often over-engineering* where it is not (everyday coding, sequential tasks).

:::note
The honest 2026 picture: multi-agent systems delivered real wins on the tasks that *fit the pattern* — parallel research, agent simulation, trained game teams — and a lot of over-engineered disappointment where teams reached for multiple agents on tasks a single well-built agent handled better and cheaper. The maturity of the field is learning *which* is which. The next page makes the negative case explicit, because knowing when *not* to use multi-agent is now as valuable a skill as knowing how to build one.
:::
