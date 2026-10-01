## DPO has several successors (KTO, ORPO, SimPO, IPO). What does each fix?

- They all tweak DPO's objective to fix a specific weakness. [VERIFY: all four against current literature on the fact pass.]
  - **IPO** — DPO can **overfit** when preferences are near-deterministic (it pushes the margin to infinity). IPO adds regularisation so the margin stays bounded.
  - **KTO** — needs only **unpaired** labels ("this output was good/bad"), not chosen-vs-rejected pairs. Far cheaper data collection, inspired by prospect theory.
  - **ORPO** — folds preference optimisation **into SFT** with an odds-ratio penalty, so you skip the separate reference model and do alignment in one stage.
  - **SimPO** — removes the reference model and uses **length-normalised** reward, fixing DPO's bias toward longer responses.
- Common themes: cut the data cost (KTO), remove the reference model (ORPO, SimPO), or stabilise the objective (IPO). Pick based on what's expensive for you — data, compute, or stability.

:::interview
What's really being tested:

that you don't treat "DPO" as one thing — you know the axes these variants move on (paired vs unpaired data, reference-free, length bias, overfitting).
:::
