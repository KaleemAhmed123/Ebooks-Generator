## CUDA graphs and warmup

- A subtle serving cost hides between the model and the GPU: **launch overhead.** Each GPU operation is dispatched from the CPU, and for the many small kernels of a decode step, that CPU-side dispatch can take *longer than the GPU work itself* — the GPU sits idle waiting to be told what to do next.
- **CUDA graphs** fix this: capture the whole sequence of kernel launches for a forward pass *once*, then replay the captured graph as a single unit — eliminating the per-kernel CPU dispatch overhead on every subsequent step.

<svg viewBox="0 0 360 78" role="img" aria-label="Without CUDA graphs, CPU dispatch gaps between kernels leave the GPU idle; with graphs, the captured sequence replays with no gaps" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6" fill="#a03050">without graphs</text>
  <g fill="#a03050"><rect x="20" y="20" width="18" height="12"/><rect x="52" y="20" width="18" height="12"/><rect x="84" y="20" width="18" height="12"/></g>
  <text x="150" y="30" font-size="5.5" fill="#a03050">gaps = CPU dispatch, GPU idle</text>
  <text x="90" y="52" text-anchor="middle" font-size="6" fill="#1a3a2a">with graphs</text>
  <g fill="#1a3a2a"><rect x="20" y="58" width="18" height="12"/><rect x="38" y="58" width="18" height="12"/><rect x="56" y="58" width="18" height="12"/></g>
  <text x="150" y="68" font-size="5.5" fill="#1a3a2a">captured sequence, no gaps</text>
</svg>

- **The decode-step win is real** because decode runs the same small-kernel sequence thousands of times per request — exactly the pattern graphs optimise. Serving engines (vLLM, TensorRT-LLM) capture decode graphs by default; it's a meaningful chunk of their throughput.
- **Warmup is the prerequisite and a cold-start cost.** Graphs must be *captured* (and `torch.compile` kernels compiled) for each batch-size/shape the server will use — done at startup, which is part of why a cold pod takes tens of seconds beyond just loading weights (17-34). A pod isn't truly ready until its graphs are warm (17-51a).

:::note
This is the layer below the algorithms: PagedAttention and continuous batching decide *what* to compute; CUDA graphs and kernel fusion decide how efficiently the *how* reaches the GPU. You rarely touch it directly — the engines handle it — but it explains two things you *do* see: why cold start includes a warmup phase (capturing graphs for each shape), and why the first few requests to a fresh pod are slower (graphs not yet captured for their shapes). "Ready" for a GPU pod means weights loaded *and* graphs warm, which is why readiness probes (17-51a) test a real generation, not just a port.
:::
