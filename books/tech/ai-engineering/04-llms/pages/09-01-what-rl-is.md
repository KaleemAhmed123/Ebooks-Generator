# Reinforcement Learning

## What reinforcement learning is

- Supervised learning (Booklets 2–3) needs the right answer for every example. **Reinforcement learning (RL)** needs no answers — only a **reward** signal that says how well things are going.
- An **agent** takes an **action** in an **environment**, the environment returns a new **state** and a **reward**, and the agent learns to act so total reward is highest.

<svg viewBox="0 0 320 92" role="img" aria-label="The agent sends an action to the environment, which returns a new state and a reward" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="30" y="34" width="80" height="26" rx="4" fill="#24405e"/><text x="70" y="51" text-anchor="middle" fill="#fff">agent</text>
  <rect x="210" y="34" width="90" height="26" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="255" y="51" text-anchor="middle" fill="#24405e">environment</text>
  <path d="M110 42 C160 22, 160 22, 210 42" stroke="#1a3a2a" fill="none" marker-end="url(#r)"/>
  <text x="160" y="20" text-anchor="middle" fill="#1a3a2a">action</text>
  <path d="M210 54 C160 76, 160 76, 110 54" stroke="#c0392b" fill="none" marker-end="url(#r)"/>
  <text x="160" y="84" text-anchor="middle" fill="#c0392b">new state + reward</text>
  <defs><marker id="r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The classic examples: a program learning to play chess (reward = win), a robot learning to walk (reward = distance), a recommender learning what to show (reward = clicks).
- No one tells the agent the best move. It **tries, observes the reward, and adjusts** — learning by consequence, like training a dog with treats.

:::note
Why RL is in an LLM book: the last step of aligning a chat model — **RLHF** (reinforcement learning from human feedback) — is RL. The reward is "did a human prefer this answer?". Everything in this module builds to that.
:::

:::warn
RL's hard problem is **credit assignment**: a reward arrives long after the action that earned it. Win a chess game in 40 moves — which move won it? RL has to spread one late reward back across many earlier actions, and getting that wrong is why RL is famously unstable.
:::

:::note
**How to read this module.** The next pages build RL's vocabulary on small grid-world problems — states, value, the Bellman equation, Q-learning, DQN. That half teaches the *mental model*; you will never write those algorithms for an LLM. The path that actually trains chat models is **policy-based**: value & policy → policy gradients → actor-critic → PPO/GRPO → reward model → RLHF. Read the grid-world pages for intuition, not to memorize; slow down when the policy-based pages begin.
:::
