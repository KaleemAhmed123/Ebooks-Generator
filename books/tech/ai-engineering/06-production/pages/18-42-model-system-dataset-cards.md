## Model, system, and dataset cards

- Transparency needs a *format*. **Cards** are the standard: short structured documents that disclose what a model/system/dataset is, how it was built, what it is for, and where it fails. They are the documentation regulators ask for and the artefact a responsible release ships with.

| Card | Documents | Key fields |
|---|---|---|
| **model card** | one trained model | intended use, training data summary, evals, limitations, biases |
| **system card** | a deployed system (model + scaffolding + safeguards) | architecture, safety measures, red-team results, risk assessment |
| **dataset card** | a dataset | source, collection, consent, composition, known biases |

- **The load-bearing sections are the negative ones.** *Intended use* (and explicitly out-of-scope use), *limitations*, and *known biases* are what make a card honest — they tell a deployer where the model *will* fail, which is more useful than the capabilities. A card that lists only strengths is marketing, not documentation.
- **System cards** have grown in importance because a *deployed system* is more than its model: it is the model plus retrieval, tools, guardrails, and human oversight. Frontier labs now publish system cards with red-team findings and safety-case reasoning for major releases — the public-facing counterpart to the internal safety case (18-28).

:::note
Cards are cheap to write and disproportionately valuable: they force the builder to *state* the intended use, the evals run, and the known failure modes — which surfaces gaps before launch and gives downstream users what they need to deploy responsibly (and what auditors require). The engineering habit is to write the model/system card *as you build*, treating "intended use, limitations, evals, biases" as a release checklist, not a document you back-fill under regulatory pressure.
:::
