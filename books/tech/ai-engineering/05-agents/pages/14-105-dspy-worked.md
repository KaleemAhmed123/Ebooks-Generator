## DSPy: a worked program

- A small multi-step DSPy program — retrieve, then reason — compiled against a metric. This shows the full shape: declare, compose, compile.

:::mint
```python
import dspy

class RAG(dspy.Module):
    def __init__(self):
        self.retrieve = dspy.Retrieve(k=3)                  # get 3 passages
        self.answer   = dspy.ChainOfThought("context, question -> answer")

    def forward(self, question):
        ctx = self.retrieve(question).passages
        return self.answer(context=ctx, question=question)

# compile it: optimize the prompts against a metric
from dspy.teleprompt import BootstrapFewShot
compiled_rag = BootstrapFewShot(metric=answer_match).compile(
    RAG(), trainset=qa_examples)

compiled_rag(question="What is our refund window?")
```
:::

- **Read the program:** `RAG` is a module composing two sub-modules — `Retrieve` (fetch passages) and a `ChainOfThought` answerer over a `"context, question -> answer"` signature. `forward` wires them. You wrote *structure and intent*, no prompt strings.
- **`compile` does the magic:** the optimizer runs `RAG` on the Q&A examples, scores answers with `answer_match`, and bakes in the best few-shot demonstrations and instruction wording — producing `compiled_rag` with tuned prompts. Swap the LLM and re-compile; the prompts re-tune to the new model.
- **The result vs hand-prompting:** you never wrote "You are a helpful assistant. Use the context to answer…". DSPy generated and optimized that, and can prove (via the metric) that its version scores higher than your guess would.

:::note
This is DSPy's whole value in one example: a multi-step LLM pipeline written as *composed modules over signatures*, with the prompts produced and optimized by a compiler against a metric — not hand-authored. For pipelines you will run at scale, across models, and want to *measurably* improve, that is a genuinely different and powerful way to build. For a one-off prompt, it is overkill.
:::
