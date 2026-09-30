## Managed vs self-host: the fork

- The first decision splits everything downstream: **call someone else's endpoint** (OpenAI, Anthropic, or a hyperscaler like AWS Bedrock) or **run the weights yourself** on GPUs you rent or own.
- Managed means you pay per token and never touch a GPU. Self-host means you rent GPUs, run a serving engine, and own the uptime. The tradeoff is control and unit-cost versus operational burden.

<svg viewBox="0 0 360 110" role="img" aria-label="Decision axis from fully managed API to fully self-hosted, with control and burden rising to the right" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <line x1="20" y1="30" x2="340" y2="30" stroke="#888"/>
  <text x="20" y="20" font-size="6.5" fill="#6b6b6b">less control, less burden</text><text x="255" y="20" font-size="6.5" fill="#6b6b6b">more control, more burden</text>
  <g text-anchor="middle">
   <rect x="16" y="36" width="72" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="52" y="47" font-size="6.5">provider API</text><text x="52" y="56" font-size="5.5" fill="#6b6b6b">OpenAI/Anthropic</text>
   <rect x="98" y="36" width="72" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="134" y="47" font-size="6.5">hyperscaler</text><text x="134" y="56" font-size="5.5" fill="#6b6b6b">Bedrock/Vertex</text>
   <rect x="180" y="36" width="72" height="24" rx="3" fill="#eef3f8" stroke="#24405e"/><text x="216" y="47" font-size="6.5">inference platform</text><text x="216" y="56" font-size="5.5" fill="#6b6b6b">Fireworks/Baseten</text>
   <rect x="262" y="36" width="82" height="24" rx="3" fill="#24405e"/><text x="303" y="47" font-size="6.5" fill="#fff">self-host GPUs</text><text x="303" y="56" font-size="5.5" fill="#cdd">vLLM on K8s</text>
  </g>
  <text x="180" y="82" text-anchor="middle" font-size="6.5" fill="#1a1a1a">closed frontier models live only at the left · open weights can live anywhere</text>
  <text x="180" y="98" text-anchor="middle" font-size="6.5" fill="#a03050">cross-over: self-host pays off at sustained high volume on open weights</text>
</svg>

- **Rule of thumb.** Below a few hundred million tokens a month, or if you need a closed frontier model (GPT, Claude, Gemini), stay managed — you cannot self-host weights you cannot download. Above that, on open weights (Llama, Qwen, DeepSeek, Mistral), self-hosting can cut unit cost several-fold *if* you keep the GPU busy.
- The middle — inference platforms — exists precisely because most teams want self-host economics without running Kubernetes.

:::interview
**"When would you self-host instead of using an API?"** Name three triggers: (1) **volume** — sustained token throughput high enough that per-token API pricing exceeds amortised GPU cost at good utilisation; (2) **control** — you need a fine-tuned or open model, custom quantisation, guaranteed capacity, or data that cannot leave your VPC; (3) **latency floor** — you need tail latency a shared endpoint will not promise. If none hold, self-hosting is a cost centre you built for no reason.
:::
