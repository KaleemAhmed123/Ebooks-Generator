## Glossary: E

| Term | Means | In |
|---|---|---|
| **epsilon (ε)** | The privacy budget in differential privacy; smaller ε means stronger privacy and more added noise (lower utility) | B6 |
| **equalised odds** | A group-fairness criterion requiring equal true-positive and false-positive rates across groups | B6 |
| **error budget** | The allowed amount of SLO failure over a window; spent on risk (features, canaries) and frozen when exhausted | B6 |
| **error compounding** | The sharp drop in end-to-end success as step count rises, since per-step reliability multiplies | B5 |
| **eval-driven development** | Putting a measurable test suite at the centre of building an agent, so every change is scored | B5 |
| **eval harness** | Reusable infrastructure that runs a model against task specs, scores each with a fitting metric, and aggregates results; the gate for every model/prompt change | B6 |
| **evaluator (evolutionary)** | The automatic scorer that rates candidates in an evolutionary loop; its quality bounds the loop | B5 |
| **evaluator-optimizer** | Workflow where a generator produces output, an evaluator critiques it, and the generator revises, looping | B5 |
| **executable constraint** | A rule enforced by code, schema, or a tool gate rather than merely stated in the prompt | B5 |
| **execution-based metric** | Scoring generated code or SQL by running it and checking the result, rather than by string similarity to a reference | B6 |
| **expert parallelism** | Distributing an MoE model's experts across GPUs and routing each token's activation to the GPU holding its chosen experts | B6 |
| **Exploding gradients** | gradients growing uncontrollably large, sending the loss to NaN | B2 |
