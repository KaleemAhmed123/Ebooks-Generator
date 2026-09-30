## METR and task-horizon

- **METR** (Model Evaluation & Threat Research) is an independent nonprofit that evaluates frontier models for dangerous *autonomous* capabilities — and produced the **task-horizon** metric (15-03) that has become the field's clearest measure of agentic progress. **[VERIFY current figures]**

<svg viewBox="0 0 360 88" role="img" aria-label="The length of task a model can autonomously complete has grown roughly exponentially over time" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="34" y1="70" x2="345" y2="70" stroke="#888"/><line x1="34" y1="10" x2="34" y2="70" stroke="#888"/>
  <g fill="#24405e"><circle cx="70" cy="64" r="3"/><circle cx="130" cy="56" r="3"/><circle cx="190" cy="44" r="3"/><circle cx="250" cy="30" r="3"/><circle cx="310" cy="18" r="3"/></g>
  <path d="M70 64 L130 56 L190 44 L250 30 L310 18" stroke="#24405e" fill="none"/>
  <text x="22" y="42" font-size="5.5" fill="#6b6b6b" transform="rotate(-90 22 42)">task length (log)</text>
  <text x="190" y="84" text-anchor="middle" font-size="6" fill="#6b6b6b">time / model generation →</text>
  <text x="300" y="12" font-size="5.5" fill="#24405e">~doubling</text>
</svg>

- **Task horizon defined precisely:** the length of task — measured by *how long it takes a skilled human* — that a model can complete autonomously at a given success rate (commonly 50%). A model with a "1-hour horizon" can do, unattended and roughly half the time, tasks that take a person about an hour.
- **The finding that matters:** this horizon has been **growing roughly exponentially**, reportedly *doubling* on a regular cadence (on the order of months). If that trend continues, agents move from minute-scale to hour-scale to day-scale autonomous tasks — the difference between automating sub-steps and automating jobs (15-03). It is the single most-cited number for forecasting agentic AI's trajectory.
- **Why an independent evaluator:** METR is *not* a lab shipping the models, which is exactly the point of 15-33's warning — external evaluation is harder to bias, gives the frameworks credibility, and provides a consistent yardstick across labs' models. The responsible-scaling frameworks increasingly rely on such third-party evals as part of the trigger for safeguards.

:::interview
**"What is the task-horizon metric and why does it matter?"** It's the length of task — measured by how long a skilled human takes — that a model can complete autonomously at some success rate (often 50%). METR popularized it, and the striking finding is that this horizon has been growing roughly exponentially, doubling every several months. It matters because it directly tracks the thing that determines agents' economic and safety impact: sustained, reliable, unsupervised work. A minute-scale horizon automates sub-tasks; an hour- or day-scale horizon automates jobs. It's the clearest single indicator of where autonomous agents are headed, and it comes from an *independent* evaluator, which is what gives it credibility.
:::
