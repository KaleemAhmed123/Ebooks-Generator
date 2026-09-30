## Cold-start mitigation

- A cold GPU pod cannot serve until the model is in VRAM — and that load is 40–120 seconds for a large model (pull weights from storage, deserialise, allocate the KV pool, warm CUDA graphs). During a traffic spike, that is 40–120 seconds of requests queuing or failing while the new pod boots.
- Every mitigation attacks one part of that load path.

| Lever | Attacks | Cost |
|---|---|---|
| **warm pool** (keep N idle pods) | eliminates load entirely | pay for idle GPUs |
| **fast weight loading** (safetensors, streaming, local NVMe cache) | the pull + deserialise | storage/setup |
| **snapshot/restore** (checkpoint a warmed process) | CUDA + graph warmup | complexity |
| **model caching on the node** | repeat pulls | disk per node |
| **predictive prewarm** (scale ahead of forecast load) | the whole cold start | forecast error |

- **The core tradeoff is idle cost vs spike latency.** A warm pool guarantees fast scale-up but pays for GPUs doing nothing; scale-to-zero pays nothing but eats the full cold start on the next request. The answer is workload-shaped: keep a warm floor for interactive traffic, scale-to-zero only for batch or rare endpoints.
- **Predictive prewarm** is the senior move: scale on a *forecast* (time-of-day, a known campaign, a queue-depth trend) so pods are warm *before* the load lands, not after.

:::warn
Cold start is where autoscaling promises break. A scaler that reacts to a spike by adding pods is already too late — the pods take two minutes to serve while the spike is now. Reactive GPU autoscaling without a warm floor or a forecast delivers a wave of timeouts at exactly the moment you needed capacity. Design for the load *before* it arrives.
:::
