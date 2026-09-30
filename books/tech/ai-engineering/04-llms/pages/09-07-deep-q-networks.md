## Deep Q-networks

- Replace the Q-table with a neural network: `Q(s, a; θ)`, weights `θ`. Now the state can be anything a network eats — raw pixels, sensor readings. This is the **deep Q-network (DQN)**, the 2015 result that learned Atari games from pixels alone.
- The network is trained by gradient descent to make its Q-prediction match the TD target `r + γ·max Q(s', a')`. But naive training diverges. DQN adds two tricks that made deep RL work at all.

:::note
**Replay buffer** — store past `(s, a, r, s')` transitions and train on random mini-batches of them. This breaks the correlation between consecutive frames (Booklet 2: gradient descent assumes independent samples). **Target network** — a frozen copy of the weights that computes the TD target, updated only every few thousand steps, so the target you chase doesn't move every step.
:::

<svg viewBox="0 0 320 66" role="img" aria-label="Environment fills a replay buffer; random batches train the Q-network against a slow target network" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="24" width="60" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="37" text-anchor="middle">env</text>
  <rect x="92" y="24" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="128" y="37" text-anchor="middle">replay buffer</text>
  <rect x="188" y="24" width="60" height="20" rx="3" fill="#24405e"/><text x="218" y="37" text-anchor="middle" fill="#fff">Q-net θ</text>
  <rect x="188" y="50" width="124" height="14" rx="3" fill="none" stroke="#c0392b"/><text x="250" y="60" text-anchor="middle" fill="#c0392b" font-size="7">target net (frozen copy)</text>
  <path d="M68 34 L90 34" stroke="#1a1a1a" marker-end="url(#q)"/><path d="M164 34 L186 34" stroke="#1a1a1a" marker-end="url(#q)"/>
  <text x="128" y="18" text-anchor="middle" fill="#6b6b6b">random batch</text>
  <defs><marker id="q" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- DQN and its descendants (Double DQN, Dueling DQN, Rainbow) dominate **discrete-action** problems — a fixed menu of moves.

:::warn
DQN needs `max_a Q(s,a)` — a search over all actions. Fine for 18 Atari buttons, impossible when the action is "which of 100,000 tokens comes next," or a steering angle from a continuous range. For huge or continuous action spaces you must learn the **policy directly** — the next page.
:::
