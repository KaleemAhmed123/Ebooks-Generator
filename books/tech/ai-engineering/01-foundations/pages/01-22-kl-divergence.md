## KL divergence: distance between distributions

- **Kullback–Leibler (KL) divergence** measures how different one probability distribution is from another. Read `KL(p ‖ q)` as "how much q loses when used in place of the true p."
- It is 0 when the two distributions are identical, and grows as they diverge.

$$ \text{KL}(p \parallel q) = \sum_i p_i \log \frac{p_i}{q_i} $$

### Two properties that matter in practice

- **Not symmetric.** `KL(p ‖ q) ≠ KL(q ‖ p)`. It is not a true distance; the order of the arguments changes the answer and the behaviour.
- **Cross-entropy = entropy + KL.** Minimizing cross-entropy loss (last page) is the same as minimizing the KL divergence from the model to the truth. The two are the same objective in different clothes.

:::note
KL divergence is the control knob for keeping a model close to a reference. It reins in fine-tuning so a model does not drift too far from its base, and it is the leash in RLHF (reinforcement learning from human feedback) — the technique that aligns chat models — stopping the model from gaming the reward by wandering off into nonsense.
:::

:::warn
Because it is asymmetric, `KL(p ‖ q)` blows up wherever the true `p` has probability but the model `q` assigns near zero. A model that rules out a real outcome entirely is punished infinitely — which is why models keep a little probability on everything.
:::
