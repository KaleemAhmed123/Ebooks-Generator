# Infrastructure & Production

## The serving problem

- A trained model is a file. A **product** is a service that answers thousands of concurrent users, under a latency target, without going bankrupt or falling over. Everything in this module lives in the gap between those two.
- A notebook that calls `model.generate()` handles one request at a time on a warm GPU. Production must handle bursts, share one GPU across many users, survive crashes mid-generation, and account for every dollar. None of that is in the model file.

<svg viewBox="0 0 360 96" role="img" aria-label="A model file becomes a service by adding batching, KV cache, autoscaling, observability, safety, and cost control" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="38" width="70" height="22" rx="3" fill="#f4f4f4" stroke="#888"/><text x="47" y="52" text-anchor="middle" font-size="7">model.safetensors</text>
  <rect x="150" y="16" width="200" height="66" rx="4" fill="#e8f4fd" stroke="#24405e"/>
  <text x="250" y="12" text-anchor="middle" font-size="7" fill="#24405e">the serving layer</text>
  <g font-size="6.5"><text x="160" y="30">· batching</text><text x="160" y="43">· KV cache / paging</text><text x="160" y="56">· autoscale + queue</text><text x="160" y="69">· quantize / spec-decode</text>
     <text x="260" y="30">· observability + cost</text><text x="260" y="43">· gateway + routing</text><text x="260" y="56">· canary + rollback</text><text x="260" y="69">· safety + guardrails</text></g>
  <path d="M82 49 L148 49" stroke="#1a1a1a" marker-end="url(#sp)"/>
  <defs><marker id="sp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- This module builds that layer bottom-up: where to run the model (managed vs self-host), the engines that serve it fast (vLLM, SGLang, TensorRT-LLM), the metric that actually matters (**goodput**), the levers that cut latency and cost, the ops that keep it alive, and the **AI-system-design interview** discipline that ties it together.

:::note
The single mental shift from Booklets 1–5 to this one: you stop asking *"is the model good?"* and start asking *"can I serve it to 10,000 people at 200 ms and $2 per million tokens, and prove it stayed up last night?"* That question is what a senior/staff AI-engineering interview probes, and it is the spine of everything ahead.
:::
