## TensorRT-LLM: when to pay the tax

- TensorRT-LLM is the peak-performance option with the highest operational cost. Choose it deliberately.

| Choose TRT-LLM when | Avoid it when |
|---|---|
| you run **fixed** models on **NVIDIA** at large, steady scale | you swap models weekly or A/B many variants |
| the last 20–30% of latency/throughput is worth real ops effort | a small team without an inference specialist |
| you already run Triton/Dynamo and want tight integration | you need AMD/other hardware or portability |
| you serve a stable shape range (known batch/context) | your traffic shapes vary wildly |

- **The economic case:** at very high, steady volume on a locked model, a 20–30% efficiency edge is a large absolute dollar saving — enough to justify a build pipeline and a specialist. At small or shifting scale, that same edge is dwarfed by the engineering time spent maintaining engines, and vLLM ships faster.
- **It is not either/or in practice.** Many shops serve most traffic on vLLM for agility and reserve TensorRT-LLM for one or two high-volume, latency-critical models where the tax pays for itself.

:::note
The recurring lesson of this cluster: peak performance and operational agility trade off. vLLM optimises for *change* — new models, quick iteration, one command. TensorRT-LLM optimises for *scale on a frozen target* — squeeze a known model on known hardware. Interviewers want to hear you place the workload on that axis before naming an engine, not recite which is "fastest."
:::
