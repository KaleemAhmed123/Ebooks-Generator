## Model Registry

A catalogue of model versions with their lineage, metrics and deployment status.
It is what makes "which model produced this output?" a question with an answer.

A support ticket about a bad answer from six weeks ago is untraceable unless you
know which model version, prompt version and index snapshot served it.

### How it works

A registry catalogues every model version you have used or trained, with the
metadata that identifies it: base model, training data reference, evaluation
scores, who approved it, where it is deployed, and when.

**The half that makes it work is the other side** — every inference logs which
registry entry served it. A catalogue nothing references from production tells
you what exists, not what happened, and those are different questions.

With both halves you can answer what actually matters during an incident: what
changed, when, what it scored before it shipped, and what rolling back would
mean concretely.

### In practice

**Scale the registry to what you actually run.** This matters far more with
self-hosted or fine-tuned models, where you own the artifact and its lineage.

| If you | You need |
|---|---|
| Call third-party APIs | the model version string plus your eval results for it |
| Fine-tune your own | full lineage: base, data, scores, approver, deployment |

Building a training-grade registry for a system that only calls an API is
infrastructure nobody will maintain, and an unmaintained registry is worse than
none — it answers questions confidently and wrongly.
