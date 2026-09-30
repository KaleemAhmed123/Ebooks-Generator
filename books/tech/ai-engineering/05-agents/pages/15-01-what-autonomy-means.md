# Autonomous Systems

## What autonomy means

- Module 14 built agents that act. This module asks: **how much do we let them act *without us*?** Autonomy is the degree to which an agent pursues a goal — deciding, acting, recovering — with no human in the loop. It is a dial, not a switch, and turning it up multiplies both value and risk.

<svg viewBox="0 0 360 100" role="img" aria-label="As autonomy rises, capability and value rise but so do risk and the need for safeguards" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="80" x2="345" y2="80" stroke="#888"/><line x1="30" y1="12" x2="30" y2="80" stroke="#888"/>
  <path d="M30 74 L340 20" stroke="#1a3a2a" stroke-width="1.5"/><text x="250" y="30" font-size="6" fill="#1a3a2a">value / capability</text>
  <path d="M30 76 Q200 70 340 30" stroke="#a03050" stroke-width="1.5" fill="none"/><text x="250" y="58" font-size="6" fill="#a03050">risk (rises faster)</text>
  <text x="185" y="94" text-anchor="middle" font-size="6" fill="#6b6b6b">autonomy →</text>
</svg>

- **Why autonomy is the frontier:** a supervised agent (a human approves each step) is safe but slow and does not scale — you are still in the loop for everything. An autonomous agent that runs for hours or days unattended is where the *leverage* is: it does work while you sleep. But every human gate you remove is a safeguard you must replace with engineering.
- **The central tension of this module:** capability and risk both grow with autonomy, and **risk grows faster** — because an autonomous agent's mistakes are unsupervised, compounding (14-125), and possibly acting on the world before anyone notices. So the module is half *how to build more autonomy* (self-improvement, long-horizon, coding/browser agents) and half *how to make autonomy safe* (durable execution, kill switches, guardrails, responsible scaling).

:::note
The mental frame: autonomy is not free capability — it is capability *traded for control*. Every safeguard in this module (kill switches, cost governors, propose-then-commit, canaries, safety classifiers) exists to buy back some control you gave up by removing a human. The engineering question is never "fully autonomous or not?" but "how much autonomy does this task justify, and what must I build to make *that much* safe?"
:::
