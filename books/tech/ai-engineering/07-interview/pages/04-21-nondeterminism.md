## Why can an LLM give different answers at temperature 0, which should be deterministic?

- Temperature 0 (greedy) is deterministic **in theory** — always pick the argmax. In practice outputs still vary, for reasons below the sampling layer:
  - **Floating-point non-associativity + parallel reductions:** GPU matmuls sum in a nondeterministic order, so tiny rounding differences change which token is the argmax when two are near-tied.
  - **Batching effects:** your request may be batched with others differently each time, changing kernels/reduction order and thus the rounding.
  - **MoE routing** can depend on batch composition.
  - **Backend/version drift:** the provider changes hardware, kernels, or the model behind the endpoint.
- Consequences: never assume bit-exact reproducibility from a hosted LLM; **pin versions**, and for tests assert on **semantics/structure**, not exact strings.

:::warn
"Set temperature 0 for reproducible outputs" is only approximately true. For real determinism you need fixed hardware, fixed batch, fixed kernels, and a pinned model — rarely available via an API.
:::

:::interview
What's really being tested:

that you understand nondeterminism comes from floating-point/parallel reduction order and batching, not the sampler — a senior "why is my eval flaky" insight.
:::
