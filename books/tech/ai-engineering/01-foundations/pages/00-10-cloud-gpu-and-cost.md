## Renting a GPU, and what it costs

- When a job outgrows your laptop, rent a GPU by the hour. You pay only while it runs, and you can pick a card far beyond anything you would buy.
- The workhorse cards for training are NVIDIA's **H100** and the newer, larger-memory **H200**.

### Rough on-demand prices, September 2026

| Card | Typical range / hour | Notes |
|---|---|---|
| **H100** | ~$1.50 – $3.30 | marketplace floor (Vast.ai) to mid-tier (RunPod) |
| **H100** | ~$3.00 – $4.30 | managed providers (Lambda) |
| **H200** | ~$3.50 – $4.60 | more VRAM, for larger models |

- **Marketplaces** (Vast.ai) are cheapest but variable — you rent someone's spare capacity. **Managed clouds** (Lambda, RunPod) cost more for reliability and support.
- **Free tier:** Google Colab gives limited GPU time at no cost — enough to learn on before you ever pay.

:::warn
The bill that shocks people is the idle GPU. You are charged for wall-clock time the machine is *on*, not time it is *computing*. A GPU left running overnight after training finished can cost more than the training itself. Shut instances down the moment a job ends. Treat prices here as ballpark — verify live rates, they move.
:::
