## The machine you actually need

- You do **not** need an expensive GPU rig to start. Nearly everything in the first half of AI engineering runs on a normal laptop, and heavy training is rented by the hour when you need it.
- Learn locally where iteration is fast and free; rent a GPU only for the jobs that demand one.

### A sane split

| Do it locally | Rent a GPU for |
|---|---|
| writing code, small models, classical ML | training deep networks from scratch |
| calling model APIs (GPT, Claude) | fine-tuning a large model |
| data cleaning, feature work, notebooks | long, GPU-bound experiments |

- **Calling an API** offloads the compute entirely — your laptop sends text and receives text. Most production AI work is this, not training.

:::note
The instinct to buy a $2,000 GPU on day one is almost always wrong. A modest laptop plus a few dollars of rented GPU time (next pages) covers months of learning. Spend on compute when a real job needs it, not before.
:::

:::warn
The one local requirement that bites people: disk space. Models and datasets are large — a single open-weight model can be tens of gigabytes. Keep 100 GB+ free, and store big datasets outside your project folder so they never end up in version control.
:::
