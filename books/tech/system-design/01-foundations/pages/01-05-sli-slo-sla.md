## SLI, SLO, SLA

- Three words that get used as one. They are three different jobs

| Term | What it is | Example |
|---|---|---|
| **SLI** — service level indicator | the measurement | fraction of requests answered under 300 ms |
| **SLO** — service level objective | the target for that measurement | 99.9% of requests under 300 ms, over 30 days |
| **SLA** — service level agreement | the contract, with consequences for missing it | credit 10% of the bill if the SLO is missed |

- No SLI, no SLO. An objective with nothing measuring it is a wish
- The SLO is stricter than the SLA. Google's SRE book (**site reliability engineering**, its name for running production): keep a safety margin, and do not overachieve, because users come to depend on the level you actually deliver

### The error budget

- The **error budget** is the gap between the SLO and 100%. At 99.9% over 30 days it is about 43 minutes of bad requests
- It is a budget to *spend*: on deploys, experiments, risky migrations. Budget left means ship; budget gone means stop shipping and fix reliability
- That turns "is it safe to deploy" from an argument into a number

### The failure

- An SLA signed with no SLI behind it. Nobody can prove it was met or missed. The first dispute is settled by whoever has more lawyers
- An SLO on a mean. "Average latency 200 ms" can be met while a tenth of users wait two seconds. The next page is why

:::interview
"How would you know the system is working?" is an SLI question. Name the indicator, the target, and the window. Then say what you would do when the budget runs out.
:::
