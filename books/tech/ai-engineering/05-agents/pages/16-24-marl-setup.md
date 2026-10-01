## Multi-agent reinforcement learning

- **Multi-agent reinforcement learning (MARL)** extends the RL of Booklet 4 to *multiple learning agents* sharing an environment. Instead of hand-designing coordination, agents *learn* to cooperate (or compete) through reward. It is how you get emergent teamwork in games, robotics, and simulations — and it is fundamentally harder than single-agent RL. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="Multiple agents each take actions in a shared environment and receive rewards, learning policies together" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <circle cx="50" cy="34" r="14" fill="#24405e"/><text x="50" y="37" text-anchor="middle" fill="#fff" font-size="5.5">agent 1</text>
  <circle cx="50" cy="72" r="14" fill="#6a9bd0"/><text x="50" y="75" text-anchor="middle" fill="#fff" font-size="5.5">agent 2</text>
  <rect x="150" y="34" width="120" height="38" rx="5" fill="#eaf6ea" stroke="#1a3a2a"/><text x="210" y="50" text-anchor="middle" font-size="6.5">shared environment</text><text x="210" y="62" text-anchor="middle" font-size="5.5" fill="#6b6b6b">actions change it for all</text>
  <g stroke="#888"><path d="M64 38 L148 46" marker-end="url(#ma)"/><path d="M64 68 L148 62" marker-end="url(#ma)"/></g>
  <g stroke="#1a3a2a"><path d="M148 52 L66 40" marker-end="url(#ma2)"/><path d="M148 58 L66 70" marker-end="url(#ma2)"/></g>
  <text x="110" y="26" font-size="5" fill="#6b6b6b">actions →</text><text x="110" y="86" font-size="5" fill="#1a3a2a">← rewards/obs</text>
  <defs><marker id="ma" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker><marker id="ma2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a3a2a"/></marker></defs>
</svg>

- **The setup:** several agents each observe the environment, take actions, and receive rewards — but their actions *jointly* determine what happens, so each agent's outcome depends on what the *others* do. They can be **cooperative** (shared reward — a team), **competitive** (opposing rewards — a game), or **mixed**.
- **Why it is much harder than single-agent RL — two core problems:**
  - **Non-stationarity.** In single-agent RL the environment is fixed while the agent learns. In MARL, *every agent is learning simultaneously*, so from any one agent's view the environment (which includes the other agents) is *constantly changing* — a moving target. The ground shifts as everyone adapts, which can prevent convergence.
  - **Credit assignment.** When a *team* gets a reward, which agent's actions deserve the credit (or blame)? With a shared reward, an agent cannot easily tell if *it* helped or a teammate did — making it hard to learn the right individual behavior.
- These two problems are the reason MARL needs specialized algorithms (16-26) rather than just running single-agent RL per agent.

:::interview
"Why is multi-agent RL harder than single-agent RL?"

Two core reasons. Non-stationarity: in single-agent RL the environment is fixed while you learn, but in MARL every agent learns simultaneously, so from each agent's perspective the environment (which includes the others) keeps changing — a moving target that can break convergence. And credit assignment: when a team shares a reward, it's hard for an agent to tell whether *its* action or a teammate's caused the outcome, so learning the right individual behavior is difficult. These don't exist in single-agent RL, which is why MARL needs specialized algorithms and training schemes rather than just running independent learners.
:::
