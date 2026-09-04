## Quality Monitoring in Production

Watching quality signals continuously, not only at deploy. Standard monitoring
tells you the system is up and responding; an AI feature can be fast,
error-free, and producing worse answers every week.

Most of the useful signals already exist in what you log:

| Signal | Rises when |
|---|---|
| Abstention and refusal rate | retrieval or scope is degrading |
| Retry and escalation rate | users are not getting what they asked for |
| Schema repair rate | model behaviour shifted |
| Groundedness on a sample | answers are drifting off the sources |

**These systems degrade with no deploy attached.** A provider update, a corpus
change, or a shift in what users ask moves quality while your repository sits
still. Alert on trends measured in days for quality, and keep fast alerting for
latency, errors and cost rate, where a spike is an incident happening now.

## Quantization

Storing model weights at lower numeric precision — bf16 or fp16 instead of fp32,
or integer formats at 8, 4 or 2 bits — so the model fits in less memory and moves
fewer bytes per generated token.

The quality cost is measurable. Perplexity is how surprised a model is by
held-out text; lower is better. From llama.cpp's own Llama 3 8B scoreboard:

| Format | Size | Perplexity vs fp16 |
|---|---|---|
| fp16 | 14.97 GiB | — |
| `q8_0` | 7.96 GiB | +0.003 |
| `q4_K_M` | 4.58 GiB | +0.175 |
| `q2_K` | 2.96 GiB | +3.52 |

**Four bits is the usual floor, and the damage is not spread evenly.** One
aggregate number hides which capabilities went — long-context recall, rare
languages, exact code. Evaluate the quantized weights on your own task, not on
the benchmark shipped with the format.
