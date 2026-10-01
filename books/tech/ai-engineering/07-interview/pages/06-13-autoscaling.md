## How do you autoscale an LLM service, and why is cold start a problem?

- Autoscaling adds/removes replicas with load. For LLMs it's harder than stateless web services because:
  - **Cold start is brutal** — spinning up a replica means acquiring a GPU, loading tens of GB of weights into VRAM, and warming CUDA graphs/caches. That's **tens of seconds to minutes**, far too slow to react to a spike in real time.
  - **GPUs are scarce/expensive** — you can't over-provision cheaply, and the cloud may not have a GPU to give you instantly.
- Scaling signals: queue depth / pending requests and GPU utilisation are better triggers than CPU; KEDA-style scaling on a queue metric is common.
- Mitigations for cold start:
  - **Warm pools / min replicas** — keep spare capacity hot (costs money, buys responsiveness).
  - **Fast model loading** — cache weights locally, stream/mmap them, pre-pull images.
  - **Predictive scaling** — scale ahead of known traffic patterns rather than reactively.
  - **Queue + admission control** to absorb bursts while new replicas warm.
- Trade-off: warm capacity (cost) vs cold-start latency (user pain). Size the warm pool to your spike profile and SLO.

:::interview
What's really being tested: that LLM autoscaling fights multi-minute cold starts (weight loading), scales on queue/GPU signals, and buys responsiveness with warm pools + fast loading + predictive scaling.
:::
