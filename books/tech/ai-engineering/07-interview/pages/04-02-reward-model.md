## What is a reward model, and how is it trained?

- A **reward model (RM)** takes a prompt and a response and outputs a scalar **score** — a learned stand-in for human judgment, so you can score millions of responses without asking a human each time.
- Training data: human **comparisons**. For a prompt, a labeller picks which of two responses is better. The RM is trained (usually from the SFT model + a scalar head) with a **pairwise loss** that pushes the preferred response's score above the rejected one's.
- It learns *relative* preference, not an absolute truth — scores are only meaningful by comparison.
- The RM is the weak link: it's a model approximating fuzzy human taste, so it can be **gamed** (reward hacking) and drifts out-of-distribution as the policy explores. This is why RLHF keeps a KL leash and why reward-model quality caps alignment quality.

:::interview
What's really being tested:

that an RM is trained from pairwise comparisons to output a relative score, and that its imperfection is the central vulnerability of RLHF.
:::
