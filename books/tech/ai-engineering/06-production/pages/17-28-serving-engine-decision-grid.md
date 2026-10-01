## The serving-engine decision grid

- Pull the cluster together into one grid you can reason from in an interview or a design doc.

<svg viewBox="0 0 360 128" role="img" aria-label="Grid placing managed APIs, vLLM, SGLang, and TensorRT-LLM by flexibility versus peak performance and operational cost" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="34" y1="110" x2="344" y2="110" stroke="#888"/><line x1="34" y1="12" x2="34" y2="110" stroke="#888"/>
  <text x="190" y="123" text-anchor="middle" font-size="6.5" fill="#6b6b6b">peak performance / ops cost →</text>
  <text x="20" y="60" font-size="6.5" fill="#6b6b6b" transform="rotate(-90 20 60)">flexibility →</text>
  <g text-anchor="middle">
   <rect x="44" y="22" width="72" height="24" rx="3" fill="#eef3ee" stroke="#3b7a57"/><text x="80" y="33" font-size="6">managed API</text><text x="80" y="42" font-size="5.5" fill="#6b6b6b">zero ops</text>
   <rect x="120" y="46" width="72" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="156" y="57" font-size="6">vLLM</text><text x="156" y="66" font-size="5.5" fill="#6b6b6b">default self-host</text>
   <rect x="196" y="60" width="72" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="232" y="71" font-size="6">SGLang</text><text x="232" y="80" font-size="5.5" fill="#6b6b6b">prefix-heavy</text>
   <rect x="272" y="80" width="76" height="24" rx="3" fill="#24405e"/><text x="310" y="91" font-size="6" fill="#fff">TensorRT-LLM</text><text x="310" y="100" font-size="5.5" fill="#cdd">peak on NVIDIA</text>
  </g>
</svg>

- **The default path.** Start on a managed API to ship. Move to **vLLM** self-host when volume justifies it. Switch a prefix-heavy workload to **SGLang**. Reserve **TensorRT-LLM** for the one or two high-volume, frozen models where the last efficiency slice pays for a build pipeline.
- **The one question that routes the decision:** *how much does the workload change, and how much is the last 20% of performance worth?* Stable + valuable → compile. Changing → interpret. Prefix-heavy → share.

:::interview
"Walk me through picking a serving stack for a new product."

Stage it. **Ship** on a managed API — no GPUs, fastest to market, learn real traffic. **Scale** to vLLM self-host once token volume clears the cost crossover on open weights. **Specialise**: route prefix-heavy paths (agents, RAG) to SGLang, and compile the highest-volume frozen model with TensorRT-LLM if profiling shows the efficiency gain beats the ops cost. Naming the *staging* — not jumping straight to "TensorRT-LLM because it's fastest" — is the senior signal.
:::
