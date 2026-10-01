## Safety and evaluation benchmarks

- Beyond your own evals (Flagship 16), a set of *named* public benchmarks measure specific safety and capability properties. Knowing them lets you speak the field's language and pick the right yardstick for a claim. **[VERIFY current benchmarks]**

| Benchmark | Measures |
|---|---|
| **HELM** | holistic eval across many scenarios + metrics |
| **MMLU / MMLU-Pro / GPQA** | knowledge & reasoning capability |
| **TruthfulQA** | truthfulness / resistance to common falsehoods |
| **HarmBench** | harmful-behavior refusal (attack robustness) |
| **XSTest** | over-refusal (does it refuse *safe* requests?) |
| **AgentHarm** | harmful behavior in *agentic* settings |
| **WMDP** | dangerous-knowledge proxy (18-23) |
| **SWE-bench / GAIA / τ-bench** | agent capability (19-63a, Booklet 5) |

- **Match the benchmark to the property.** Capability → MMLU-Pro/GPQA. Truthfulness → TruthfulQA. Attack robustness → HarmBench. *Over*-refusal → XSTest (the safety benchmark people forget, 18-02a). Agentic harm → AgentHarm. Using MMLU to argue a model is "safe" is a category error — it measures capability, not safety.
- **Public benchmarks are a starting signal, not the verdict** (19-72b). They're contaminated over time, gameable, and generic to *your* use case — so they inform model *selection* ("which model to start from") but your own private eval decides whether a change ships (19-70). Leaderboard rank ≠ good on your task.

:::interview
"Which benchmarks would you use to evaluate a model for a safety-sensitive product?"

Match each benchmark to the property it measures, and use several. **Capability**: MMLU-Pro/GPQA. **Truthfulness**: TruthfulQA. **Attack robustness**: HarmBench. **Over-refusal** (the one people forget): XSTest — because a model that refuses everything is useless (18-02a). **Agentic harm** if it takes actions: AgentHarm. **Dangerous knowledge**: WMDP. And a broad view via HELM. But I'd treat all of them as *model-selection* signals, not the release verdict — they're contaminated, gameable, and generic to my use case, so my own **private eval on real tasks** (Flagship 16) is what gates shipping. Naming the *specific* benchmark per property (especially over-refusal), and knowing public benchmarks inform selection while private evals gate release, is the signal.
:::
