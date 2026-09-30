## DSPy: metrics and the optimization loop

- The optimizer is only as good as the **metric** you give it — the function that scores an output. Choosing the metric *is* the design work in DSPy, because it defines what "better" means. **[VERIFY current API]**

:::mint
```python
def metric(example, prediction, trace=None) -> float:
    # exact match, or a rubric, or an LLM-as-judge score
    return float(prediction.answer.strip() == example.answer.strip())

from dspy.teleprompt import BootstrapFewShot
optimizer = BootstrapFewShot(metric=metric)
compiled = optimizer.compile(my_program, trainset=examples)
```
:::

- **The metric can be anything you can compute:** exact match, F1, a check that output validates a schema, a rubric score, or an **LLM-as-judge** (a model rating the output, 14-108 preview). For subjective tasks, the judge *is* the metric — which means the judge's quality bounds the optimization.
- **The loop:** the optimizer runs the program on the trainset, the metric scores each output, and it keeps the prompt variations that score highest — bootstrapping good few-shot examples from cases the program already gets right. More/better examples and a sharper metric yield a better compiled program.
- **This mirrors machine learning itself:** program = model architecture, prompts = weights, metric = loss, examples = training data, optimizer = training loop. DSPy makes prompt engineering look like *training* — which is exactly its thesis.

:::warn
A bad metric optimizes for the wrong thing, confidently. If your metric rewards outputs that merely *look* right (contain keywords) rather than *are* right, the optimizer will produce a program that games the metric — worse than no optimization, because it is tuned to a flawed target. Spend your effort on the metric: make it faithful to real quality (ground it in tests, human labels, or a well-validated judge), because the optimizer will relentlessly maximize whatever you actually wrote down.
:::
