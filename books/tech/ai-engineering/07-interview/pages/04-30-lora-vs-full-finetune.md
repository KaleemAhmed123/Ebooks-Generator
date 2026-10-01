## LoRA vs full fine-tuning — what's the real tradeoff?

- **Full fine-tuning** updates every weight. Highest ceiling, especially for big behaviour shifts or teaching substantial new skills — but needs memory for all weights + gradients + optimizer state (recall the ~4× rule), and each fine-tune is a full model copy to store and serve.
- **LoRA** updates small adapters. ~Full-fine-tune quality on *most* adaptation tasks at a fraction of the memory and storage, with swappable per-task adapters on one shared base.
- Where full still wins: large distribution shifts (new language, very different domain), or squeezing the last few points of quality. LoRA can underperform when the needed change isn't low-rank.
- Practical default: **start with LoRA/QLoRA**. Only reach for full fine-tuning if evals show LoRA leaving quality on the table and you can afford the cost.

:::interview
**What's really being tested:** that LoRA is the cost-effective default and full fine-tuning is for large shifts / last-mile quality — with the serving advantage of swappable adapters called out.
:::
