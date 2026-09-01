### Reliably bad at

| Task | Why |
|---|---|
| **deciding what to build** | it has no product context and no stakes |
| **architecture with real trade-offs** | it optimizes for plausible, not for your constraints |
| **anything needing state it cannot see** | production data, a running system, last week's incident |
| **your undocumented conventions** | Module 2 exists to fix exactly this |
| **knowing when it is wrong** | there is no confidence signal, and there will not be one |
| **very recent library versions** | training has a cutoff, and Booklet 7 covers checking |
| **holding a large change coherent** | quality falls as a task spans more files |

### The pattern underneath

- **It is excellent where the answer is determined by the input, and unreliable where the answer depends on judgement it has no basis for**
- A migration is determined. An architecture is a judgement. That single distinction predicts most outcomes
