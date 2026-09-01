## Fine-tuning, and when it is the answer

- **Fine-tuning** continues training a model on your own examples, producing a private variant that behaves differently by default
- It is the first thing most teams reach for and almost never the right first move, because it is slow, expensive, and solves a narrower problem than it appears to

| Want | Reach for |
|---|---|
| it to know your facts | **retrieval**, Module 7 |
| it to follow your rules | **the system prompt** |
| it to match a format | **structured output** |
| it to match a **style or tone** consistently | fine-tuning |
| a small model to do one narrow job cheaply | fine-tuning, as distillation |

### The one case where it clearly wins

- **Distillation.** Run the large model on thousands of real inputs, keep the outputs, and fine-tune a small model on those pairs
- The result does one job at close to large-model quality for a fraction of the cost and latency
- It needs volume to pay off, which is why it belongs after a feature is working and being used, not before

### What it costs beyond money

- **A dataset.** Hundreds to thousands of clean, consistent examples, and inconsistency in the data teaches inconsistency
- **A pipeline.** Every base model update means retraining, evaluating and redeploying
- **Lock-in.** A fine-tuned model exists on one provider and cannot be moved

### The order that works

- Prompt, then structured output, then few-shot examples, then retrieval, then a smaller model, and only then fine-tuning
- **Build the evaluation set first either way.** Without it there is no way to know whether the fine-tune helped
