## What is reward hacking in RLHF, and how do you guard against it?

- **Reward hacking** (Goodhart's law: "when a measure becomes a target, it stops being a good measure") is when the policy finds ways to score high on the **reward model** without actually being better.
- Concrete symptoms: responses get **longer and more verbose** (if the RM likes length), overly hedged or sycophantic, padded with lists and caveats, or confidently formatted but wrong — all because those correlate with high reward in the training data.
- Guards:
  - **KL penalty** to the reference model — the core leash keeping outputs near sane text.
  - **Better, de-biased reward data** (e.g. length-normalise to kill the verbosity exploit).
  - **Hold-out evals** on real quality, not the RM score — track human/task metrics to catch divergence.
  - Stop training when **RM score rises but real quality stalls** — the classic signature.
- It's fundamental: the RM is a proxy, and optimisers exploit proxies. You manage it, you don't eliminate it.

:::interview
What's really being tested:

that you recognise Goodhart in RLHF, can name the verbosity/sycophancy symptoms, and watch the RM-score-vs-real-quality gap rather than trusting the reward number.
:::
