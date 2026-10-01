## "An AI product's costs are running way over budget. How do you respond?"

- **What they're screening for:** cost-ownership and a structured optimisation approach — AI costs are usage-driven and can surprise you.
- **A strong answer shows:**
  - **Measure first** — attribute cost by feature/endpoint/user to find *where* the money goes; usually a few endpoints or a loop bug dominate. Don't optimise blind.
  - **Stop the bleeding** — if it's a runaway (an agent loop, a retry storm, a bug), cap it immediately with budgets/step limits.
  - **Apply the levers in order of leverage** — model right-sizing/routing, token reduction (prompt/context trim, output caps), prompt + semantic caching, batch APIs for async work, then self-host at volume.
  - **Protect quality** — validate with evals that cost cuts don't tank quality; it's a tradeoff to measure, not a blind slash.
  - **Make it sustainable** — budgets, alerts, and unit-economics tracking so it doesn't recur; check cost per request against value per request.
- The theme: **attribute → stop runaways → optimise highest-leverage endpoints → guard quality → monitor**.

:::warn
Weak: "Switch to a cheaper model everywhere." Strong: attribute the spend, kill any runaway, apply routing/caching/token-trimming where cost concentrates, verify quality held, and add budgets to prevent recurrence.
:::

:::interview
What's really being tested: cost ownership — measure/attribute first, stop runaways, optimise by leverage while guarding quality, and institute budgets — not a blind cheap-model swap.
:::
