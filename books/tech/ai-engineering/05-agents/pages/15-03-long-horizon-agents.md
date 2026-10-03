## Long-horizon agents

- A **long-horizon** agent works on a task for a long time — many steps, minutes to hours to days — without finishing in one short loop. Long-horizon autonomy is where agents become economically transformative (they do whole *jobs*, not single steps) and where reliability is hardest (error compounding, 14-125).

<svg viewBox="0 0 360 88" role="img" aria-label="Task horizon: how long an agent can work autonomously before failing, growing over model generations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="64" x2="345" y2="64" stroke="#888"/><line x1="30" y1="12" x2="30" y2="64" stroke="#888"/>
  <path d="M30 60 Q150 50 250 30 Q300 20 340 16" stroke="#24405e" stroke-width="1.5" fill="none"/>
  <text x="20" y="40" font-size="6" fill="#6b6b6b" transform="rotate(-90 20 40)">task length</text>
  <text x="185" y="78" text-anchor="middle" font-size="6" fill="#6b6b6b">model generations →</text>
  <text x="250" y="26" font-size="6" fill="#24405e">minutes → hours → …</text>
</svg>

- **The "task horizon" metric** (from METR, 15-35): the length of task — measured in how long it takes a *human* — that an agent can complete autonomously at some success rate. As models improve, this horizon has been *growing*: from tasks of seconds/minutes toward tasks of hours. It is a crisp way to track real autonomous capability, and it has been roughly *doubling* on a regular cadence.
- **Why long horizons are so hard:** error compounding (14-125) means per-step reliability must be extremely high to survive hundreds of steps; the agent must manage its own context (14-86) over a huge transcript; it must stay on-goal without drifting (14-126); and it must recover from failures autonomously, because no human is watching each step.
- **What makes them possible:** everything in Module 14's workbench — verification gates (high per-step reliability), smallest slices (short sub-chains), subagents (context isolation), checkpoints (resume on failure), and memory (carry state across the long run). Long-horizon autonomy is the workbench applied at scale.

:::note
Task horizon is arguably the single most important number for forecasting AI's economic impact. A model that reliably does 10-minute tasks automates sub-tasks; one that reliably does 8-hour tasks automates *jobs*. Watching this metric — how long an agent can work unattended before it fails — tells you more about where agents are headed than any single benchmark score, because it measures the thing that actually matters for autonomy: sustained, reliable, unsupervised work.
:::
