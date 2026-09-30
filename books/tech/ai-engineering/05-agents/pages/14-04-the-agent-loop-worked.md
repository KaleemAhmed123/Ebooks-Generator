## The agent loop, worked

- One real run of the loop, traced turn by turn. Goal: *"What's the population of the capital of France, times two?"* Tools: `search`, `calculator`.

:::mint
```text
turn 1  THINK   → tool_use: search("capital of France")
        ACT     → run search
        OBSERVE ← "Paris is the capital of France."
turn 2  THINK   → tool_use: search("population of Paris")
        ACT     → run search
        OBSERVE ← "Paris population ≈ 2,100,000 (city proper)."
turn 3  THINK   → tool_use: calculator("2100000 * 2")
        ACT     → run calculator
        OBSERVE ← "4200000"
turn 4  THINK   → text: "About 4.2 million." (no tool → STOP)
```
:::

- **Notice the decomposition happened at runtime.** Nobody coded "search capital, then search population, then multiply." The model *decided* that sequence, each step chosen after seeing the last result. That is agency — and it is why the same agent handles "…of Japan, times three?" with no code change.
- **Notice the dependencies.** Turn 2 needed turn 1's answer ("Paris") to form its query; turn 3 needed turn 2's number. These are *sequential by nature* — the model could not parallelize them (13-08), because each depends on the previous observation.
- **Four model calls for one question.** Each turn is a full model call with the whole growing transcript. An agent's cost is (turns × context size), not one call — the core economics of agents.

<svg viewBox="0 0 360 66" role="img" aria-label="Four turns, each a model call, chaining search, search, calculator, then a final answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="24" width="70" height="20" rx="3" fill="#24405e"/><text x="45" y="37" text-anchor="middle" fill="#fff">search cap.</text>
  <rect x="98" y="24" width="70" height="20" rx="3" fill="#24405e"/><text x="133" y="37" text-anchor="middle" fill="#fff">search pop.</text>
  <rect x="186" y="24" width="70" height="20" rx="3" fill="#24405e"/><text x="221" y="37" text-anchor="middle" fill="#fff">calculator</text>
  <rect x="274" y="24" width="76" height="20" rx="3" fill="#1a3a2a"/><text x="312" y="37" text-anchor="middle" fill="#fff">answer</text>
  <path d="M80 34 L96 34" stroke="#888" marker-end="url(#lw)"/><path d="M168 34 L184 34" stroke="#888" marker-end="url(#lw)"/><path d="M256 34 L272 34" stroke="#888" marker-end="url(#lw)"/>
  <defs><marker id="lw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

:::interview
**"How does an agent break a task into steps?"** It doesn't plan the whole thing up front (unless it's a plan-and-execute agent). In the basic loop it decides *one step at a time*: think → call a tool → observe → decide the next step from what it learned. The decomposition emerges turn by turn, each step conditioned on the last observation. That is why agents handle tasks you didn't script — and why they cost one model call per step.
:::
