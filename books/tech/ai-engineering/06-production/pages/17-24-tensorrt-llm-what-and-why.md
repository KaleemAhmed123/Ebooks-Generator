## TensorRT-LLM: what and why

- **TensorRT-LLM** is NVIDIA's inference library. Its bet is different from vLLM's and SGLang's: instead of interpreting the model at run time, it **compiles** the model to a hardware-specific engine ahead of time — fusing kernels, picking optimal GEMM implementations, and baking in the precision — to squeeze the last drop of performance out of a specific NVIDIA GPU.
- The cost is a build step and NVIDIA lock-in. The reward is the highest peak throughput and lowest latency achievable on that exact hardware.

<svg viewBox="0 0 360 92" role="img" aria-label="TensorRT-LLM adds a compile step that turns a checkpoint into a hardware-specific engine before serving" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="40" width="58" height="22" rx="3" fill="#f4f4f4" stroke="#888"/><text x="39" y="51" text-anchor="middle" font-size="6">checkpoint</text><text x="39" y="59" text-anchor="middle" font-size="5.5" fill="#6b6b6b">HF weights</text>
  <rect x="96" y="34" width="70" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="131" y="47" text-anchor="middle" font-size="6">quantize +</text><text x="131" y="57" text-anchor="middle" font-size="6">trtllm-build</text>
  <rect x="196" y="40" width="66" height="22" rx="3" fill="#24405e"/><text x="229" y="51" text-anchor="middle" font-size="6" fill="#fff">.engine</text><text x="229" y="59" text-anchor="middle" font-size="5.5" fill="#cdd">GPU-specific</text>
  <rect x="292" y="40" width="58" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="321" y="51" text-anchor="middle" font-size="6">trtllm-serve</text>
  <path d="M68 51 L94 51" stroke="#888" marker-end="url(#tw)"/><path d="M166 51 L194 51" stroke="#888" marker-end="url(#tw)"/><path d="M262 51 L290 51" stroke="#888" marker-end="url(#tw)"/>
  <text x="131" y="80" text-anchor="middle" font-size="5.5" fill="#a03050">build once, per GPU + shape + precision</text>
  <defs><marker id="tw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- The engine is specialised to a GPU model, a precision (FP8/FP4/INT4), and a batch/sequence shape range. Change any of those and you rebuild. That is the essence of the tradeoff: **ahead-of-time specialisation buys speed and spends flexibility.**
- It ships `trtllm-serve` (an OpenAI-compatible server), a high-level `LLM` Python API, and integrates with NVIDIA's Triton / Dynamo serving stack for large deployments.

:::note
The three engines map to three philosophies. vLLM: *interpret and schedule cleverly at run time* (general, flexible). SGLang: *reuse prefixes aggressively* (workload-shaped). TensorRT-LLM: *compile to the metal* (peak performance, least flexibility). None is "best" — they sit at different points on the flexibility-vs-peak-performance curve.
:::
