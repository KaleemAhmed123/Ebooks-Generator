## How do multiple agents communicate, and does debate improve answers?

- Agents coordinate by exchanging messages — the patterns range from structured protocols (contract-net: announce a task, agents bid, award the winner) to free-form **group chat** with a speaker-selection policy, to a shared **blackboard** they all read/write.
- **Multi-agent debate / discussion:** several agents independently answer, then critique and revise over rounds, converging on a consensus. **Mixture-of-Agents** aggregates several models' outputs through layers.
- Does it help? Sometimes: debate/aggregation can improve factuality and reduce individual errors on reasoning tasks by surfacing disagreement. But it costs many calls and can **converge on a confident wrong answer** (groupthink) or amplify a shared bias.
- Honest stance: debate/aggregation is a **reliability technique with real but inconsistent gains** at high cost — useful for high-stakes reasoning where you can afford it, not a default.

:::interview
What's really being tested: that you know the communication patterns (contract-net, group chat, blackboard) and that debate/aggregation helps sometimes but is costly and can groupthink — not a guaranteed win.
:::
