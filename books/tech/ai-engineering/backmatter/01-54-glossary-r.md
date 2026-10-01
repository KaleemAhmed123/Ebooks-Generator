## Glossary: R

| Term | Means | In |
|---|---|---|
| **ResNet** | the 2015 architecture that made very deep networks trainable via residual connections | B2 |
| **resource indicators (RFC 8707)** | Binding OAuth tokens to a specific server so a stolen token cannot be replayed elsewhere | B5 |
| **resources (MCP)** | Data the host application can load into context (files, records) by URI; app-controlled | B5 |
| **Reverse mode** | autodiff that propagates slopes output-to-input; efficient for one output | B1 |
| **reviewer agent** | A separate, fresh-context agent that critiques another agent's output | B5 |
| **Reward hacking** | a policy exploiting flaws in the reward signal to score well without doing what was intended | B4 · B5 · B6 |
| **reward model** | A model trained to predict human preference scores, used as the reward signal in RLHF/PPO; an imperfect proxy that PPO can hack | B6 |
| **Reward model (RM)** | a model trained on human preference pairs to predict a reward, supplying RL with a signal | B4 |
| **ReWOO** | Plan-and-execute variant where all steps are planned up front referencing each other's outputs, minimising LLM calls | B5 |
| **RLAIF (RL from AI feedback)** | replacing the human preference labeller with an LLM judging answers against rules | B4 · B6 |
| **RLHF** | reinforcement learning from human feedback; aligns chat models | B1 |
| **RLHF (RL from human feedback)** | aligning a model in three stages: SFT, a reward model from human preferences, then PPO | B4 |
