# AI Engineering: From Scratch

## Reinforcement Learning

Language modeling predicts the next token. Reinforcement Learning (RL) maximizes long-term reward. Without RL, LLMs would just be autocomplete engines; RL makes them helpful assistants.

### Markov Decision Processes (MDPs)

RL frames the world as an MDP:
1. **State ($S$):** The current situation (e.g., the chat history).
2. **Action ($A$):** The move the agent makes (e.g., generating the next token).
3. **Reward ($R$):** The score received for that action.

The goal of the agent is to learn a **Policy ($\pi$)**—a function that maps States to the Actions that yield the highest expected future reward.

### PPO (Proximal Policy Optimization)

PPO is the standard algorithm used to align LLMs. It is an Actor-Critic method:
- **The Actor:** The LLM itself, generating tokens.
- **The Critic:** A separate network evaluating how "good" those tokens are.

If the Actor tries a new, high-reward behavior, PPO updates the policy. Crucially, the "Proximal" in PPO prevents the model from changing its policy *too much* in a single step, ensuring training remains stable.
