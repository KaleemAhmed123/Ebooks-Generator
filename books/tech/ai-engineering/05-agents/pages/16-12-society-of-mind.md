## Society of Mind

- **Society of Mind** (Marvin Minsky, 1986) is the foundational idea that intelligence *emerges from many simple interacting agents*, none intelligent alone. It predates LLMs by decades and now inspires a concrete technique: solve a hard problem with *many* LLM agents whose interaction produces a better answer than any one.

<svg viewBox="0 0 360 88" role="img" aria-label="Many simple agents interacting produce collective intelligence greater than any single agent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#6a9bd0"><circle cx="50" cy="30" r="9"/><circle cx="90" cy="52" r="9"/><circle cx="60" cy="70" r="9"/><circle cx="110" cy="28" r="9"/><circle cx="130" cy="60" r="9"/></g>
  <g stroke="#bbb"><line x1="50" y1="30" x2="90" y2="52"/><line x1="90" y1="52" x2="60" y2="70"/><line x1="90" y1="52" x2="110" y2="28"/><line x1="90" y1="52" x2="130" y2="60"/><line x1="110" y1="28" x2="50" y2="30"/></g>
  <text x="200" y="45" font-size="7">→</text>
  <rect x="230" y="34" width="120" height="24" rx="4" fill="#24405e"/><text x="290" y="49" text-anchor="middle" fill="#fff" font-size="6.5">collective answer</text>
</svg>

- **The LLM realization:** rather than trust one model's single answer, spin up *several* agents (often the same model, different prompts/roles/seeds), have them **interact** — critique, build on, or debate each other's contributions (14-38 voting, 16-13 debate) — and derive the final answer from the interaction. The diversity of perspectives and the mutual checking surface errors and ideas a single pass misses.
- **Why interaction beats a single big call:** a lone model commits to one line of reasoning and its blind spots go unchecked. Multiple agents explore *different* lines (like Tree of Thoughts, 14-14, distributed across agents) and *challenge* each other, so the collective is more robust than any individual — the same logic as ensembles in classical ML (Booklet 1).
- **The cost and the caveat:** it multiplies calls (N agents, plus interaction rounds), so it is for problems where quality justifies the expense. And "more agents" is not automatically smarter — if the agents are near-identical and agree by default, you pay N× for one opinion (16-10's "just running one agent five times" trap). Diversity is what makes the society intelligent.

:::note
Society of Mind reframes intelligence as *emergent from interaction* rather than located in one powerful agent — a philosophically deep idea with a practical payoff: for hard problems, a *diverse, interacting* group of LLM agents can outperform a single call, because diversity explores more and mutual critique catches more. The engineering discipline is ensuring genuine diversity (different roles, prompts, or perspectives) and structured interaction (debate, voting), not just cloning one agent — otherwise you have a crowd of yes-men, which is expensive and no wiser than one.
:::
