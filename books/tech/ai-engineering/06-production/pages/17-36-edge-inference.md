## Edge inference

- **Edge inference** runs the model on or near the user's device — a phone, a laptop, a browser, an on-prem box — instead of a datacentre GPU. The drivers are latency (no network hop), privacy (data never leaves the device), offline capability, and cost (no server GPU per request).
- The constraint is brutal: a phone has a few GB of memory and a fraction of a datacentre GPU's bandwidth. Only small, heavily quantised models fit.

| Edge target | Typical model | Tech |
|---|---|---|
| phone / laptop | 1–8B, INT4/INT8 | llama.cpp (GGUF), MLC, Core ML, ONNX Runtime |
| browser | 1–3B | WebGPU (WebLLM), WASM |
| on-prem appliance | 8–70B on a local GPU | vLLM/TensorRT-LLM on owned hardware |

- **The pattern is hybrid, not pure edge.** A small on-device model handles the common, latency-sensitive, private cases instantly and offline; it *escalates* hard queries to a big cloud model. Most requests never leave the device; the few that need frontier capability pay the network cost. This is model routing (cluster 17-44) drawn across the device/cloud boundary.
- Quantisation is not optional here — it is the enabling technology. INT4 is the floor that makes an 8B model fit a phone at all.

:::note
Edge shifts the whole cost and privacy model: inference cost moves from your GPU bill to the user's battery, and sensitive data stays local by construction — a real answer to "we can't send this to a third-party API." The price is capability: you are serving a 4B INT4 model, not a frontier one, so edge wins where *speed, privacy, and offline* matter more than raw quality, and the hybrid escalation path covers the rest.
:::
