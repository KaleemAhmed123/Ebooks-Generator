## Evaluating during training

- Training loss falls smoothly and tells you almost nothing about whether the model is *good*. You need separate evaluation to steer the run and decide when to stop. Two kinds.

<svg viewBox="0 0 322 70" role="img" aria-label="Intrinsic evaluation tracks loss and perplexity during training; extrinsic evaluation runs benchmarks on checkpoints" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="14" width="140" height="44" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="78" y="28" text-anchor="middle" font-size="8" fill="#24405e">intrinsic</text><text x="78" y="41" text-anchor="middle">loss · perplexity</text><text x="78" y="51" text-anchor="middle" fill="#6b6b6b">cheap, every step</text>
  <rect x="174" y="14" width="140" height="44" rx="3" fill="#24405e"/><text x="244" y="28" text-anchor="middle" font-size="8" fill="#fff">extrinsic</text><text x="244" y="41" text-anchor="middle" fill="#fff">benchmarks · tasks</text><text x="244" y="51" text-anchor="middle" fill="#ccd">costly, on checkpoints</text>
</svg>

- **Intrinsic** — loss and **perplexity** on held-out text. Cheap, computed continuously. Good for catching divergence and comparing runs, but a lower perplexity does not guarantee a more useful model.
- **Extrinsic** — run the checkpoint on real tasks: **MMLU** (broad knowledge), **GSM8K** (grade-school math), **HumanEval** (code), and instruction-following suites. This is what you actually care about, but it is slow, so you run it on saved checkpoints, not every step.
- Modern practice adds **LLM-as-a-judge** (Booklet 3, page 05-36): a strong model grades open-ended answers, giving a fast proxy for human preference on tasks with no exact answer.

:::note
Watch the **gap** between train loss and held-out loss. Held-out loss flattening or rising while train loss keeps falling is overfitting — the model is memorising, not learning. On finite data this decides when to stop.
:::

:::warn
Benchmarks get **contaminated** and **gamed**. If test questions leaked into training (page 10-03), scores are fiction. And a model tuned to ace MMLU can still be a poor assistant. Never trust a single number — evaluate on a mix, keep a private held-out set, and confirm with real usage before believing a model is better.
:::
