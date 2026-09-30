## Q-learning and SARSA

- **Temporal-difference (TD) learning** is the fix for Monte-Carlo's wait: update after **one step**, using your own current estimate of the next state as a stand-in for the full future. Learn from a guess, then improve the guess.
- Applied to Q-values, this gives the two most famous tabular RL algorithms.

:::mint
```
Q-learning (off-policy):
  Q(s,a) += α [ r + γ·max_a' Q(s',a') − Q(s,a) ]
SARSA (on-policy):
  Q(s,a) += α [ r + γ·Q(s',a')       − Q(s,a) ]   a' = the action actually taken
```
The bracket is the TD error: reality minus current guess.
:::

- **Q-learning is off-policy** — it learns the value of the *best* next action (`max`), even while behaving more randomly to explore. **SARSA is on-policy** — it learns the value of the action it *actually* took next.
- Both explore with **ε-greedy**: act greedily most of the time, but with probability ε pick a random action to keep discovering.

<svg viewBox="0 0 320 52" role="img" aria-label="Q-learning bootstraps the best next action while SARSA uses the action actually taken" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="80" y="14" text-anchor="middle" fill="#24405e">Q-learning: uses max Q(s',·)</text>
  <text x="80" y="30" text-anchor="middle" fill="#6b6b6b" font-size="7">learns optimal, explores freely</text>
  <line x1="160" y1="6" x2="160" y2="46" stroke="#ccc"/>
  <text x="245" y="14" text-anchor="middle" fill="#c0392b">SARSA: uses Q(s',a') taken</text>
  <text x="245" y="30" text-anchor="middle" fill="#6b6b6b" font-size="7">learns the safe path it walks</text>
</svg>

- The difference matters near danger. On a cliff-edge task, SARSA learns a cautious path (it accounts for its own random slips), Q-learning learns the optimal edge-walk (it assumes perfect future play).

:::warn
A Q-**table** needs one cell per state–action pair. Fine for grid worlds, hopeless for images or text where states are effectively infinite. The next page swaps the table for a neural network.
:::
